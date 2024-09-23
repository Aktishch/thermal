const setCookie = (event: Event): void => {
  const block = (event.target as HTMLButtonElement).closest(
    '[data-cookie]'
  ) as HTMLElement
  const id: string = block.id
  const path: string = String(block.dataset.cookie) || ''

  document.cookie = `cookie_${id}_active=1; path=${path}; max-age=${7 * 24 * 60 * 60}`
  block.remove()
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).hasAttribute('data-cookie-button'))
      setCookie(event)
  }) as EventListener)
}
