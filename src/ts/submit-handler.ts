import { validation } from './utils'
import { dialog } from './fancybox'

const submitHandler = (event: Event): void => {
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
      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement
      let requestUrl: string

      for (const pair of formData.entries()) {
        searchParams.append(pair[0], String(pair[1]))
        console.log(pair)
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
              response.text()
            })
            .then((): void => {
              dialog.close()
              dialog.open('./dialogs/dialog-success.html')
              // response.status
              //   : dialog.open('./dialogs/dialog-error.html')
              form.reset()
              submitBtn.disabled = false

              const listing = form.querySelector(
                '*[data-download-listing]'
              ) as HTMLUListElement

              if (listing) listing.innerHTML = ''
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

export default (): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form'))
      submitHandler(event)
  }) as EventListener)
}
