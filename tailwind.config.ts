/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
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