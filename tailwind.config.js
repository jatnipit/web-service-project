/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Poppins', 'sans-serif'],
        // sans: ['Roboto', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          500: 'hsl(214,75%,25%)',
          700: 'hsl(215,75%,17%)',
        },
        orangeCustom: {
          400: 'hsl(38,77%,52%)',
        },
        grayCustom: {
          200: 'hsl(0,0%,74%)',
        },
      },
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-animated')],
  daisyui: {
    themes: ['light', 'black'],
  },
};
