export default (): void => {
  const keys: string[] = ['r', 'a', 'c', 'c', 'o', 'o', 'n']
  let status: boolean = true
  let index: number = 0

  document.addEventListener('keyup', ((event: KeyboardEvent): void => {
    if (event.key === keys[index]) {
      if (!status) return

      index++

      if (index === keys.length) {
        alert('Енот')
        status = false
        index = 0
      }
    } else {
      index = 0
    }
  }) as EventListener)
}
