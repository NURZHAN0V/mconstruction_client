# K.M.Construction - Корпоративный веб-сайт

## 🏗️ Описание проекта

Современный корпоративный веб-сайт для строительной компании K.M.Construction, специализирующейся на полном спектре строительно-монтажных работ для жилых и коммерческих помещений на Кипре.

## Стек

Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Pinia, @nuxtjs/i18n (en/ru), @nuxtjs/seo, @nuxt/image, @nuxt/fonts.

## 📁 Структура проекта

```
mconstruction_client/
├── 📁 app/                      # Исходный код приложения (Nuxt 4)
│   ├── 📁 assets/css/           # Стили (Tailwind CSS)
│   │   └── main.css
│   ├── 📁 components/
│   │   ├── 📁 common/           # Общие компоненты
│   │   │   ├── ActionButtons.vue
│   │   │   ├── BackToTop.vue
│   │   │   ├── Breadcrumbs.vue
│   │   │   ├── CallButton.vue
│   │   │   ├── CallModal.vue
│   │   │   ├── Gallery.vue
│   │   │   └── PhoneInput.vue
│   │   ├── 📁 home/             # Секции главной страницы
│   │   │   ├── Contact.vue
│   │   │   ├── CTA.vue
│   │   │   ├── Hero.vue
│   │   │   ├── Portfolio.vue
│   │   │   └── Services.vue
│   │   └── 📁 layout/
│   │       ├── Footer.vue
│   │       └── Header.vue
│   ├── 📁 data/                 # Данные приложения
│   │   └── phoneCountries.ts
│   ├── 📁 layouts/
│   │   └── default.vue
│   ├── 📁 pages/                # Роутинг (file-based)
│   │   ├── 📁 portfolio/
│   │   │   ├── [slug].vue       # Страница проекта
│   │   │   └── index.vue        # Список портфолио
│   │   ├── 📁 services/
│   │   │   ├── [slug].vue       # Страница услуги
│   │   │   └── index.vue        # Список услуг
│   │   ├── contacts.vue
│   │   ├── index.vue            # Главная
│   │   ├── privacy-policy.vue
│   │   └── ...
│   ├── app.vue
│   └── error.vue
├── 📁 i18n/locales/
│   ├── en.json
│   └── ru.json
├── 📁 public/                   # Статика (favicon, robots, изображения)
│   ├── _robots.txt
│   ├── favicon.ico
│   └── images/                  # hero, portfolio, services
├── 📁 server/
│   ├── 📁 api/                  # API-обработчики
│   │   ├── callback.post.ts     # Заявка на звонок → Telegram
│   │   └── contact.post.ts      # Контактная форма → Telegram
│   └── tsconfig.json
├── 📁 types/
│   └── yandex-metrika.d.ts
├── AGENTS.md                    # Правила для AI-ассистента
├── ecosystem.config.cjs         # Опциональная конфигурация процесса для продакшена
├── nuxt.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Быстрый старт

```bash
yarn install
yarn dev
```

Сборка: `yarn build`. Превью: `yarn preview`.

## Развертывание (systemd)

Файл сервиса `/etc/systemd/system/nuxt.service`:

```ini
[Unit]
Description=Nuxt.js App
After=network.target

[Service]
Type=simple
User=web
WorkingDirectory=/var/www/client
Environment=PORT=4030
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Команды: `systemctl daemon-reload && systemctl start nuxt && systemctl enable nuxt`. Управление: `status` / `stop` / `restart`. Логи: `journalctl -u nuxt -f`.

## Контакты

- **Телефон**: +357 99-900-778
- **Email**: office@k-m-construction.com
- **Адрес**: Менелау Какоянни 16, Sonia Court 1, Героскипу, Пафос
- **Веб-сайт**: https://k-m-construction.com

## Лицензия

MIT. K-M Construction, частный проект.
