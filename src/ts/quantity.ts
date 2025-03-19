export const quantityDecrease = (event: Event): void => {
  const quantity = (event.target as HTMLButtonElement).closest('[data-quantity]') as HTMLDivElement
  const input = quantity.querySelector('*[data-input]') as HTMLInputElement
  let value: number = Number(input.value)

  --value
  input.value = String(value)
  if (value < 1) input.value = '1'
}

export const quantityIncrease = (event: Event): void => {
  const quantity = (event.target as HTMLButtonElement).closest('[data-quantity]') as HTMLDivElement
  const input = quantity.querySelector('*[data-input]') as HTMLInputElement
  let value: number = Number(input.value)

  ++value
  input.value = String(value)
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-quantity-decrease]')) quantityDecrease(event)

    if ((event.target as HTMLButtonElement).closest('[data-quantity-increase]')) quantityIncrease(event)
  }) as EventListener)
}
