export type MediaFile = HTMLImageElement | HTMLVideoElement

export default (): void => {
  const loads = document.querySelectorAll('*[data-load]') as NodeListOf<HTMLElement>

  loads.forEach((load: HTMLElement): void => {
    if (!load) return

    const loader = load.querySelector('*[data-loader]') as HTMLDivElement
    const media = load.querySelector('*[data-media]') as MediaFile

    media.addEventListener('load', ((): void => {
      loader.remove()
    }) as EventListener)
  })
}
