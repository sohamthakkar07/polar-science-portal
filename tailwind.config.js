/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          950: '#080e18',
          900: '#0d1421',
          850: '#111b2d',
          800: '#172338',
          750: '#1d2d45',
          700: '#253752',
          600: '#2e4566',
          500: '#3a5a84',
          400: '#5880a8',
          300: '#7fa4c8',
          200: '#a8c4de',
          100: '#d4e4f0',
          50:  '#eef5fb',
        },
        ink: {
          900: '#0d1117',
          800: '#161c24',
          700: '#1e2d3d',
          600: '#273648',
          500: '#344a5f',
        },
        ice: {
          600: '#3d7fa8',
          500: '#4a95c2',
          400: '#5ba3c9',
          300: '#7bbdd8',
          200: '#a2d0e5',
          100: '#d0e8f2',
        },
        teal: {
          600: '#2d7a6d',
          500: '#3d9e8f',
          400: '#4db8a8',
          300: '#70ccbe',
          200: '#9dddd5',
        },
        frost: {
          cyan:  '#5ba3c9',
          teal:  '#4db8a8',
          blue:  '#3d7fa8',
          white: '#e8f4f8',
        },
        slate: {
          925: '#0f1620',
          950: '#0a0f18',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.3)',
        'panel': '0 4px 12px 0 rgba(0,0,0,0.35)',
        'elevated': '0 8px 24px 0 rgba(0,0,0,0.4)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0,0,0,0.3)',
        'polar-glow': '0 0 20px 0 rgba(91,163,201,0.15)',
        'ice-glow': '0 0 12px 0 rgba(91,163,201,0.2)',
      },
      borderRadius: {
        'DEFAULT': '4px',
        'sm': '3px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      letterSpacing: {
        'widest2': '0.2em',
      },
      maxWidth: {
        'reading': '68ch',
        'content': '90ch',
      },
      transitionTimingFunction: {
        'ease-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
