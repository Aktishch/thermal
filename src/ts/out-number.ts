const setOutNumber = (section: HTMLElement): void => {
  const items = section.querySelectorAll(
    '*[data-number]'
  ) as NodeListOf<HTMLSpanElement>

  items.forEach((item: HTMLSpanElement): void => {
    if (!item) return

    const number = Number(item.dataset.number)
    const step: number = Number(item.dataset.numberStep) || 0.5
    const time: number = Number(item.dataset.numberTime) * 1000 || 1000
    const fixed: number = Number(item.dataset.numberFixed) || 0
    const timer: number = Math.round(time / (number / step))
    let sum: number = 0

    const interval = setInterval((): void => {
      sum += step

      switch (sum >= number) {
        case true: {
          item.innerHTML = String(number.toFixed(fixed))
          clearInterval(interval)
          break
        }

        case false: {
          item.innerHTML = String(sum.toFixed(fixed))
          break
        }
      }
    }, timer)
  })
}

const scrollToNumbers = (): void => {
  const section = document.querySelector('*[data-section]') as HTMLElement

  if (section && window.screen.height >= section.getBoundingClientRect().top) {
    setOutNumber(section)
    document.removeEventListener('scroll', scrollToNumbers as EventListener)
  }
}

export default (): void =>
  document.addEventListener('scroll', scrollToNumbers as EventListener)
