/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1A0B2E',
        'electric-blue': '#0FF4C6',
        'neon-pink': '#FF006E',
        'dark-bg': '#0F0A1E',
        'card-bg': '#1F1533',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
