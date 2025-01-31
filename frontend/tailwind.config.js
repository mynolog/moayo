/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        'soft-blue': {
          200: '#b2d3e2',
          400: '#8bb8d8',
          600: '#6b8fbe',
          800: '#486ba7',
          900: '#3B4F80',
        },
        mint: {
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#34D399',
          600: '#2BB28B',
          700: '#169D73',
          800: '#0F7F5F',
          900: '#0B5A47',
        },
      },
      fontFamily: {
        'gothic-a1': ['Gothic A1', 'serif'],
        righteous: ['Righteous', 'serif'],
      },
    },
  },
  plugins: [],
};
