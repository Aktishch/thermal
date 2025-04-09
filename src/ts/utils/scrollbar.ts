import { touchDevice } from './touch-device'

export const scrollbarShow = (): void => {
  const html = document.documentElement as HTMLHtmlElement

  if (!touchDevice()) html.style.marginRight = '0'

  html.classList.remove('overflow-hidden')
}

export const scrollbarHidden = (): void => {
  const html = document.documentElement as HTMLHtmlElement
  const scrollbarWidth: number = window.innerWidth - html.clientWidth

  if (!touchDevice()) html.style.marginRight = `${scrollbarWidth}px`

  html.classList.add('overflow-hidden')
}
