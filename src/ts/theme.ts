export default (): void => {
  const html = document.documentElement as HTMLHtmlElement
  const toggles = html.querySelectorAll(
    '*[data-theme="toggle"]'
  ) as NodeListOf<HTMLInputElement>
  let theme: string = 'default'

  const togglesChecked = (check: boolean): void => {
    toggles.forEach((toggle: HTMLInputElement): void => {
      toggle.checked = check
    })
  }

  const variationTheme = (): void => {
    switch (html.classList.contains('dark')) {
      case true: {
        theme = 'default'
        localStorage.setItem('theme', theme)
        html.classList.remove('dark')
        togglesChecked(false)
        break
      }

      case false: {
        theme = 'dark'
        localStorage.setItem('theme', theme)
        html.classList.add('dark')
        togglesChecked(true)
        break
      }
    }
  }

  if (localStorage.getItem('theme')) {
    theme = String(localStorage.getItem('theme'))

    switch (theme) {
      case 'default': {
        html.classList.remove('dark')
        togglesChecked(false)
        break
      }

      case 'dark': {
        html.classList.add('dark')
        togglesChecked(true)
        break
      }
    }
  }

  toggles.forEach((toggle: HTMLInputElement): void => {
    toggle.addEventListener('click', variationTheme as EventListener)
  })

  document.addEventListener('keyup', ((event: KeyboardEvent): void => {
    if (event.altKey && event.code === 'Digit5') variationTheme()
  }) as EventListener)
}
