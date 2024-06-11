/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  daisyui: {
    themes: ['light']
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    function ({ addUtilities }) {
      const utilities = {
        '.no-scrollbar::webkit-scrollbar': {
          display: 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }
      }
      addUtilities(utilities)
    },
    daisyui
  ],
  theme: {
    extend: {
      colors: {
        creamy: '#fffaeb'
      },
      width: {
        480: '30rem'
      },
      minHeight: {
        '50vh': '50vh'
      },
      height: {}
    }
  }
}
