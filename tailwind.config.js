/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'], // Enable dark mode with the `data-theme` attribute

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        "lexend-deca": ['"Lexend Deca"', 'sans-serif'],
      },
      screens:{
        xs: "475px"
      }
    },
  },
  plugins: [],
}

