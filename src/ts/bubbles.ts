const setBubbles = (event: Event): void => {
  const btn = event.target as HTMLButtonElement | HTMLAnchorElement

  btn.dataset.bubles = 'show'
  btn.classList.add('pointer-events-none')
  setTimeout((): void => {
    btn.dataset.bubles = ''
    btn.classList.remove('pointer-events-none')
  }, 600)
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if (
      (event.target as HTMLButtonElement | HTMLAnchorElement).closest(
        '[data-bubbles]'
      )
    )
      setBubbles(event)
  }) as EventListener)
}
