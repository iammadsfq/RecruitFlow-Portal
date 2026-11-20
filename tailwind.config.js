/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFCC00',
          yellowHover: '#F2BE00',
          yellowSubtle: '#FFF7CC',
          yellowSoft: '#FFFBE6',
          navy: '#172033',
          navyHover: '#25324A',
          navySubtle: '#E9EDF3',
          violet: '#6656D9',
          violetSubtle: '#F0EDFF',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
