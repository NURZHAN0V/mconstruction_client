// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],
  fonts: {
    families: [
      { name: 'Roboto', global: true },
      { name: 'Open Sans', global: true },
    ]
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ],
    lazy: true,
    bundle: {
      optimizeTranslationDirective: true,
    },
  },
  site: { indexable: false }
})