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
    provider: 'google',
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
  site: {
    url: 'https://k-m-construction.com',
    name: 'K.M Construction',
    description: 'K.M Construction in Cyprus',
    defaultLocale: 'en',
    indexable: true,
  },
  robots: {
    disallow: ['/404']
  },
  app: {
    head: {
      title: 'K.M Construction in Cyprus',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://mc.yandex.ru; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https: ws: wss: https://mc.yandex.ru; frame-src 'self' https://www.google.com https://mc.yandex.ru;"
        }
      ],
      link: [],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-JQM4LMH3EG',
          async: true,
          tagPosition: 'head'
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JQM4LMH3EG', {
              send_page_view: false // отключаем автоматическую отправку
            });
          `,
          type: 'text/javascript',
          tagPosition: 'head'
        }
      ]
    }
  },
  nitro: {
    compressPublicAssets: true
  },
  runtimeConfig: {
    public: {
      telegramBotToken: process.env.NUXT_PUBLIC_TELEGRAM_BOT_TOKEN || '',
      telegramChatIds: process.env.NUXT_PUBLIC_TELEGRAM_CHAT_IDS || ''
    },
  },
})