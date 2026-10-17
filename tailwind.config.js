/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'error-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%, 45%, 75%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '30%, 60%, 90%': { transform: 'translateX(8px) rotate(1deg)' },
        },
        'spring-pop': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.12)', opacity: '1' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float-bob': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        'combo-pop': {
          '0%': { transform: 'scale(0.75) rotate(-4deg)' },
          '50%': { transform: 'scale(1.22) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'shimmer-sweep': {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        'error-shake': 'error-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'spring-pop': 'spring-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float-bob': 'float-bob 2.2s ease-in-out infinite',
        'combo-pop': 'combo-pop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shimmer-sweep': 'shimmer-sweep 1.8s ease-in-out infinite',
        'marquee-left': 'marquee-left 10s linear infinite',
        'gradient-flow': 'gradient-flow 3s ease infinite',
      }
    },
  },
  plugins: [],
}
