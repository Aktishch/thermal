import { Coordinates } from './utils'

const randomPpsition = ({ min, max }: { min: number; max: number }): number => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

export default (): void => {
  const running = document.querySelector('*[data-running]') as HTMLDivElement

  if (!running) return

  const button = running.querySelector(
    '*[data-running-button]'
  ) as HTMLButtonElement

  running.addEventListener('mouseenter', ((): void => {
    const coordinates: Coordinates = {
      top: randomPpsition({ min: 0, max: 90 }),
      left: randomPpsition({ min: 0, max: 90 }),
    }

    running.style.top = `${coordinates.top}%`
    running.style.left = `${coordinates.left}%`
  }) as EventListener)

  button.addEventListener('mousedown', ((): void => {
    alert('Агаааааа, попалась!!!!')
  }) as EventListener)
}
