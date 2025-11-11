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
        'dark-bg': '#0A0414',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'orbitron': ['"Orbitron"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(15, 244, 198, 0.5), 0 0 10px rgba(15, 244, 198, 0.3)' },
          '100%': { 'box-shadow': '0 0 20px rgba(15, 244, 198, 0.8), 0 0 30px rgba(15, 244, 198, 0.5)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
