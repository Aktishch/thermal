const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.btn': {
      '*': {
        pointerEvents: 'none',
      },
      '--tw-btn-color': theme('colors.black.DEFAULT'),
      '--tw-btn-fade': formatColor({
        mode: 'rgba',
        color: parseColor(theme('colors.black.DEFAULT')).color,
        alpha: 0.3,
      }),
      '--tw-btn-focus': formatColor({
        mode: 'rgba',
        color: parseColor(theme('colors.black.DEFAULT')).color,
        alpha: 0.4,
      }),
      '--tw-btn-accent': theme('colors.white.DEFAULT'),
      '--tw-btn-hovered': theme('colors.black.DEFAULT'),
      '--tw-btn-fill': 'color-mix(in srgb, var(--tw-btn-color) 80%, var(--tw-btn-hovered))',
      color: 'var(--tw-btn-color)',
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.semibold'),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      transitionProperty: 'color, background-color, border-color, box-shadow, opacity, transform',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease',
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
          backgroundColor: 'var(--tw-btn-fill)',
        },
        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--tw-btn-fill)',
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
      '&-text': {
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
      '&-light': {
        '--tw-btn-hovered': theme('colors.white.DEFAULT'),
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
        if (typeof color !== 'function') return null

        const value = color({})
        const parsed = parseColor(value)

        return {
          '--tw-btn-color': value,
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
