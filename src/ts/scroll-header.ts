import { scrolledPage } from './utils'

export default (): void => {
  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  const scrollHeader = (): void => {
    const currentOffsetTop: number = scrolledPage().top

    header.offsetHeight / 2 < currentOffsetTop
      ? header.classList.remove('lg:top-12', 'bg-opacity-0')
      : header.classList.add('lg:top-12', 'bg-opacity-0')
  }

  scrollHeader()
  document.addEventListener('scroll', scrollHeader as EventListener)
}
