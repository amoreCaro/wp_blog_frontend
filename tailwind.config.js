/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
"./*.html",         // Шукає в папці assets
  "./**/*.html",      // Шукає у всіх підпапках assets
    "./*.php",            // PHP у корені
    "./app/**/*.php",      // PHP компоненти
    "../**/*.php",      // PHP інклуди
    "./src/js/**/*.js",    // JS файли
    "./src/css/**/*.css"   // CSS файли
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#00F5D4', 
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1920px',
        '3xl': '2560px',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
};
