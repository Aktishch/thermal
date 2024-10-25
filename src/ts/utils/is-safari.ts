declare global {
  interface Window {
    safari: undefined
  }
}

export const isSafari = (): boolean => {
  return window.safari !== undefined
}
