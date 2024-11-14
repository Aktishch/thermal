import { Coordinates, touchDevice } from './utils'

export type WavedCircle = {
  positionY: number
  positionX: number
}

const setWaved = (event: Event): void => {
  const item = (event.target as HTMLElement).closest(
    '[data-waved]'
  ) as HTMLElement
  const waved = item.querySelector('.waved') as HTMLDivElement
  const circle = document.createElement('div') as HTMLDivElement

  const createCircle = ({ positionY, positionX }: WavedCircle): void => {
    const coordinates: Coordinates = {
      top: positionY - item.getBoundingClientRect().top,
      left: positionX - item.getBoundingClientRect().left,
    }

    circle.classList.add('waved-circle')
    circle.style.top = `${coordinates.top}px`
    circle.style.left = `${coordinates.left}px`
    waved.appendChild(circle)
    setTimeout((): void => circle.remove(), 1000)
  }

  switch (event.type) {
    case 'touchstart': {
      if (!touchDevice()) return

      createCircle({
        positionY: (event as TouchEvent).touches[0].clientY,
        positionX: (event as TouchEvent).touches[0].clientX,
      })

      break
    }

    case 'mousedown': {
      if (touchDevice()) return

      createCircle({
        positionY: (event as MouseEvent).clientY,
        positionX: (event as MouseEvent).clientX,
      })

      break
    }
  }
}

export default (): void => {
  const items = document.querySelectorAll(
    '*[data-waved]'
  ) as NodeListOf<HTMLElement>

  items.forEach((item: HTMLElement): void => {
    if (!item) return

    const waved = document.createElement('div') as HTMLDivElement

    waved.classList.add('waved')
    item.appendChild(waved)
    item.addEventListener('touchstart', setWaved as EventListener)
    item.addEventListener('mousedown', setWaved as EventListener)
  })
}
