/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'club': {
          purple: '#6B46C1',
          pink: '#D53F8C',
          dark: '#0A0A0A',
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6B46C1' },
          '100%': { boxShadow: '0 0 20px #D53F8C' },
        },
      },
    },
  },
  plugins: [],
};