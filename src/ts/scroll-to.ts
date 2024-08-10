import { scrolledPage } from './utils'

const scrollTo = (event: Event): void => {
  event.preventDefault()

  const link = event.target as HTMLAnchorElement
  const id: string = String(link.getAttribute('href'))

  if (id[0] != '#' || id === '#') return

  const block = document.querySelector(id) as HTMLElement

  if (block) {
    const header = document.querySelector('*[data-header]') as HTMLElement
    const offsetTop: number =
      block.getBoundingClientRect().top +
      scrolledPage().top -
      (header ? header.offsetHeight : 0)

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })
  }
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLAnchorElement).hasAttribute('data-scroll'))
      scrollTo(event)
  }) as EventListener)
}
