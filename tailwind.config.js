module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem'
      },

      width: {
        '1180px': '1180px'
      }
    }
  },
  variants: {
    extend: {
      margin: ['last'],
      backgroundColor: ['disabled'],
      borderWidth: ['last'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
      opacity: ['disabled'],
      cursor: ['disabled']
    }

  },
  plugins: []
}
