/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        signature: {
          gold: '#D4AF37',
        },
        pearl: {
          white: '#F8F6F0',
          light: '#FAFAFA',
        },
        charcoal: {
          black: '#1A1A1A',
        },
        meadow: {
          sage: '#9CAF88',
          lavender: '#B19CD9',
        },
        forest: {
          green: '#2C3E28',
          emerald: '#014421',
        },
        light: {
          red: '#F6C6CD',
        },
        wine: {
          burgundy: '#4A1C28',
        },
        warm: {
          terracotta: '#D2691E',
          eggshell: '#F0EAD6',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'flower-grow': 'grow 2s ease-out forwards',
        'petal-float': 'float 8s ease-in-out infinite',
        'logo-shimmer': 'shimmer 1.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'translateY(-100px) rotate(180deg)', opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}