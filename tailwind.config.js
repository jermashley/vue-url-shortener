const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      ...colors
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
