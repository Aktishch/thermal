import { scrolledPage } from './utils'

export const setProgressLineWidth = (): void => {
  const progressLine = document.querySelector(
    '*[data-progress-line]'
  ) as HTMLDivElement

  if (progressLine)
    progressLine.style.width = `${Math.floor((scrolledPage().top / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
}

export default (): void =>
  document.addEventListener('scroll', setProgressLineWidth as EventListener)
