/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0057B8',
          50: '#EBF4FF',
          100: '#C9E2FF',
          200: '#90C3FF',
          300: '#57A3FF',
          400: '#2484FF',
          500: '#0057B8',
          600: '#004A9E',
          700: '#003D84',
          800: '#002F6A',
          900: '#002050',
        },
        accent: {
          DEFAULT: '#F97316',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA6C0A',
          700: '#C2530A',
          800: '#9A3A0A',
          900: '#7C2D12',
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 87, 184, 0.08)',
        'card-hover': '0 20px 40px rgba(0, 87, 184, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'cta': '0 8px 20px rgba(249, 115, 22, 0.35)',
        'primary': '0 8px 20px rgba(0, 87, 184, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.72) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #0057B8 0%, #0073E6 100%)',
        'accent-gradient': 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 14px rgba(37, 211, 102, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};