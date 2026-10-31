/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F0F11',
          card: '#16161A',
          border: '#27272E',
          terracota: '#E06D53',
          gold: '#D4A373',
          sand: '#E9D8A6',
          sage: '#2A9D8F',
          crimson: '#9B2226',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
