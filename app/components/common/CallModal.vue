<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div @click="closeModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div class="fixed inset-0 z-10 w-screen">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div v-if="isOpen" @click.stop class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Icon name="ri:phone-fill" class="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 id="modal-title" class="text-base font-semibold leading-6 text-gray-900">
                      {{ $t('call_modal.title') }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ $t('call_modal.description') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Форма -->
                <form @submit.prevent="handleSubmit" class="mt-5 space-y-4">
                  <!-- Имя -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('call_modal.name_label') }} <span class="text-base text-red-500">*</span></label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      name="name"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      :placeholder="$t('call_modal.name_placeholder')"
                      :class="{ 'border-red-500': errors.name }"
                      aria-describedby="name-help"
                    >
                    <p v-if="errors.name" class="mt-1 text-xs text-red-500">
                      {{ errors.name }}
                    </p>
                  </div>

                  <!-- Телефон: маска с выбором кода страны -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">{{ $t('call_modal.phone_label') }} <span class="text-base text-red-500">*</span></label>
                    <CommonPhoneInput
                      id="phone"
                      v-model="form.phone"
                      class="mt-1"
                      :placeholder="$t('call_modal.phone_placeholder')"
                      :invalid="!!errors.phone"
                      aria-describedby="phone-help"
                    />
                    <p v-if="errors.phone" id="phone-help" class="mt-1 text-xs text-red-500">
                      {{ errors.phone }}
                    </p>
                  </div>

                  <!-- Согласие -->
                  <div class="flex items-start">
                    <div class="flex h-6 items-center">
                      <input
                        id="agreement"
                        v-model="form.agreed"
                        name="agreement"
                        type="checkbox"
                        required
                        class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        :class="{ 'border-red-500': errors.agreed }"
                        aria-describedby="agreement-help"
                      />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                      <label for="agreement" class="text-gray-700">
                        {{ $t('call_modal.agreement_prefix') }}
                        <NuxtLink
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="font-medium text-green-600 hover:text-green-500"
                        >
                          {{ $t('call_modal.agreement_link_text') }}
                        </NuxtLink>
                        {{ $t('call_modal.agreement_suffix') }}
                      </label>
                      <p v-if="errors.agreed" class="mt-1 text-xs text-red-500">
                        {{ errors.agreed }}
                      </p>
                    </div>
                  </div>
                  <p v-if="errors.submit" class="text-sm text-red-500">
                    {{ errors.submit }}
                  </p>
                </form>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  :disabled="loading"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  @click="handleSubmit"
                >
                  <span v-if="loading" class="flex items-center">
                    <span class="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></span>
                    {{ $t('call_modal.submitting_button') }}
                  </span>
                  <span v-else>
                    {{ $t('call_modal.submit_button') }}
                  </span>
                </button>
                <button
                  type="button"
                  :disabled="loading"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="closeModal"
                >
                  {{ $t('call_modal.cancel_button') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// Принимаем isOpen как пропс
const props = defineProps<{
  isOpen: boolean
}>()

// Испускаем событие close
const emit = defineEmits<{
  close: []
}>()

const loading = ref(false)
const errors = reactive({
  name: '',
  phone: '',
  agreed: '',
  submit: '',
})

const form = ref({
  name: '',
  phone: '',
  agreed: false,
})

function closeModal() {
  emit('close') // Испускаем событие для закрытия
  resetForm()
}

function resetForm() {
  form.value.name = ''
  form.value.phone = ''
  form.value.agreed = false
  errors.name = ''
  errors.phone = ''
  errors.agreed = ''
  errors.submit = ''
}

function validateForm() {
  let isValid = true

  // Проверка имени
  if (!form.value.name.trim()) {
    errors.name = 'Пожалуйста, укажите ваше имя.'
    isValid = false
  } else {
    errors.name = ''
  }

  // Проверка телефона: нормализованный формат +XXXXXXXXXX (10–15 цифр)
  const phoneNormalized = form.value.phone.trim()
  if (!phoneNormalized) {
    errors.phone = 'Пожалуйста, укажите номер телефона.'
    isValid = false
  } else {
    const phoneRegex = /^\+[0-9]{10,15}$/
    if (!phoneRegex.test(phoneNormalized)) {
      errors.phone = 'Введите корректный номер телефона.'
      isValid = false
    } else {
      errors.phone = ''
    }
  }

  // Проверка согласия
  if (!form.value.agreed) {
    errors.agreed = 'Вы должны согласиться с условиями.'
    isValid = false
  } else {
    errors.agreed = ''
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  loading.value = true
  errors.submit = ''

  try {
    await $fetch('/api/callback', {
      method: 'POST',
      body: { name: form.value.name.trim(), phone: form.value.phone.trim() },
    })
    resetForm()
    emit('close')
  } catch (err: unknown) {
    const msg =
      err && typeof err === 'object' && 'data' in err && err.data && typeof (err.data as { message?: string }).message === 'string'
        ? (err.data as { message: string }).message
        : err && typeof err === 'object' && 'statusMessage' in err && typeof (err as { statusMessage: string }).statusMessage === 'string'
          ? (err as { statusMessage: string }).statusMessage
          : 'Не удалось отправить заявку. Попробуйте позже.'
    errors.submit = msg
    console.error('Ошибка при отправке заявки на звонок:', err)
  } finally {
    loading.value = false
  }
}

function onEscape(e: KeyboardEvent) {
  if (props.isOpen && e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>