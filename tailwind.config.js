/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/html/*.html",         // Шукає в папці assets
    "./*.php",            // PHP у корені
    "./app/**/*.php",      // PHP компоненти
    "../**/*.php",      // PHP інклуди
    "./src/js/**/*.js",    // JS файли
    "./src/css/**/*.css"   // CSS файли
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#6366F1',
        },

        surface: {
          dark: '#0F0F11',
          hover: '#1A1A1F',
        },

        border: {
          light: '#232125',
          hover: '#2F2F35',
        },

        content: {
          white: '#FBFBFB',
          muted: '#A39FA9',
          ghost: '#6B6B75',
        },
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
