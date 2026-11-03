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
        obsidian: {
          DEFAULT: '#060911',
          elevated: '#0B101E',
          card: '#10182B',
          hover: '#16213A',
        },
        brand: {
          DEFAULT: '#0056B2',
          electric: '#2563EB',
          sky: '#38BDF8',
          indigo: '#6366F1',
          glow: 'rgba(56, 189, 248, 0.22)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        bento: '1.375rem',
        pill: '9999px',
      },
      boxShadow: {
        'glass-pill': '0 16px 48px -12px rgba(2, 6, 23, 0.78), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'bento-card': '0 24px 64px -20px rgba(2, 6, 23, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'brand-glow': '0 0 40px -8px rgba(37, 99, 235, 0.55)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
