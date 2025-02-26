/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        '70-30': '70% 30%',
      },
      width: {
        'custom-sm': '10rem',
        'custom-md': '10rem',
        'custom-lg': '10rem',
        'custom-xl': '15rem',
        'custom-2xl': '20rem',
      },
      colors: {
        'brown': '#8B4513',
      },
      screens: {
        'xs': '250px',
        'sm': '580px',
        'md': '730px',
        'mlg': '950px',
        'lg': '1024px',
        'mxl': '1000px',
        'xl': '1280px',
        '2xl': '1290px',
        
        'custom-breakpoint': '300px',
      },
    },
  },
  plugins: [],
}
