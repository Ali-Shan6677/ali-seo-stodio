/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind scans these files for class names. Add new folders here if you create them.
  content: ['./*.html', './services/*.html', './blog/*.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1220',
        brand: '#2563EB',
        accent: { DEFAULT: '#14B8A6', dark: '#0F766E' },
        ink: '#111827',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
