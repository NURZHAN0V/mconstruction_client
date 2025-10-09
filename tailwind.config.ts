/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,vue,ts}",
      "./app/components/**/*.{js,vue,ts}",
      "./app/layouts/**/*.vue",
      "./app/pages/**/*.vue",
      "./app/plugins/**/*.{js,ts}",
      "./app/app.vue",
      "./error.vue",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#007bff',
          'secondary': '#6c757d',
          'dark': '#000000',
          'light': '#ffffff',
        },
        fontFamily: {
          sans: ['Arial', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
          'open-sans': ['Open Sans', 'sans-serif'],
        }
      },
    },
    plugins: [],
}