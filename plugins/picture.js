const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.image': {
      position: 'absolute',
      inset: '0',
      maxWidth: 'none',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      '&-rise': {
        transition: 'transform 300ms linear',
        '@media (hover)': {
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    '.icon': {
      display: 'block',
      minWidth: '1em',
      width: '1em',
      height: '1em',
    },
  })
})
