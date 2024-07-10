type Media = {
  [index: string]: number
}

declare global {
  interface Window {
    media: Media
  }
}

export const media: Media = {
  xs: 459.98,
  sm: 575.98,
  md: 767.98,
  lg: 991.98,
  xl: 1365.98,
  xxl: 2499.98,
}

window.media = media
