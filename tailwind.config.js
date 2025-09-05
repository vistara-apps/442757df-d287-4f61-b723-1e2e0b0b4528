/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 95%)',
        accent: 'hsl(140 70% 45%)',
        danger: 'hsl(0 80% 50%)',
        primary: 'hsl(220 80% 50%)',
        surface: 'hsl(220 15% 100%)',
        warning: 'hsl(40 80% 50%)',
        'text-primary': 'hsl(220 15% 10%)',
        'text-secondary': 'hsl(220 10% 30%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220,10%,20%,0.1)',
        'modal': '0 8px 24px hsla(220,10%,20%,0.15)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
