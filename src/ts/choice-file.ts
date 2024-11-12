import { uploadFile, fileHandler } from './utils'
import { dialog } from './fancybox'

const choiceFile = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const form = input.closest('[data-form]') as HTMLFormElement
  const label = input.closest('[data-label]') as HTMLDivElement
  const error = label.querySelector('*[data-error]') as HTMLSpanElement
  const image = label.querySelector('*[data-file="image"]') as HTMLImageElement

  if (!image) return

  const file = (input.files as FileList)[0] as File

  file
    ? uploadFile(file).then(({ url }): void => {
        if (!fileHandler({ input, error })) return

        image.src = url

        if (form.dataset.form === 'avatar') {
          const formData = new FormData(form) as FormData
          const requestUrl: string = './ajax/submit-handler.php'
          const avatar = document.querySelector(
            '*[data-avatar]'
          ) as HTMLImageElement

          dialog.notClosing('./dialogs/dialog-preloader.html')

          fetch(requestUrl, {
            method: 'POST',
            body: formData,
          })
            .then((response: Response): void => {
              response.text()
            })
            .then((): void => {
              avatar.src = url
              dialog.close()
            })
            .catch((error: string): void =>
              console.log('The form has not been sent', error)
            )
        }
      })
    : (image.src = '')
}

export default (): void => {
  document.addEventListener('change', ((event: Event): void => {
    if (
      (event.target as HTMLInputElement).getAttribute('data-input') === 'file'
    )
      choiceFile(event)
  }) as EventListener)
}
