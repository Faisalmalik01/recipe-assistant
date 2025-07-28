/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class",
  content: [
       "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
    sans: ['Inter', 'sans-serif'],
    hero: ['Clash Display', 'ui-sans-serif', 'Inter', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#54C063',
        'primary-light': '#E6FAEF',
        accent: '#FFD600',
        neutral: '#F7F7FA',
    darkBg: '#1C1C1E',
    darkCard: '#2C2C2E',
    darkText: '#F5F5F7',
    darkBorder: '#3A3A3C',
    accent: '#FFD600',


      }
    },
  },
  plugins: [],
}

