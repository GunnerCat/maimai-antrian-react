/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    daisyui,
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
}