const plugin = require('tailwindcss/plugin')
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.input': {
      '--tw-input-text': theme('colors.black.DEFAULT'),
      display: 'block',
      width: '100%',
      height: 'var(--tw-input-size)',
      color: 'var(--tw-input-text)',
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.normal'),
      backgroundColor: theme('colors.white.DEFAULT'),
      padding: 'calc(var(--tw-input-size) / 4) calc(var(--tw-input-size) / 3)',
      border: '1px solid var(--tw-input-color)',
      borderRadius: theme('borderRadius.lg'),
      transition: '200ms ease',
      userSelect: 'initial',
      '&:focus': {
        boxShadow: '0 0 0 1px var(--tw-input-color)',
      },
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '&-fade': {
        '--tw-input-text': theme('colors.white.DEFAULT'),
        backgroundColor: theme('colors.transparent'),
      },
      '&&-error': {
        '--tw-input-color': theme('colors.red.DEFAULT'),
      },
      '&:-webkit-autofill': {
        color: 'var(--tw-input-text) !important',
        borderColor: 'var(--tw-input-color)',
        background: 'none !important',
        appearance: 'none',
        transition: 'background-color 1000000ms ease-in-out 0ms',
        '-webkit-text-fill-color': 'var(--tw-input-text) !important',
        '-webkit-text-stroke-color': 'var(--tw-input-text) !important',
      },
      '@media (hover)': {
        '&:hover': {
          backgroundColor: 'var(--tw-input-hovered)',
        },
      },
    },
  })
  matchComponents(
    {
      input: (color) => {
        if (typeof color !== 'function') return null

        const value = color({})
        const parsed = parseColor(value)

        return {
          '--tw-input-color': value,
          '--tw-input-hovered': formatColor({
            mode: 'rgba',
            color: parsed.color,
            alpha: 0.1,
          }),
        }
      },
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
  matchComponents(
    {
      input: (constant) => {
        return {
          '--tw-input-size': `${constant / 16}rem`,
        }
      },
    },
    {
      values: theme('constants'),
    }
  )
})
