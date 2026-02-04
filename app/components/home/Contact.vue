<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-4">{{ $t('contacts.title') }}</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">{{ $t('contacts.subtitle') }}</p>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info & Map -->
        <div class="lg:col-span-1 space-y-8">
          <!-- Contact Details -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-start mb-6">
              <div class="flex items-center justify-center bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:phone-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.phone_title') }}</h3>
                <a href="tel:+35799900778" class="text-gray-700 hover:text-primary transition-colors">+357 99-900-778</a>
              </div>
            </div>
            <div class="flex items-start mb-6">
              <div class="flex items-center justify-center bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:mail-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.email_title') }}</h3>
                <a href="mailto:office@k-m-construction.com" class="text-gray-700 hover:text-primary transition-colors">office@k-m-construction.com</a>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex items-center justify-center bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:map-pin-2-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.address_title') }}</h3>
                <p class="text-gray-700">{{ $t('contacts.address_value') }}</p>
              </div>
            </div>
          </div>
          <!-- Map -->
          <div class="h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.0000000000005!2d32.449162!3d34.75500000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e70f6a3b9d5c3d%3A0x6b4f7e8b6f2f9e4e!2sMenelaiou%20Kakoianni%2016%2C%20Yeroskipou%208201%2C%20Cyprus!5e0!3m2!1sen!2s!4v1622000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Контактная форма -->
        <div class="lg:col-span-2">
          <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="name" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.name') }} <span class="text-red-500">*</span></label>
                <input type="text" id="name" v-model="form.name" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.name}">
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label for="email" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.email') }} <span class="text-red-500">*</span></label>
                <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.email}">
                 <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.message') }} <span class="text-red-500">*</span></label>
              <textarea id="message" v-model="form.message" required rows="6" class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.message}"></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
            </div>
            
            <!-- Honeypot поле для защиты от ботов (скрыто от пользователей) -->
            <div style="position: absolute; left: -9999px; opacity: 0; pointer-events: none;" aria-hidden="true">
              <label for="website">Website</label>
              <input type="text" id="website" name="website" v-model="form.website" tabindex="-1" autocomplete="off" />
            </div>
            
            <!-- Согласие -->
            <div class="flex items-start mb-6">
              <div class="flex h-6 items-center">
                <input
                  id="agreement"
                  v-model="form.agreed"
                  name="agreement"
                  type="checkbox"
                  required
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  :class="{ 'border-red-500': errors.agreed }"
                  aria-describedby="agreement-help"
                />
              </div>
              <div class="ml-3 text-sm leading-6">
                <label for="agreement" class="text-gray-700">
                  {{ $t('contacts.form.agreement_prefix') }}
                  <NuxtLink
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-primary hover:text-blue-600 transition-colors"
                  >
                    {{ $t('contacts.form.agreement_link_text') }}
                  </NuxtLink>
                  {{ $t('contacts.form.agreement_suffix') }}
                </label>
                <p v-if="errors.agreed" class="mt-1 text-xs text-red-500">
                  {{ errors.agreed }}
                </p>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <span class="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></span>
                {{ $t('contacts.form.submitting') }}
              </span>
              <span v-else>{{ $t('contacts.form.submit') }}</span>
            </button>
            <p v-if="submissionStatus === 'success'" class="text-green-600 mt-4 text-center">{{ $t('contacts.form.success_message') }}</p>
            <p v-if="submissionStatus === 'error'" class="text-red-600 mt-4 text-center">{{ errors.general || $t('contacts.form.error_message') }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

// Интерфейсы для строгой типизации
interface FormData {
  name: string
  email: string
  message: string
  agreed: boolean
  website: string // Honeypot поле
}

interface ApiResponse {
  success: boolean
  message?: string
  rateLimit?: {
    remaining: number
    resetTime: number
  }
}

interface FetchError {
  statusCode?: number
  statusMessage?: string
  message?: string
  data?: { message?: string }
}

// Состояния
const form = ref<FormData>({ name: '', email: '', message: '', agreed: false, website: '' })
const errors = reactive({
  name: '',
  email: '',
  message: '',
  agreed: '',
  general: '',
})
const isSubmitting = ref<boolean>(false)
const submissionStatus = ref<'success' | 'error' | null>(null)

// Клиентский rate limiting
const lastSubmissionTime = ref<number>(0)
const MIN_SUBMISSION_INTERVAL = 30000 // 30 секунд между отправками
const submissionAttempts = ref<number>(0)
const MAX_CLIENT_ATTEMPTS = 5 // Максимум 5 попыток подряд
const lastAttemptResetTime = ref<number>(0)
const ATTEMPT_RESET_WINDOW = 60 * 60 * 1000 // 1 час

// Проверка валидности email
const isValidEmail = (email: string): boolean => {
  // Более надежное регулярное выражение
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

// Функция валидации формы
const { t } = useI18n()

const validateForm = (): boolean => {
  let isValid = true

  // Очистка предыдущих ошибок
  errors.name = ''
  errors.email = ''
  errors.message = ''
  errors.agreed = ''

  // Проверка имени
  if (!form.value.name.trim()) {
    errors.name = t('contacts.form.errors.name_required')
    isValid = false
  }

  // Проверка email
  if (!form.value.email.trim()) {
    errors.email = t('contacts.form.errors.email_required')
    isValid = false
  } else if (!isValidEmail(form.value.email.trim())) {
    errors.email = t('contacts.form.errors.email_invalid')
    isValid = false
  }

  // Проверка сообщения
  if (!form.value.message.trim()) {
    errors.message = t('contacts.form.errors.message_required')
    isValid = false
  }

  // Проверка согласия
  if (!form.value.agreed) {
    errors.agreed = t('contacts.form.errors.agreement_required')
    isValid = false
  }

  // Проверка honeypot поля
  if (form.value.website && form.value.website.trim() !== '') {
    errors.general = 'Обнаружена спам-активность'
    isValid = false
  }

  return isValid
}

// Проверка клиентского rate limiting
const checkClientRateLimit = (): { allowed: boolean; message?: string } => {
  const now = Date.now()
  
  // Проверка минимального интервала между отправками
  const timeSinceLastSubmission = now - lastSubmissionTime.value
  if (timeSinceLastSubmission < MIN_SUBMISSION_INTERVAL) {
    const remainingSeconds = Math.ceil((MIN_SUBMISSION_INTERVAL - timeSinceLastSubmission) / 1000)
    return {
      allowed: false,
      message: t('contacts.form.errors.rate_limit', { seconds: remainingSeconds })
    }
  }

  // Проверка количества попыток
  if (now - lastAttemptResetTime.value > ATTEMPT_RESET_WINDOW) {
    submissionAttempts.value = 0
    lastAttemptResetTime.value = now
  }

  if (submissionAttempts.value >= MAX_CLIENT_ATTEMPTS) {
    const resetTime = Math.ceil((ATTEMPT_RESET_WINDOW - (now - lastAttemptResetTime.value)) / (60 * 1000))
    return {
      allowed: false,
      message: t('contacts.form.errors.too_many_attempts', { minutes: resetTime })
    }
  }

  return { allowed: true }
}


// Функция отправки формы
const submitForm = async (): Promise<void> => {
  // Защита от двойной отправки — блокируем сразу, до любой асинхронной логики
  if (isSubmitting.value) return
  isSubmitting.value = true

  submissionStatus.value = null
  errors.general = ''

  // Валидация формы
  if (!validateForm()) {
    isSubmitting.value = false
    return
  }

  // Проверка клиентского rate limiting
  const rateLimitCheck = checkClientRateLimit()
  if (!rateLimitCheck.allowed) {
    errors.general = rateLimitCheck.message || 'Слишком много попыток. Пожалуйста, подождите.'
    submissionStatus.value = 'error'
    isSubmitting.value = false
    return
  }

  submissionAttempts.value++

  try {
    // Отправка на серверный API endpoint
    const result = await $fetch<ApiResponse>('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        message: form.value.message.trim(),
        website: form.value.website, // Honeypot поле
      },
    })

    if (result?.success) {
      submissionStatus.value = 'success'
      lastSubmissionTime.value = Date.now()
      submissionAttempts.value = 0 // Сброс счетчика при успешной отправке
      
      // Сброс формы и ошибок после успешной отправки
      form.value = { name: '', email: '', message: '', agreed: false, website: '' }
      errors.name = ''
      errors.email = ''
      errors.message = ''
      errors.agreed = ''
      errors.general = ''
    } else {
      submissionStatus.value = 'error'
      errors.general = result?.message || 'Ошибка при отправке сообщения'
    }
  } catch (error: unknown) {
    console.error('Unexpected error during form submission:', error)
    
    // Обработка различных типов ошибок
    const defaultErrorMessage = 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
    let errorMessage = defaultErrorMessage
    
    // Проверка на FetchError от $fetch (H3 присылает текст в data.message)
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const fetchError = error as FetchError
      const bodyMessage = fetchError.data?.message
      if (fetchError.statusCode === 429) {
        errorMessage = bodyMessage || fetchError.statusMessage || 'Слишком много запросов. Пожалуйста, подождите перед повторной отправкой.'
        lastSubmissionTime.value = Date.now()
      } else if (fetchError.statusCode === 400) {
        errorMessage = bodyMessage || fetchError.statusMessage || 'Ошибка валидации данных'
      } else {
        errorMessage = bodyMessage || fetchError.statusMessage || fetchError.message || defaultErrorMessage
      }
    } else if (error instanceof Error) {
      errorMessage = error.message || defaultErrorMessage
    }
    
    errors.general = errorMessage
    submissionStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    // Автоматический сброс статуса через 5 секунд
    if (submissionStatus.value) {
      setTimeout(() => {
        submissionStatus.value = null
        errors.general = ''
      }, 5000)
    }
  }
}
</script>