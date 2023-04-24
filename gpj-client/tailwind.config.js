/** @type {import('tailwindcss').Config} */

const themeConfiguration = require('./src/theme/themeConfiguration');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    fontSize: themeConfiguration.font.size,
    fontWeight: themeConfiguration.font.weight,
    extend: {
      colors: themeConfiguration.colors,
    },
    spacing: {
      content: '1100px',
      ...themeConfiguration.spacing,
    },
  },
  plugins: [],
}
