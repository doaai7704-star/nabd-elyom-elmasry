module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#c40000'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif']
      }
    }
  },
  plugins: []
}
