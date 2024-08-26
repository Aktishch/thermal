const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.switch': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      color: theme('colors.primary.DEFAULT'),
      border: `1px solid ${theme('colors.gray.DEFAULT')}`,
      transition: '200ms linear',
      appearance: 'none',
      cursor: 'pointer',
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '@media (hover)': {
        '&:hover': {
          boxShadow: `0 0 0 4px ${formatColor({
            mode: 'rgba',
            color: parseColor(theme('colors.gray.DEFAULT')).color,
            alpha: 0.4,
          })}`,
        },
      },
      '&-checkbox': {
        minWidth: '1.5rem',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: theme('borderRadius.sm'),
        '&::after': {
          content: theme('content.auto'),
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: theme('colors.white.DEFAULT'),
          borderRadius: theme('borderRadius.inherit'),
          opacity: 0,
          transition: 'opacity 100ms linear',
          mask: `url("data:image/svg+xml,%3Csvg viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.7489 0.234315C12.0837 0.546734 12.0837 1.05327 11.7489 1.36569L4.89181 7.76569C4.55707 8.0781 4.01436 8.0781 3.67962 7.76569L0.251051 4.56569C-0.0836838 4.25327 -0.0836838 3.74673 0.251051 3.43431C0.585786 3.1219 1.1285 3.1219 1.46323 3.43431L4.28571 6.06863L10.5368 0.234315C10.8715 -0.0781049 11.4142 -0.0781049 11.7489 0.234315Z'/%3E %3C/svg%3E") no-repeat center / 1rem`,
        },
        '&:checked': {
          borderColor: theme('colors.current'),
          backgroundColor: theme('colors.current'),
          '&::after': {
            opacity: 1,
          },
        },
      },
      '&-radio': {
        minWidth: '1.25rem',
        width: '1.25rem',
        height: '1.25rem',
        borderRadius: theme('borderRadius.full'),
        '&::after': {
          content: theme('content.auto'),
          display: 'block',
          width: '0.75rem',
          height: '0.75rem',
          backgroundColor: theme('colors.current'),
          borderRadius: theme('borderRadius.inherit'),
          transform: 'scale(0)',
          transition: 'opacity 100ms linear, transform 100ms linear',
          opacity: 0,
        },
        '&:checked': {
          '&::after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      '&-checkbox, &-radio': {
        '&::before': {
          content: theme('content.auto'),
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '100%',
          height: '100%',
          visibility: 'hidden',
          transform: 'translate(-50%, -50%) scale(0)',
          borderRadius: theme('borderRadius.inherit'),
          backgroundColor: theme('colors.current'),
          transition: 'opacity 300ms linear, transform 400ms linear',
          pointerEvents: 'none',
        },
        '&:checked': {
          '&::before': {
            visibility: 'visible',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(3)',
          },
        },
      },
      '&-toggle': {
        minWidth: '5rem',
        width: '5rem',
        height: '2.188rem',
        borderRadius: theme('borderRadius.full'),
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          marginBlock: 'auto',
          height: '1.5rem',
          borderRadius: theme('borderRadius.full'),
        },
        '&:not(:checked)::after': {
          left: '0.25rem',
          right: '3.125rem',
          backgroundColor: theme('colors.gray.DEFAULT'),
          transition: 'left 500ms ease, right 400ms ease 200ms',
        },
        '&:checked::after': {
          left: '3.125rem',
          right: '0.25rem',
          backgroundColor: theme('colors.current'),
          transition:
            'left 400ms ease 200ms, right 500ms ease, background-color 350ms ease -100s',
        },
      },
    },
  })
})
