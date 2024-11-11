export default (): void => {
  const images = document.querySelectorAll(
    '*[data-image]'
  ) as NodeListOf<HTMLDivElement>

  images.forEach((image: HTMLDivElement): void => {
    if (!image) return

    const canvas = image.querySelector(
      '*[data-image-canvas]'
    ) as HTMLCanvasElement
    const download = image.querySelector(
      '*[data-image-download]'
    ) as HTMLAnchorElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const createImage = new Image() as HTMLImageElement

    createImage.addEventListener('load', ((): void => {
      context.drawImage(createImage, 0, 0)
      context.font = '1,5rem SF Pro Display'
      context.fillStyle = '#000'
      context.textAlign = 'center'

      if (image.dataset.image !== undefined)
        context.fillText(
          String(image.dataset.image),
          canvas.width / 2,
          canvas.height / 1.5
        )

      if (download) download.href = canvas.toDataURL()
    }) as EventListener)

    createImage.src = String(canvas.dataset.imageCanvas)
  })
}
