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
        carbon: {
          canvas: '#08090C',
          surface: '#0F1117',
          panel: '#151922',
          hover: '#1D222E',
        },
        signal: {
          blue: '#2563EB',
          sky: '#3B82F6',
          ice: '#93C5FD',
        },
        ink: {
          high: '#F4F5F8',
          mid: '#A3AAB8',
          muted: '#7D8597',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '9999px',
      },
      boxShadow: {
        'pill-glass': '0 20px 50px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.09)',
        'panel-depth': '0 28px 70px -24px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.07)',
        'blue-halo': '0 0 42px -10px rgba(37, 99, 235, 0.5)',
      },
    },
  },
  plugins: [],
};
