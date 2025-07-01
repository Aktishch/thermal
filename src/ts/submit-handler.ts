import { dialog } from './fancybox'
import { validation } from './utils'

export const formSubmitHandler = (event: Event): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
    case '': {
      if (!validation(form)) event.preventDefault()
      break
    }

    case 'submit': {
      event.preventDefault()

      if (!validation(form)) return

      const formData: FormData = new FormData(form)
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
      const requestUrl: string = './ajax/submit-handler.php'

      submitBtn.disabled = true
      dialog.notClosing('./dialogs/dialog-preloader.php')

      fetch(requestUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response: Response): Promise<{ status: boolean }> => {
          return response.json()
        })
        .then((response): void => {
          dialog.close()
          dialog.open(response.status ? './dialogs/dialog-success.php' : './dialogs/dialog-error.php')
          form.reset()
          submitBtn.disabled = false
        })
        .catch((error: string): void => console.log('The form has not been sent', error))

      break
    }
  }
}

export default (): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) formSubmitHandler(event)
  }) as EventListener)
}
