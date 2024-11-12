import { uploadFile, fileHandler } from './utils'

export default (): void => {
  const dragEvents: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']

  dragEvents.forEach((dragEvent: string): void => {
    document.addEventListener(dragEvent, ((event: DragEvent): void => {
      if ((event.target as HTMLElement).closest('[data-drag]')) {
        event.preventDefault()

        const drag = (event.target as HTMLElement).closest(
          '[data-drag]'
        ) as HTMLDivElement
        const form = drag.closest('[data-form]')

        if (!form) return

        const label = drag.closest('[data-label]') as HTMLDivElement
        const input = label.querySelector(
          '*[data-input="file"]'
        ) as HTMLInputElement
        const error = label.querySelector('*[data-error]') as HTMLSpanElement
        const image = label.querySelector(
          '*[data-file="image"]'
        ) as HTMLImageElement

        switch (event.type) {
          case 'dragenter': {
            drag.classList.add('bg-opacity-50')
            break
          }

          case 'dragleave': {
            drag.classList.remove('bg-opacity-50')
            break
          }

          case 'drop': {
            drag.classList.remove('bg-opacity-50')
            input.files = (event.dataTransfer as DataTransfer).files as FileList

            const file = (input.files as FileList)[0] as File

            uploadFile(file).then(({ url }): void => {
              if (!fileHandler({ input, error })) return

              image.src = url
            })

            break
          }
        }
      }
    }) as EventListener)
  })
}
