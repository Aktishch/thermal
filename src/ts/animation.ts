import { Coordinates } from './functions/coordinates'
import { scrolledPage } from './functions/scrolled-page'

const setOffset = (element: HTMLElement): Coordinates => {
  const coordinates: Coordinates = {
    top: element.getBoundingClientRect().top + scrolledPage().top,
    left: element.getBoundingClientRect().left + scrolledPage().left,
  }

  return coordinates
}

export const animation = (): void => {
  const items = document.querySelectorAll(
    '*[data-anim]'
  ) as NodeListOf<HTMLElement>

  items.forEach((item: HTMLElement): void => {
    if (!item) return

    const height: number = item.offsetHeight
    const offsetTop: number = setOffset(item).top
    const screenPosition: number = 4
    let point: number = window.innerHeight - height / screenPosition

    if (point > window.innerHeight)
      point = window.innerHeight - window.innerHeight / screenPosition

    scrolledPage().top > offsetTop - point &&
    scrolledPage().top < offsetTop + height
      ? (item.dataset.anim = 'show')
      : (item.dataset.anim = 'hidden')
  })
}

export default (): void => {
  animation()
  document.addEventListener('scroll', animation as EventListener)
}
