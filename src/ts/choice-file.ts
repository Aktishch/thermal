import { dialogNotClosing, dialogClose } from './fancybox'
import { fileHandler } from './functions/file-handler'

const choiceFile = (event: Event): void => {
  const form = (event.target as HTMLInputElement).closest('[data-form]') as HTMLFormElement
  const download = form.querySelector('*[data-label="download"]') as HTMLElement
  const input = event.target as HTMLInputElement
  const error = download.querySelector('*[data-error]') as HTMLElement
  const image = download.querySelector('*[data-file="image"]') as HTMLImageElement

  if (!image) return

  const file = (input.files as FileList)[0] as File
  const readFile = new FileReader() as FileReader

  file ? readFile.readAsDataURL(file) : (image.src = '')

  readFile.addEventListener('loadend', ((): void => {
    if (!fileHandler(input, error)) return

    image.src = String(readFile.result)

    if (form.dataset.form === 'avatar') {
      const formData = new FormData(form) as FormData
      const requestUrl = './ajax/submit-handler.php'
      const avatar = document.querySelector('*[data-avatar]') as HTMLImageElement

      dialogNotClosing('./dialogs/dialog-preloader.html')

      fetch(requestUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response: Response): void => {
          response.text()
        })
        .then((): void => {
          avatar.src = String(readFile.result)
          dialogClose()
        })
        .catch((error: string): void => console.log('The form has not been sent', error))
    }
  }) as EventListener)
}

export default (): void => {
  document.addEventListener('change', ((event: Event): void => {
    if ((event.target as HTMLInputElement).getAttribute('data-input') === 'file') choiceFile(event)
  }) as EventListener)
}
