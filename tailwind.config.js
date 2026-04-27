/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bk: {
          red: '#D62300',
          orange: '#F5A623',
          yellow: '#FFD700',
          dark: '#0D0D0D',
          card: '#1A1A1A',
          muted: '#2A2A2A',
          border: '#333333',
          text: '#F0EDE8',
          sub: '#9A9A9A',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'pop': 'pop 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        pop: { '0%': { transform: 'scale(0.9)' }, '60%': { transform: 'scale(1.1)' }, '100%': { transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
