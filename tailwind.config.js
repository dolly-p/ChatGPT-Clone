/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js,images}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': '"Roboto", sans-serif',
      }, 
      colors: {
        'gray-400': '#b4b4b4;',
        'gray-750': '#2f2f2f',
      }
    },
  },
  plugins: [],
}