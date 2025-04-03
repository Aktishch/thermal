const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addComponents, theme }) => {
    let anim = {
      '.anim': {
        transitionProperty: 'transform, opacity, visibility',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease',
      },
    }
    Object.entries(theme('anim')).map(([key, value]) => {
      anim = {
        ...anim,
        [`.anim-${key}:not([data-anim="show"])`]: {
          transform: `${value}`,
          visibility: 'hidden',
          opacity: 0,
        },
      }
    })
    addComponents(anim)
  },
  {
    theme: {
      anim: {
        fade: 'none',
        increase: 'scale(0)',
        decrease: 'scale(1.3)',
        circle: 'rotate(1turn)',
        up: 'translateY(3.5rem)',
        down: 'translateY(-3.5rem)',
        left: 'translateX(3.5rem)',
        right: 'translateX(-3.5rem)',
      },
    },
  }
)
