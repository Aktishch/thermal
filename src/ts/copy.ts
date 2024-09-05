const copyText = (event: Event): void => {
  const button = event.target as HTMLButtonElement
  const copy = button.closest('[data-copy]') as HTMLDivElement
  const result = copy.querySelector('[data-copy-result]') as HTMLSpanElement

  button.disabled = true
  window.navigator.clipboard.writeText(String(copy.dataset.copy))
  result.classList.remove('invisible', 'opacity-0')
  setTimeout((): void => {
    button.disabled = false
    result.classList.add('invisible', 'opacity-0')
  }, 1000)
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-copy-button]'))
      copyText(event)
  }) as EventListener)
}
