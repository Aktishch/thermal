declare global {
  interface Navigator {
    msMaxTouchPoints: number
  }
}

export const touchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    window.navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0
  )
}
