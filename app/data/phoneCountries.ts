/**
 * Список стран с телефонными кодами и масками для поля ввода телефона.
 * mask: 9 — цифра; остальные символы — разделители (пробел, дефис).
 */

export interface PhoneCountry {
  code: string
  dialCode: string
  name: string
  /** Шаблон маски: 9 — место для цифры, остальное — разделители */
  mask: string
}

/** Количество цифр в маске (только символы "9") */
export function getMaskDigitCount(mask: string): number {
  return (mask.match(/9/g) ?? []).length
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'RU', dialCode: '+7', name: 'Россия', mask: '999 999-99-99' },
  { code: 'CY', dialCode: '+357', name: 'Кипр', mask: '99-999-999' },
]

/** Код по умолчанию при открытии формы (Кипр — основной регион проекта) */
export const DEFAULT_PHONE_COUNTRY_CODE = 'CY'

/** Найти страну по dialCode (например "+7" или "+357") */
export function findCountryByDialCode(dialCode: string): PhoneCountry | undefined {
  const normalized = dialCode.startsWith('+') ? dialCode : `+${dialCode}`
  return PHONE_COUNTRIES.find(c => c.dialCode === normalized)
}

/** Найти страну по коду страны (ISO 2) */
export function findCountryByCode(code: string): PhoneCountry | undefined {
  return PHONE_COUNTRIES.find(c => c.code === code)
}
