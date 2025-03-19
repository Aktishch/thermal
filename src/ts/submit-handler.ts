import { dialog } from './fancybox'
import { validation } from './utils'

export const formSubmitHandler = (event: Event): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
    case '': {
      if (!validation(form)) event.preventDefault()
      break
    }

    default: {
      event.preventDefault()

      if (!validation(form)) return

      const formData: FormData = new FormData(form)
      const searchParams = new URLSearchParams() as URLSearchParams
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
      let requestUrl: string

      for (const pair of formData.entries()) searchParams.append(pair[0], String(pair[1]))

      const queryString: string = searchParams.toString()

      switch (form.dataset.form) {
        case 'submit': {
          requestUrl = './ajax/submit-handler.php'
          submitBtn.disabled = true
          dialog.notClosing('./dialogs/dialog-preloader.html')

          fetch(requestUrl, {
            method: 'POST',
            body: formData,
          })
            .then((response: Response): Promise<{ status: boolean }> => {
              return response.json()
            })
            .then((response): void => {
              dialog.close()
              response.status
                ? dialog.open('./dialogs/dialog-success.html')
                : dialog.open('./dialogs/dialog-error.html')
              form.reset()
              submitBtn.disabled = false

              if (form.hasAttribute('data-preview')) {
                const label = form.querySelector('*[data-preview-label]') as HTMLLabelElement
                const image = form.querySelector('*[data-preview-image]') as HTMLImageElement
                const remove = form.querySelector('*[data-preview-remove]') as HTMLButtonElement

                image.src = ''
                remove.disabled = true
                label.classList.remove('pointer-events-none', 'opacity-50')
              }

              const filelist = document.querySelector('*[data-filelist]') as HTMLDivElement

              if (filelist) {
                const label = filelist.querySelector('*[data-filelist-label]') as HTMLLabelElement
                const text = label.querySelector('*[data-filelist-text]') as HTMLSpanElement
                const items = filelist.querySelector('*[data-filelist-items]') as HTMLUListElement

                label.classList.remove('pointer-events-none', 'opacity-50')
                text.textContent = 'Загрузить файлы'
                items.innerHTML = ''
              }
            })
            .catch((error: string): void => console.log('The form has not been sent', error))

          break
        }

        case 'params': {
          requestUrl = `./dialogs/dialog-authorization.html?${queryString}`
          dialog.close()
          dialog.open(requestUrl)
          break
        }
      }

      break
    }
  }
}

export default (): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) formSubmitHandler(event)
  }) as EventListener)
}
