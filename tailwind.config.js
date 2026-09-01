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
          950: '#060b14',
          900: '#0a1220',
          850: '#0e1a2e',
          800: '#14243e',
          750: '#1b2f4f',
          700: '#233b62',
          600: '#2d4b7a',
          500: '#3b629b',
          400: '#5880a8',
          300: '#7fa4c8',
          200: '#a8c4de',
          100: '#d4e4f0',
          50:  '#eef5fb',
        },
        ink: {
          950: '#05080e',
          900: '#090e17',
          800: '#111824',
          700: '#1a2433',
          600: '#243245',
          500: '#304259',
        },
        ice: {
          600: '#33769c',
          500: '#3a8ebd',
          400: '#52a5d7',
          300: '#7ec1e8',
          200: '#abd8f2',
          100: '#d6edf9',
          50:  '#f0f8fd',
        },
        teal: {
          600: '#238577',
          500: '#2fa393',
          400: '#42c2b1',
          300: '#6dd7c9',
          200: '#9ee6dc',
          100: '#d4f5f0',
        },
        aurora: {
          500: '#6366f1',
          400: '#818cf8',
          300: '#a5b4fc',
        },
        slate: {
          950: '#060910',
          925: '#0b111b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        '3xs': ['0.58rem', { lineHeight: '0.85rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.3)',
        'panel': '0 4px 16px 0 rgba(0,0,0,0.45)',
        'elevated': '0 12px 32px 0 rgba(0,0,0,0.55)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0,0,0,0.3)',
        'ice-glow': '0 0 20px -3px rgba(82, 165, 215, 0.25)',
        'teal-glow': '0 0 20px -3px rgba(66, 194, 177, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        'DEFAULT': '4px',
        'sm': '3px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      letterSpacing: {
        'widest2': '0.22em',
      },
      maxWidth: {
        'reading': '68ch',
        'content': '90ch',
      },
      transitionTimingFunction: {
        'ease-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring-subtle': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
