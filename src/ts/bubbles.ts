type Button = HTMLButtonElement | HTMLAnchorElement

const setBubbles = (event: Event): void => {
  const button = event.target as Button

  button.dataset.bubles = 'show'
  button.classList.add('pointer-events-none')
  setTimeout((): void => {
    button.dataset.bubles = ''
    button.classList.remove('pointer-events-none')
  }, 600)
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as Button).closest('[data-bubbles]')) setBubbles(event)
  }) as EventListener)
}
