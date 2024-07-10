const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, theme }) => {
  const shadow = parseColor(theme('colors.black.DEFAULT')).color

  addComponents({
    '.card': {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: theme('colors.white.DEFAULT'),
      borderRadius: theme('borderRadius.2xl'),
      transition: '200ms ease',
      overflow: 'hidden',
      '&-hovered': {
        boxShadow: `8px 8px 4px ${formatColor({ mode: 'rgba', color: shadow, alpha: 0.2 })}`,
        '@media (hover)': {
          '&:hover': {
            boxShadow: `8px 8px 4px ${formatColor({ mode: 'rgba', color: shadow, alpha: 0.4 })}`,
          },
        },
      },
      '&-active': {
        '&:active': {
          transform: 'translateY(0.25rem)',
        },
      },
      '&-content': {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      },
    },
  })
})
