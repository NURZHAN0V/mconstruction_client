import type { H3Event } from 'h3'
import type { IncomingMessage } from 'http'

interface CallbackRateLimitEntry {
  count: number
  resetTime: number
  lastSubmissions: Array<{ name: string; phone: string; timestamp: number }>
}

interface CallbackFormData {
  name: string
  phone: string
  website?: string
}

const callbackRateLimitStore = new Map<string, CallbackRateLimitEntry>()

setInterval(() => {
  const now = Date.now()
  callbackRateLimitStore.forEach((entry, key) => {
    if (entry.resetTime < now) {
      callbackRateLimitStore.delete(key)
    }
  })
}, 5 * 60 * 1000)

function getClientIP(event: H3Event): string {
  const req = event.node.req as IncomingMessage
  const forwarded = req.headers['x-forwarded-for']
  const realIP = req.headers['x-real-ip']

  if (forwarded && typeof forwarded === 'string') {
    const firstIP = forwarded.split(',')[0]?.trim()
    if (firstIP) return firstIP
  }
  if (realIP && typeof realIP === 'string') return realIP
  return req.socket?.remoteAddress || 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const maxRequests = 3
  const resetTime = now + windowMs

  let entry = callbackRateLimitStore.get(ip)
  if (!entry || entry.resetTime < now) {
    entry = { count: 0, resetTime, lastSubmissions: [] }
    callbackRateLimitStore.set(ip, entry)
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }
  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime }
}

function isDuplicateCallback(
  ip: string,
  name: string,
  phone: string,
  windowMs: number = 5 * 60 * 1000
): boolean {
  const entry = callbackRateLimitStore.get(ip)
  if (!entry) return false

  const now = Date.now()
  const normalizedName = name.trim().toLowerCase()
  const normalizedPhone = phone.trim().replace(/\s/g, '')

  const recent = entry.lastSubmissions.filter(sub => (now - sub.timestamp) < windowMs)
  for (const sub of recent) {
    if (
      sub.name.toLowerCase() === normalizedName &&
      sub.phone.replace(/\s/g, '') === normalizedPhone
    ) {
      return true
    }
  }

  entry.lastSubmissions.push({
    name: normalizedName,
    phone: normalizedPhone,
    timestamp: now
  })
  if (entry.lastSubmissions.length > 10) {
    entry.lastSubmissions = entry.lastSubmissions.slice(-10)
  }
  return false
}

function validateCallbackData(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Некорректные данные формы' }
  }

  const form = data as CallbackFormData
  if (form.website && typeof form.website === 'string' && form.website.trim() !== '') {
    return { valid: false, error: 'Spam detected' }
  }

  const { name, phone } = form
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, error: 'Имя должно содержать минимум 2 символа' }
  }
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Телефон обязателен' }
  }
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/
  if (!phoneRegex.test(phone.trim())) {
    return { valid: false, error: 'Введите корректный номер телефона.' }
  }
  return { valid: true }
}

function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const body = await readBody(event)
    const ip = getClientIP(event)

    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      const resetInSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      throw createError({
        statusCode: 429,
        statusMessage: `Too Many Requests. Попробуйте снова через ${Math.ceil(resetInSeconds / 60)} минут.`
      })
    }

    const validation = validateCallbackData(body)
    if (!validation.valid) {
      throw createError({
        statusCode: 400,
        statusMessage: validation.error || 'Ошибка валидации'
      })
    }

    const formData = body as CallbackFormData
    if (isDuplicateCallback(ip, formData.name, formData.phone)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Вы уже отправили эту заявку. Пожалуйста, подождите перед повторной отправкой.'
      })
    }

    const config = useRuntimeConfig()
    const telegramBotToken = config.telegramBotToken
    const telegramChatIds = config.telegramChatIds

    if (!telegramBotToken || !telegramChatIds) {
      console.error('Переменные окружения Telegram не установлены')
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка конфигурации сервера'
      })
    }

    const escapedName = escapeHtml(String(formData.name || ''))
    const escapedPhone = escapeHtml(String(formData.phone || ''))

    const telegramMessage = [
      '<b>Новая заявка на звонок!</b>',
      '',
      `<b>Имя:</b> ${escapedName}`,
      `<b>Телефон:</b> ${escapedPhone}`
    ].join('\n')

    const chatIds = String(telegramChatIds).split(',').map(id => id.trim())
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

    await Promise.all(
      chatIds.map(chatId =>
        $fetch(url, {
          method: 'POST',
          body: {
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: 'HTML',
          },
        })
      )
    )

    return { success: true, message: 'Заявка успешно отправлена' }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Ошибка при обработке заявки на звонок:', error instanceof Error ? error.message : String(error))
    throw createError({
      statusCode: 500,
      statusMessage: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
    })
  }
})
