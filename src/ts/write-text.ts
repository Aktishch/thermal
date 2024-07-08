const writeText = (section: HTMLElement): void => {
  const record = section.querySelector('*[data-record]') as HTMLElement

  if (!record) return

  const recordText = String(record.dataset.record)
  const recordSpeed: number = Number(record.dataset.recordSpeed) || 30
  const letters: string[] = [recordText].join('').split('')

  const interval = setInterval(
    (): void => {
      if (!letters[0]) return clearInterval(interval)
      record.innerHTML += letters.shift()
    },
    recordSpeed !== undefined ? recordSpeed : 100
  )
}

const scrollToText = (): void => {
  const section = document.querySelector('*[data-section]') as HTMLElement

  if (section && window.screen.height >= section.getBoundingClientRect().top) {
    writeText(section)
    document.removeEventListener('scroll', scrollToText as EventListener)
  }
}

export default (): void =>
  document.addEventListener('scroll', scrollToText as EventListener)
