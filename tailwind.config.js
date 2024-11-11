/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0D1321',
        'gray': '#3E5C76',
        'white': '#F0EBD8',
        'dark-blue': '#1D2D44',
        'light-blue': '#748CAB',
        'pink': '#EF798A'
      },
      fontFamily: {
        quentin: ['Quentin', 'sans-serif'],
        santaCatalina: ['SantaCatalina', 'sans-serif'],
        sofia: ['Sofia', 'sans-serif'],
        weddingSignature: ['WeddingSignature', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

