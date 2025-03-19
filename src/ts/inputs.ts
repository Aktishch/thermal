export const inputName = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const regExp: RegExp = /[0-9.,!@#$%^&*()-=_+`~{}/?<>|'"]/

  if (input.value.match(regExp)) input.value = input.value.replace(regExp, '')
}

export const inputNumber = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const regExp: RegExp = /[^0-9.]/g

  input.value = input.value.replace(regExp, '')
}

export const inputFloat = (event: Event): void => {
  const input = event.target as HTMLInputElement

  input.value = input.value.replace(/^\.|[^\d.]|\.(?=.*\.)|^0+(?=\d)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default (): void => {
  document.addEventListener('input', ((event: Event): void => {
    switch ((event.target as HTMLInputElement).getAttribute('data-input')) {
      case 'name': {
        inputName(event)
        break
      }

      case 'number': {
        inputNumber(event)
        break
      }

      case 'float': {
        inputFloat(event)
        break
      }
    }
  }) as EventListener)
}
