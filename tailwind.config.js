// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md'],
  theme: {
    extend: {
      fontFamily: {
        wotfard: [
          'Wotfard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      width: {
        0.75: '0.1875rem',
      },
      colors: {
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          150: '#ECECEE',
          200: '#E4E4E7',
          250: '#DCDCE0',
          300: '#D4D4D8',
          350: '#BBBBC1',
          400: '#A1A1A9',
          450: '#898991',
          500: '#717179',
          550: '#62626A',
          600: '#52525A',
          650: '#494950',
          700: '#3F3F45',
          750: '#333338',
          800: '#27272A',
          850: '#202023',
          900: '#18181B',
          950: '#101013',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
