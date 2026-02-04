<template>
  <div ref="rootRef" class="flex rounded-md shadow-sm">
    <!-- Селект страны: кнопка, открывающая выпадающий список -->
    <div class="relative flex-shrink-0">
      <button
        type="button"
        :disabled="disabled"
        :aria-expanded="isCountryOpen"
        aria-haspopup="listbox"
        :aria-label="countrySelectLabel"
        class="inline-flex items-center gap-1.5 rounded-l-md border border-r-0 px-3 py-2 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors min-w-[5.5rem]"
        :class="inputBorderClass"
        @click="toggleCountryDropdown"
      >
        <span class="truncate">{{ selectedCountry.dialCode || '+' }}</span>
        <Icon name="ri:arrow-down-s-line" class="w-4 h-4 flex-shrink-0 text-gray-500" aria-hidden="true" />
      </button>
      <!-- Выпадающий список стран -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <ul
          v-show="isCountryOpen"
          role="listbox"
          class="absolute left-0 top-full z-20 mt-1 max-h-56 w-64 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          @click.stop
        >
          <li
            v-for="country in PHONE_COUNTRIES"
            :key="country.code"
            role="option"
            :aria-selected="selectedCountry.code === country.code"
            class="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none"
            :class="{ 'bg-primary/5': selectedCountry.code === country.code }"
            @mousedown.prevent="selectCountry(country)"
          >
            <span class="font-medium">{{ country.dialCode }}</span>
            <span class="ml-2 text-gray-600">{{ country.name }}</span>
          </li>
        </ul>
      </Transition>
    </div>
    <!-- Поле ввода номера с маской: maxlength жёстко ограничивает длину по маске страны -->
    <input
      :id="inputId"
      ref="inputRef"
      type="tel"
      :value="displayValue"
      :maxlength="inputMaxLength"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="tel-national"
      class="block w-full rounded-r-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      :class="inputBorderClass"
      :aria-invalid="invalid"
      :aria-describedby="ariaDescribedby"
      @input="onInput"
      @blur="onBlur"
      @focus="isCountryOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Поле ввода телефона с выбором кода страны и маской.
 * v-model — нормализованная строка +XXXXXXXXXX (только цифры и плюс).
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  PHONE_COUNTRIES,
  DEFAULT_PHONE_COUNTRY_CODE,
  findCountryByCode,
  getMaskDigitCount,
  type PhoneCountry,
} from '~/data/phoneCountries'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    disabled?: boolean
    id?: string
    invalid?: boolean
    ariaDescribedby?: string
  }>(),
  {
    placeholder: '',
    disabled: false,
    invalid: false,
    ariaDescribedby: undefined,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isCountryOpen = ref(false)

const inputId = computed(() => props.id ?? 'phone-input')

/** Максимальная длина отображаемой строки (по маске страны) — для атрибута maxlength */
const inputMaxLength = computed(() => selectedCountry.value.mask.length)

/** Текущая выбранная страна */
const selectedCountry = ref<PhoneCountry>(
  findCountryByCode(DEFAULT_PHONE_COUNTRY_CODE) ?? PHONE_COUNTRIES[0]
)

/** Отображаемое значение в поле (только национальная часть с маской) */
const displayValue = ref('')

/** Класс границы: общая для селекта и инпута, с учётом ошибки */
const inputBorderClass = computed(() =>
  props.invalid ? 'border-red-500' : 'border-gray-300'
)

const countrySelectLabel = computed(() => {
  const t = useNuxtApp().$i18n?.t
  return (t && typeof t === 'function' && t('call_modal.country_code_label')) || 'Код страны'
})

/** Применить маску к цифрам: подставить цифры в шаблон 9; убрать лишние разделители в конце */
function applyMask(digits: string, mask: string): string {
  const digitsOnly = digits.replace(/\D/g, '')
  const maxLen = getMaskDigitCount(mask)
  const limited = digitsOnly.slice(0, maxLen)
  let i = 0
  const filled = mask.replace(/9/g, () => limited[i++] ?? '')
  // Убираем trailing разделители (пробелы, дефисы), чтобы не показывать «454 35--»
  return filled.replace(/[\s\-]+$/, '')
}

/** Из отображаемой строки извлечь только цифры */
function digitsFromDisplay(value: string): string {
  return value.replace(/\D/g, '')
}

/** Сформировать нормализованный номер для emit: +XXXXXXXXXX */
function buildNormalized(dialCode: string, nationalDigits: string): string {
  const codeDigits = dialCode.replace(/\D/g, '')
  return `+${codeDigits}${nationalDigits}`
}

/** Парсинг modelValue: определить страну и национальные цифры */
function parseModelValue(value: string): { country: PhoneCountry; nationalDigits: string } {
  if (!value || !value.trim()) {
    const country = findCountryByCode(DEFAULT_PHONE_COUNTRY_CODE) ?? PHONE_COUNTRIES[0]
    return { country, nationalDigits: '' }
  }
  const digits = value.replace(/\D/g, '')
  if (!digits.length) {
    const country = findCountryByCode(DEFAULT_PHONE_COUNTRY_CODE) ?? PHONE_COUNTRIES[0]
    return { country, nationalDigits: '' }
  }
  // Сортируем по длине кода по убыванию, чтобы сначала проверить +357, потом +7
  const sorted = [...PHONE_COUNTRIES].sort(
    (a, b) => (b.dialCode.length - 1) - (a.dialCode.length - 1)
  )
  for (const c of sorted) {
    const codeOnly = c.dialCode.replace(/\D/g, '')
    if (digits.startsWith(codeOnly)) {
      const nationalDigits = digits.slice(codeOnly.length)
      return { country: c, nationalDigits }
    }
  }
  const country = findCountryByCode(DEFAULT_PHONE_COUNTRY_CODE) ?? PHONE_COUNTRIES[0]
  const codeOnly = country.dialCode.replace(/\D/g, '')
  const nationalDigits = digits.startsWith(codeOnly) ? digits.slice(codeOnly.length) : digits
  return { country, nationalDigits }
}

/** Синхронизация при изменении modelValue извне; обрезка по длине маски и emit при переполнении */
watch(
  () => props.modelValue,
  (value) => {
    const { country, nationalDigits } = parseModelValue(value)
    selectedCountry.value = country
    const mask = country.mask
    const maxLen = getMaskDigitCount(mask)
    const limited = nationalDigits.slice(0, maxLen)
    displayValue.value = applyMask(limited, mask)
    // Если пришло больше цифр, чем допускает маска — отправляем обрезанное значение наверх
    if (limited.length !== nationalDigits.length) {
      emit('update:modelValue', buildNormalized(country.dialCode, limited))
    }
  },
  { immediate: true }
)

function toggleCountryDropdown() {
  if (props.disabled) return
  isCountryOpen.value = !isCountryOpen.value
}

function selectCountry(country: PhoneCountry) {
  selectedCountry.value = country
  isCountryOpen.value = false
  const currentDigits = digitsFromDisplay(displayValue.value)
  const maxLen = getMaskDigitCount(country.mask)
  const limited = currentDigits.slice(0, maxLen)
  displayValue.value = applyMask(limited, country.mask)
  const normalized = buildNormalized(country.dialCode, limited)
  emit('update:modelValue', normalized)
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value
  const digits = digitsFromDisplay(raw)
  const maxLen = getMaskDigitCount(selectedCountry.value.mask)
  const limited = digits.slice(0, maxLen)
  const formatted = applyMask(limited, selectedCountry.value.mask)
  displayValue.value = formatted
  const normalized = buildNormalized(selectedCountry.value.dialCode, limited)
  emit('update:modelValue', normalized)
}

function onBlur() {
  isCountryOpen.value = false
}

const rootRef = ref<HTMLDivElement | null>(null)
function onClickOutside(e: MouseEvent) {
  if (isCountryOpen.value && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isCountryOpen.value = false
  }
}
// capture: true — иначе клик внутри модалки не доходит до document из‑за @click.stop
onMounted(() => document.addEventListener('click', onClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside, true))
</script>
