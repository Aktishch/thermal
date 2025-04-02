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
    let clipPath = {
      '.clip-path': {
        transitionProperty: 'clip-path',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
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
    Object.entries(theme('clipPath')).map(([key, value]) => {
      clipPath = {
        ...clipPath,
        [`.clip-path-${key}:not([data-anim="show"])`]: {
          clipPath: `${value}`,
        },
      }
    })
    addComponents(anim)
    addComponents(clipPath)
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
      clipPath: {
        up: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        down: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        left: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        right: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      },
    },
  }
)
