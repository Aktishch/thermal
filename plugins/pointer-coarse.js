const plugin = require('tailwindcss/plugin')
const postcss = require('postcss')

module.exports = plugin(({ addVariant, e }) => {
  addVariant('pointer-coarse', ({ container, separator }) => {
    const pointerCoarse = postcss.atRule({
      name: 'media',
      params: '(pointer: coarse)',
    })

    pointerCoarse.append(container.nodes)
    container.append(pointerCoarse)

    pointerCoarse.walkRules((rule) => {
      rule.selector = `.${e(`pointer-coarse${separator}${rule.selector.slice(1)}`)}`
    })
  })
})
