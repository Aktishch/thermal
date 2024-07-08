import { dialog } from './fancybox'
import { validation } from './functions/validation'

const submitHandler = ({
  event,
  data,
}: {
  event: Event
  data: File[]
}): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
    case 'action': {
      if (!validation(form)) event.preventDefault()
      break
    }

    default: {
      event.preventDefault()

      if (!validation(form)) return

      const formData: FormData = new FormData(form)
      const searchParams = new URLSearchParams() as URLSearchParams
      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement
      let requestUrl: string

      for (const pair of formData.entries()) {
        searchParams.append(pair[0], String(pair[1]))
      }

      if (form.hasAttribute('data-files')) {
        if (data !== null)
          for (let i: number = 0; i < data.length; i++)
            formData.append('file[]', data[i])
      }

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
            .then((response: Response) => {
              return response.json()
            })
            .then((response): void => {
              dialog.close()
              response.status
                ? dialog.open('./dialogs/dialog-success.html')
                : dialog.open('./dialogs/dialog-error.html')
              form.reset()
              submitBtn.disabled = false

              if (form.hasAttribute('data-files')) {
                const listing = form.querySelector(
                  '*[data-files-listing]'
                ) as HTMLUListElement
                const text = form.querySelector(
                  '*[data-files-text]'
                ) as HTMLSpanElement

                listing.innerHTML = ''
                listing.classList.remove('mb-5')
                text.innerHTML = 'Загрузить файлы'
                data.length = 0
              }
            })
            .catch((error: string): void =>
              console.log('The form has not been sent', error)
            )
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

export default (data: File[]): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form'))
      submitHandler({ event: event, data: data })
  }) as EventListener)
}
