/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: 'rgba(var(--cyber-primary-rgb), <alpha-value>)',
          darkgreen: 'var(--cyber-primary-dark)',
          lime: '#39ff14',
          dark: '#0a0a0a',
          darker: '#050505',
          card: '#0d1117',
          border: 'rgba(var(--cyber-primary-rgb), 0.15)',
          glow: 'var(--cyber-glow)',
          text: 'var(--cyber-text)',
          muted: 'var(--cyber-muted)',
          cyan: '#00e5ff',
          purple: '#8b5cf6',
          red: '#ff073a',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'matrix-fall': 'matrixFall 20s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'type-cursor': 'typeCursor 0.7s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'cyber-border': 'cyberBorder 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'counter': 'counter 2s ease-out',
        'glitch': 'glitch 1s linear infinite',
        'boot-text': 'bootText 0.05s steps(1) both',
      },
      keyframes: {
        matrixFall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(var(--cyber-primary-rgb),0.3), 0 0 10px rgba(var(--cyber-primary-rgb),0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(var(--cyber-primary-rgb),0.6), 0 0 40px rgba(var(--cyber-primary-rgb),0.3)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        typeCursor: {
          '0%, 100%': { borderColor: 'var(--cyber-primary)' },
          '50%': { borderColor: 'transparent' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        cyberBorder: {
          '0%': { borderColor: 'var(--cyber-primary)' },
          '33%': { borderColor: '#00e5ff' },
          '66%': { borderColor: '#8b5cf6' },
          '100%': { borderColor: 'var(--cyber-primary)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glitch: {
          '0%': { clipPath: 'inset(40% 0 61% 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
