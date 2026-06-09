/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#111111',
        'bg-tertiary': '#161616',
        'accent-primary': '#C6FF34',
        'accent-secondary': '#A8E620',
        'text-primary': '#FFFFFF',
        'text-secondary': '#888888',
        'border-default': '#1E1E1E'
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
