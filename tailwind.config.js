module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '1440px',
      },
    },
    extend: {
      screens: {
        s1440: '1440px',
      },
      backgroundImage: {
        linearG: 'linear-gradient(180deg, #024F2C 0%, #047844 100%)',
        linearG2: 'linear-gradient(180deg, #022817 0%, #218257 100%)',
      },
      boxShadow: {
        s1: '0px 12px 55px rgba(0, 0, 0, 0.19)',
      },
      colors: {
        primary: {
          green: '#046439',
          green2: '#023C22',
          green3: '#A3EACA',
          red1: '#DD5D52',
          red2: '#F2C2BE',
          red3: '#AA2A1F',
          gray1: '#A79AAD',
          gray2: '#D2C4D9',
          gray3: '#896D97',
          gray4: '#FCF6FF',
          dark1: '#1D1223',
          yellow1: '#F5DB6D',
          blue1: '#D0C6F3',
          blue2: '#2F1A77',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
