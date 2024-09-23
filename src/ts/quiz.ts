type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const checkQuizSlide = (slide: HTMLElement): void => {
  const quiz = slide.closest('[data-quiz]') as HTMLElement
  const inputs: Input[] = [
    ...slide.querySelectorAll('input'),
    ...slide.querySelectorAll('select'),
    ...slide.querySelectorAll('textarea'),
  ]
  let active: boolean = true

  for (const index in inputs) {
    if (!Object.hasOwnProperty.call(inputs, index)) continue

    const input = inputs[index] as Input

    if (input.type === 'checkbox' || input.type === 'radio') {
      if ((input as HTMLInputElement).checked !== false) {
        active = false
        break
      }
    } else if (input.value !== '') {
      active = false
      break
    }
  }

  active ? (quiz.dataset.quiz = 'stop') : (quiz.dataset.quiz = 'auto')
}

export default (): void => {
  document.addEventListener('input', ((event: InputEvent): void => {
    const slide = (event.target as Input).closest(
      '[data-quiz-slide]'
    ) as HTMLElement

    if (slide) checkQuizSlide(slide)
  }) as EventListener)
}
