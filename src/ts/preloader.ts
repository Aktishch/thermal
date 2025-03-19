export default (): void => {
  const preloader = document.querySelector('*[data-preloader]') as HTMLDivElement

  if (!preloader) return

  preloader.classList.add('invisible', 'opacity-0')
  setTimeout((): void => preloader.remove(), 500)
}
