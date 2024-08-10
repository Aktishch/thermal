const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  const checkColor = (color, amount) => {
    if (color[0] === '#') color = color.slice(1)

    const number = parseInt(color, 16)
    const r = (number >> 16) + amount
    const g = (number & 0x0000ff) + amount
    const b = ((number >> 8) & 0x00ff) + amount

    const checkColorValue = (value) => {
      if (value > 255) value = 255
      if (value < 0) value = 0

      return value
    }

    const red = checkColorValue(r)
    const green = checkColorValue(g)
    const blue = checkColorValue(b)

    return ((red << 16) | green | (blue << 8)).toString(16)
  }

  const getColor = (color, amount) => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)

    const getColorValue = (value) => {
      value = parseInt(value + amount)
      value = value < 255 ? value : 255
      value = value > 0 ? value : 0
      value = Math.round(value)

      return value.toString(16).length === 1
        ? `0${value.toString(16)}`
        : value.toString(16)
    }

    const red = getColorValue(r)
    const green = getColorValue(g)
    const blue = getColorValue(b)

    return `#${red + green + blue}`
  }

  addComponents({
    '.btn': {
      '*': {
        pointerEvents: 'none',
      },
      '--tw-btn-color': theme('colors.black.DEFAULT'),
      '--tw-btn-accent': theme('colors.white.DEFAULT'),
      color: 'var(--tw-btn-color)',
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.semibold'),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      transition: '200ms ease',
      cursor: 'pointer',
      '&:active': {
        boxShadow: `inset 0 4px 4px ${formatColor({
          mode: 'rgba',
          color: parseColor(theme('colors.black.DEFAULT')).color,
          alpha: 0.3,
        })}`,
        transform: 'translateY(0.25rem)',
      },
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '&:focus-visible': {
        boxShadow: '0 0 0 4px var(--tw-btn-focus)',
        backgroundColor: 'var(--tw-btn-fade)',
      },
      '@media (hover)': {
        '&:hover': {
          backgroundColor: 'var(--tw-btn-fade)',
        },
      },
      '&-fill': {
        color: 'var(--tw-btn-accent)',
        backgroundColor: 'var(--tw-btn-color)',
        '&:focus-visible': {
          backgroundColor: 'var(--tw-btn-hovered)',
        },
        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--tw-btn-hovered)',
          },
        },
      },
      '&-fade': {
        color: 'var(--tw-btn-color)',
        backgroundColor: 'var(--tw-btn-fade)',
        '&:focus-visible': {
          color: 'var(--tw-btn-accent)',
          backgroundColor: 'var(--tw-btn-color)',
        },
        '@media (hover)': {
          '&:hover': {
            color: 'var(--tw-btn-accent)',
            backgroundColor: 'var(--tw-btn-color)',
          },
        },
      },
      '&-light': {
        color: 'var(--tw-btn-color)',
        backgroundColor: 'var(--tw-btn-accent)',
        border: `1px solid ${theme('colors.transparent')}`,
        '&:focus-visible': {
          backgroundColor: 'var(--tw-btn-accent)',
          borderColor: 'var(--tw-btn-color)',
        },
        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--tw-btn-accent)',
            borderColor: 'var(--tw-btn-color)',
          },
        },
      },
      '&-contur': {
        border: '1px solid var(--tw-btn-color)',
      },
      '&-swipe': {
        zIndex: 1,
        overflow: 'hidden',
        '&::before': {
          content: theme('content.auto'),
          position: 'absolute',
          zIndex: -1,
          top: 0,
          right: 0,
          bottom: 0,
          left: 'auto',
          width: 0,
          transition: '200ms ease-in-out',
          backgroundColor: 'var(--tw-btn-color)',
        },
        '@media (hover)': {
          '&:hover': {
            color: 'var(--tw-btn-accent)',
            backgroundColor: theme('colors.transparent'),
            '&::before': {
              left: 0,
              width: '100%',
            },
          },
        },
      },
    },
  })
  matchComponents(
    {
      btn: (color) => {
        if (!color.DEFAULT) return null

        const parsed = parseColor(color.DEFAULT)

        if (!parsed.color) return null

        const [r, g, b] = parsed.color
        const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
        const amount = 25

        return {
          '--tw-btn-color': color.DEFAULT,
          '--tw-btn-fade': formatColor({
            mode: 'rgba',
            color: parsed.color,
            alpha: 0.3,
          }),
          '--tw-btn-focus': formatColor({
            mode: 'rgba',
            color: parsed.color,
            alpha: 0.4,
          }),
          '--tw-btn-hovered':
            checkColor(hex, -amount) !== '0'
              ? getColor(hex, -amount)
              : getColor(hex, amount),
        }
      },
    },
    {
      values: theme('colors'),
    }
  )
  matchComponents(
    {
      btn: (constant) => {
        return {
          '--tw-btn-size': `${constant / 16}rem`,
          borderRadius: theme('borderRadius.md'),
          height: 'var(--tw-btn-size)',
          paddingInline: `calc(var(--tw-btn-size) / 2)`,
        }
      },
    },
    {
      values: theme('constants'),
    }
  )
})
