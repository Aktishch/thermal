declare global {
  interface Window {
    safari: any
  }
}

export const isSafari = (): boolean => {
  return window.safari !== undefined
}
