import { Coordinates, scrolledPage } from './utils'

export const setOffset = (element: HTMLElement): Coordinates => {
  return {
    top: element.getBoundingClientRect().top + scrolledPage().top,
    left: element.getBoundingClientRect().left + scrolledPage().left,
  } as Coordinates
}

export const setAnimation = (): void => {
  const items = document.querySelectorAll('*[data-anim]') as NodeListOf<HTMLElement>

  items.forEach((item: HTMLElement): void => {
    if (!item) return

    const height: number = item.offsetHeight
    const offsetTop: number = setOffset(item).top
    const screenPosition: number = 3
    let point: number = window.innerHeight - height / screenPosition

    if (point > window.innerHeight) point = window.innerHeight - window.innerHeight / screenPosition

    if (scrolledPage().top > offsetTop - point && scrolledPage().top < offsetTop + height) item.dataset.anim = 'show'
  })
}

export default (): void => {
  setAnimation()
  document.addEventListener('scroll', setAnimation as EventListener)
}
