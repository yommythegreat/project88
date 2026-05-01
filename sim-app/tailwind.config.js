/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        sim: {
          bg:      '#080A0C',
          surface: '#0F1014',
          border:  '#1C1C28',
          muted:   '#58606E',
          text:    '#EDE9E0',
          accent:  '#C9B76A',
          teal:    '#5BBFBF',
          coral:   '#E07070',
          blue:    '#5B9BD5',
          purple:  '#9B72CF',
        },
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: '0' },                                          '100%': { opacity: '1' } },
        slideUp:  { '0%': { opacity: '0', transform: 'translateY(20px)' },           '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn:  { '0%': { opacity: '0', transform: 'translateX(-8px)' },           '100%': { opacity: '1', transform: 'translateX(0)' } },
        orbPulse: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(201,183,106,0.15), 0 0 48px rgba(201,183,106,0.05), inset 0 0 20px rgba(201,183,106,0.05)' },
          '50%':      { boxShadow: '0 0 48px rgba(201,183,106,0.35), 0 0 80px rgba(201,183,106,0.12), inset 0 0 30px rgba(201,183,106,0.10)' },
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.7s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'slide-in': 'slideIn 0.4s ease-out both',
        'orb-pulse':'orbPulse 3s ease-in-out infinite',
      },
      transitionDuration: { 700: '700ms' },
    },
  },
  plugins: [],
}
