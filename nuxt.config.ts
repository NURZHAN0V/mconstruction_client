// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // ssr: false,
  devtools: { enabled: false },
  devServer: {
    port: 4030,
    host: '0.0.0.0',
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/scripts', '@nuxt/image', '@nuxt/fonts', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/icon', '@nuxtjs/tailwindcss'],
  future: {
    compatibilityVersion: 4
  },
  image: {
    domains: ['k-m-construction.com', 'placehold.net'],
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  fonts: {
    families: [
      { name: 'Roboto', global: true },
      { name: 'Open Sans', global: true },
    ]
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
  site: { indexable: false },
  app: {
    head: {
      title: 'K.M Construction in Cyprus',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https: ws:; frame-src 'self' https://www.google.com;"
        }
      ],
      link: [],
      script: []
    }
  },
  nitro: {
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      telegramBotToken: process.env.NUXT_PUBLIC_TELEGRAM_BOT_TOKEN || '',
      telegramChatIds: process.env.NUXT_PUBLIC_TELEGRAM_CHAT_IDS || '',
    },
  },
})