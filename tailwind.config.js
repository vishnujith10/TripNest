/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4ECE1',
          300: '#EADCC9',
          400: '#D9C5AA',
          500: '#C7AC87',
          800: '#4A3B2C',
          900: '#2A1F17',
        },
        vintage: {
          ink: '#1E293B',
          amber: '#D97706',
          rust: '#C2410C',
          terracotta: '#9A3412',
          teal: '#0D9488',
          sage: '#115E59',
          navy: '#0F172A',
          gold: '#B45309',
          stamp: '#DC2626',
        },
      },
      boxShadow: {
        polaroid: '0 8px 24px -4px rgba(42, 31, 23, 0.12), 0 2px 6px -1px rgba(42, 31, 23, 0.08)',
        stamp: 'inset 0 0 0 2px #C7AC87, 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
