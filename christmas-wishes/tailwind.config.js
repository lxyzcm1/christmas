/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'snow-fall': 'snow-fall 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'rotate': 'rotate 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'snow-fall': {
          '0%': { transform: 'translateY(-10vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
