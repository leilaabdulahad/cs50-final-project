module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        '10': '2.5rem',  // 40px
      },
      minHeight: {
        '10': '2.5rem',  // 40px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}