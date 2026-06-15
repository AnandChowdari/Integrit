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
        'display': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['"Kepler Std Subhead"', 'Georgia', 'serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'syne': ['Syne', 'sans-serif'],
      },
      animation: {
        'count-up': 'countUp 2s ease-out forwards',
        'slide-up-fade': 'slideUpFade 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'sticky-drop': 'stickyDrop 0.3s ease-out forwards',
      },
      keyframes: {
        countUp: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideUpFade: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(198,255,52,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(198,255,52,0.35)' },
        },
        stickyDrop: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
