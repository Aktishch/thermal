import { fileHandler } from './file-handler'

type Label = HTMLLabelElement | HTMLDivElement

export const validation = (form: HTMLFormElement): boolean => {
  const labels = form.querySelectorAll(
    '*[data-label="input"]'
  ) as NodeListOf<Label>
  const download = form.querySelector('*[data-label="download"]') as Label
  let validate: boolean = true

  if (download) {
    const input = download.querySelector(
      '*[data-input="file"]'
    ) as HTMLInputElement
    const error = download.querySelector('*[data-error]') as HTMLSpanElement

    validate = fileHandler({ input, error })
  }

  labels.forEach((label: Label): void => {
    if (!label) return

    const input = label.querySelector('*[data-input]') as HTMLInputElement
    const error = label.querySelector('*[data-error]') as HTMLSpanElement

    if (!input && !error) return

    const inputError = (): void => {
      input.focus()
      input.classList.add('input-error')
      error.classList.remove('invisible', 'opacity-0')
      validate = false
    }

    const maxLengthInputTel = (value: number): void => {
      if (input.value.length > 0 && input.value.length < value) {
        error.innerText = 'Введите корректный номер'
        inputError()
      }
    }

    const emailFormat = (value: string): boolean => {
      return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(value)
    }

    if (
      input.value === null ||
      input.value === '' ||
      input.value.length === 0
    ) {
      inputError()
    } else {
      input.classList.remove('input-error')
      error.classList.add('invisible', 'opacity-0')
    }

    switch (input.dataset.input) {
      case 'name': {
        if (input.value.length === 1) inputError()
        break
      }

      case 'tel': {
        switch (input.value[0]) {
          case '8': {
            maxLengthInputTel(17)
            break
          }

          case '+': {
            maxLengthInputTel(18)
            break
          }

          default: {
            error.innerText = 'Введите ваш номер'
            break
          }
        }

        break
      }

      case 'email': {
        if (emailFormat(input.value)) inputError()
        break
      }

      case 'select': {
        if (input.value === 'empty') inputError()
        break
      }

      case 'text': {
        if (input.value.length > 0 && input.value.length < 10) {
          error.innerText = 'Введите не менее 10 символов'
          inputError()
        } else {
          error.innerText = 'Заполните это поле'
        }

        break
      }

      case 'switch': {
        if (input.checked === false) inputError()
        break
      }
    }

    input.addEventListener(
      'input',
      ((): void => {
        if (input.value.length > 0) {
          input.classList.remove('input-error')
          error.classList.add('invisible', 'opacity-0')
        }
      }) as EventListener,
      { once: true }
    )
  })

  return validate
}
