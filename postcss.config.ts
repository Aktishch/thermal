module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        '>0.5%',
        'last 5 chrome version',
        'last 5 firefox version',
        'last 15 safari version',
        'last 5 ie version',
      ],
    },
  },
}
