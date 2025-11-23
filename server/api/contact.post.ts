import type { H3Event } from 'h3'
import type { IncomingMessage } from 'http'

// In-memory хранилище для rate limiting (в продакшене лучше использовать Redis)
interface RateLimitEntry {
  count: number
  resetTime: number
  lastSubmissions: Array<{ email: string; message: string; timestamp: number }>
}

// Интерфейс для данных формы
interface ContactFormData {
  name: string
  email: string
  message: string
  website?: string
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Очистка старых записей каждые 5 минут
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  })
}, 5 * 60 * 1000)

// Получение IP адреса из запроса
function getClientIP(event: H3Event): string {
  const req = event.node.req as IncomingMessage
  const forwarded = req.headers['x-forwarded-for']
  const realIP = req.headers['x-real-ip']
  
  if (forwarded && typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  if (realIP && typeof realIP === 'string') {
    return realIP
  }
  return req.socket.remoteAddress || 'unknown'
}

// Проверка rate limiting
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 минут
  const maxRequests = 3 // Максимум 3 запроса за 15 минут
  const resetTime = now + windowMs

  let entry = rateLimitStore.get(ip)

  if (!entry || entry.resetTime < now) {
    // Создаем новую запись
    entry = {
      count: 0,
      resetTime,
      lastSubmissions: []
    }
    rateLimitStore.set(ip, entry)
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }

  entry.count++
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

// Проверка на дубликаты
function isDuplicateSubmission(
  ip: string,
  email: string,
  message: string,
  windowMs: number = 5 * 60 * 1000 // 5 минут
): boolean {
  const entry = rateLimitStore.get(ip)
  if (!entry) return false

  const now = Date.now()
  const normalizedMessage = message.trim().toLowerCase()
  const normalizedEmail = email.trim().toLowerCase()

  // Проверяем последние отправки
  const recentSubmissions = entry.lastSubmissions.filter(
    sub => (now - sub.timestamp) < windowMs
  )

  // Проверяем дубликаты
  for (const sub of recentSubmissions) {
    if (
      sub.email.toLowerCase() === normalizedEmail &&
      sub.message.toLowerCase() === normalizedMessage
    ) {
      return true
    }
  }

  // Добавляем текущую отправку
  entry.lastSubmissions.push({
    email: normalizedEmail,
    message: normalizedMessage,
    timestamp: now
  })

  // Оставляем только последние 10 отправок
  if (entry.lastSubmissions.length > 10) {
    entry.lastSubmissions = entry.lastSubmissions.slice(-10)
  }

  return false
}

// Валидация данных формы
function validateFormData(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Некорректные данные формы' }
  }

  const formData = data as ContactFormData

  // Проверка honeypot поля (если поле заполнено, это спам)
  if (formData.website && typeof formData.website === 'string' && formData.website.trim() !== '') {
    return { valid: false, error: 'Spam detected' }
  }

  const { name, email, message } = formData

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, error: 'Имя должно содержать минимум 2 символа' }
  }

  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email обязателен' }
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Некорректный email' }
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return { valid: false, error: 'Сообщение должно содержать минимум 10 символов' }
  }

  // Проверка на подозрительные паттерны в сообщении
  const suspiciousPatterns = [
    /http[s]?:\/\//i, // URL
    /www\./i, // www
    /\[url\]/i, // BBcode
    /<a\s+href/i, // HTML ссылки
  ]

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return { valid: false, error: 'Сообщение содержит недопустимые символы' }
    }
  }

  return { valid: true }
}

export default defineEventHandler(async (event) => {
  // Только POST запросы
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const ip = getClientIP(event)

    // Проверка rate limiting
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      const resetInSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      throw createError({
        statusCode: 429,
        statusMessage: `Too Many Requests. Попробуйте снова через ${Math.ceil(resetInSeconds / 60)} минут.`
      })
    }

    // Валидация данных
    const validation = validateFormData(body)
    if (!validation.valid) {
      throw createError({
        statusCode: 400,
        statusMessage: validation.error || 'Ошибка валидации'
      })
    }

    // Приводим body к типу ContactFormData после успешной валидации
    const formData = body as ContactFormData

    // Проверка на дубликаты
    if (isDuplicateSubmission(ip, formData.email, formData.message)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Вы уже отправили это сообщение. Пожалуйста, подождите перед повторной отправкой.'
      })
    }

    // Получаем конфигурацию
    const config = useRuntimeConfig()
    const telegramBotToken = config.telegramBotToken || config.public?.telegramBotToken
    const telegramChatIds = config.telegramChatIds || config.public?.telegramChatIds

    if (!telegramBotToken || !telegramChatIds) {
      console.error('Переменные окружения Telegram не установлены')
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка конфигурации сервера'
      })
    }

    // Форматирование сообщения для Telegram (HTML формат)
    // Правильное экранирование HTML символов для Telegram HTML parse_mode
    const escapeHtml = (text: string): string => {
      if (!text || typeof text !== 'string') return ''
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim()
    }

    const escapedName = escapeHtml(String(formData.name || ''))
    const escapedEmail = escapeHtml(String(formData.email || ''))
    const escapedMessage = escapeHtml(String(formData.message || ''))

    // Формируем сообщение для Telegram
    const telegramMessage = [
      '<b>Новая заявка с контактной формы</b>',
      '',
      `<b>Имя:</b> ${escapedName}`,
      `<b>Email:</b> ${escapedEmail}`,
      `<b>Сообщение:</b>`,
      escapedMessage
    ].join('\n')

    // Отправка в Telegram
    const chatIds = String(telegramChatIds).split(',').map(id => id.trim())
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

    const requests = chatIds.map(chatId =>
      $fetch(url, {
        method: 'POST',
        body: {
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML',
        },
      })
    )

    await Promise.all(requests)

    return {
      success: true,
      message: 'Сообщение успешно отправлено',
      rateLimit: {
        remaining: rateLimit.remaining,
        resetTime: rateLimit.resetTime
      }
    }
  } catch (error: unknown) {
    // Если это уже созданная ошибка H3, пробрасываем её дальше
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Ошибка при обработке формы:', error instanceof Error ? error.message : String(error))
    throw createError({
      statusCode: 500,
      statusMessage: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
    })
  }
})

