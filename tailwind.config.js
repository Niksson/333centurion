import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      'bumblebee',
      'business',
      {
        beerDark: {
          primary: '#ffb703', // beer yellow
          secondary: '#023047', // dark blue
          accent: '#fb8500', // orange
          neutral: '#3d4451', // dark gray
          'base-100': '#0f172a', // business theme's very dark background color
          info: '#219ebc', // light blue
          success: '#8ecae6', // light cyan
          warning: '#ffb703', // beer yellow
          error: '#d00000' // red
        }
      },
      {
        beerBright: {
          primary: '#ffb703', // beer yellow
          secondary: '#fb8500', // orange
          accent: '#023047', // dark blue
          neutral: '#f5f5f5', // light gray
          'base-100': '#ffffff', // white
          info: '#219ebc', // light blue
          success: '#8ecae6', // light cyan
          warning: '#ffb703', // beer yellow
          error: '#d00000' // red
        }
      }
    ]
  },
  plugins: [typography, daisyui]
}
