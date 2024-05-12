/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'maimai-background': "url('/src/assets/home.png')",
      },
      colors: {
        'creamy': '#fffaeb',
      },
      width: {
        '480': '30rem',
      },
      minHeight:{
        '50vh': '50vh'
      },
      height:{
        
      }
    },
  },
  plugins: [],
}