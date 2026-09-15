/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b2',
          hover: '#004494',
          light: '#e6f0fa',
          dark: '#003366',
        },
        brand: {
          blue: '#0056b2',
          purple: '#7c3aed',
          dark: '#0f1923',
          darker: '#031226',
        }
      },
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
        display: ['"Public Sans"', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
};
