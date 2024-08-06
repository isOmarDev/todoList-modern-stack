/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#1C1C1C',
        charcoal: '#292929',
        gray: '#3D3D3D',
        slate: '#4B4B4B',
        white: '#FFFFFF',
        active: '#272729',
        sky: '#7ec7c3',
      },
      fontFamily: {
        segoe: [
          'Segoe UI',
          'ahoma',
          'Geneva',
          'Verdana',
          'sans-serif',
        ],
      },
      transitionProperty: {
        colors:
          'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke',
      },
    },
  },
  plugins: [],
};
