const getPosition = ({
  number,
  input,
  progress,
  bubble,
}: {
  number: number
  input: HTMLInputElement
  progress: HTMLDivElement
  bubble: HTMLOutputElement
}): void => {
  const value = Number(input.value)
  const min: number = input.min ? Number(input.min) : 0
  const max: number = input.max ? Number(input.max) : 100
  let step: number

  switch (number) {
    case 0: {
      step = ((value - min) * 100) / (max - min)
      progress.style.left = '0'
      bubble.style.left = `calc(${step}% - (${step * 0.28}px))`
      progress.style.width = `calc(${step}% + (${14 - step * 0.28}px))`
      break
    }

    case 1: {
      step = ((value - max) * 100) / (min - max)
      progress.style.right = '0'
      bubble.style.right = `calc(${step}% - (${step * 0.28}px))`
      progress.style.width = `calc(${step}% + (${14 - step * 0.28}px))`
      break
    }
  }

  bubble.innerHTML = String(value)
}

export default (): void => {
  const ranges = document.querySelectorAll(
    '*[data-range]'
  ) as NodeListOf<HTMLDivElement>

  ranges.forEach((range: HTMLDivElement): void => {
    if (!range) return

    const wrappers = range.querySelectorAll(
      '*[data-range-wrapper]'
    ) as NodeListOf<HTMLDivElement>
    const first: number = 0
    const last: number = 1

    switch (wrappers.length) {
      case 1: {
        const output = range.querySelector('*[data-range-output]') as
          | HTMLOutputElement
          | HTMLInputElement
        const input = range.querySelector(
          '*[data-range-input]'
        ) as HTMLInputElement
        const progress = range.querySelector(
          '*[data-range-progress]'
        ) as HTMLDivElement
        const bubble = range.querySelector(
          '*[data-range-bubble]'
        ) as HTMLOutputElement

        const changeRange = (): void => {
          getPosition({
            number: first,
            input: input,
            progress: progress,
            bubble: bubble,
          })
          output.value = input.value
        }

        changeRange()

        input.addEventListener('input', changeRange as EventListener)

        break
      }

      case 2: {
        const outputs = range.querySelectorAll(
          '*[data-range-output]'
        ) as NodeListOf<HTMLOutputElement | HTMLInputElement>
        const firstOutput = outputs[first] as
          | HTMLOutputElement
          | HTMLInputElement
        const firstInput = (wrappers[first] as HTMLDivElement).querySelector(
          '*[data-range-input]'
        ) as HTMLInputElement
        const firstProgress = (wrappers[first] as HTMLDivElement).querySelector(
          '*[data-range-progress]'
        ) as HTMLDivElement
        const firstBubble = (wrappers[first] as HTMLDivElement).querySelector(
          '*[data-range-bubble]'
        ) as HTMLOutputElement
        const lastOutput = outputs[last] as HTMLOutputElement | HTMLInputElement
        const lastInput = (wrappers[last] as HTMLDivElement).querySelector(
          '*[data-range-input]'
        ) as HTMLInputElement
        const lastProgress = (wrappers[last] as HTMLDivElement).querySelector(
          '*[data-range-progress]'
        ) as HTMLDivElement
        const lastBubble = (wrappers[last] as HTMLDivElement).querySelector(
          '*[data-range-bubble]'
        ) as HTMLOutputElement

        const changeRanges = (): void => {
          getPosition({
            number: first,
            input: firstInput,
            progress: firstProgress,
            bubble: firstBubble,
          })
          getPosition({
            number: last,
            input: lastInput,
            progress: lastProgress,
            bubble: lastBubble,
          })
        }

        firstOutput.value = firstInput.value
        lastOutput.value = lastInput.value
        changeRanges()

        firstOutput.addEventListener('input', ((): void => {
          if (Number(firstOutput.value) > Number(lastOutput.value)) {
            firstInput.value = firstOutput.value
            lastOutput.value = firstOutput.value
            lastInput.value = lastOutput.value
          }

          firstInput.value = firstOutput.value
          changeRanges()
        }) as EventListener)

        lastOutput.addEventListener('input', ((): void => {
          if (Number(lastOutput.value) < Number(firstOutput.value)) {
            lastInput.value = lastOutput.value
            firstOutput.value = lastOutput.value
            firstInput.value = firstOutput.value
          }

          lastInput.value = lastOutput.value
          changeRanges()
        }) as EventListener)

        firstInput.addEventListener('input', ((): void => {
          if (Number(firstInput.value) > Number(lastInput.value)) {
            lastInput.value = firstInput.value
            lastOutput.value = lastInput.value
          }

          firstOutput.value = firstInput.value
          changeRanges()
        }) as EventListener)

        lastInput.addEventListener('input', ((): void => {
          if (Number(lastInput.value) < Number(firstInput.value)) {
            firstInput.value = lastInput.value
            firstOutput.value = firstInput.value
          }

          lastOutput.value = lastInput.value
          changeRanges()
        }) as EventListener)

        break
      }
    }
  })
}
