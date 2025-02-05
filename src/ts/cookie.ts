export default (): void => {
  const cookies = document.querySelectorAll(
    '*[data-cookie]'
  ) as NodeListOf<HTMLElement>

  cookies.forEach((cookie: HTMLElement): void => {
    if (!cookie) return

    const id: string = cookie.id
    const value: string = `cookie_${id}_active`

    if (document.cookie.indexOf(value) !== -1) {
      cookie.remove()
    } else {
      const button = cookie.querySelector(
        '*[data-cookie-button]'
      ) as HTMLButtonElement
      const expires: number = Number(cookie.dataset.expires) || 7
      const date: string = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + expires
      ).toUTCString()
      const path: string = String(cookie.dataset.cookie) || '/'

      button.addEventListener('click', ((): void => {
        document.cookie = `${value}=1; path=${path}; expires=${date}`
        cookie.remove()
      }) as EventListener)
    }
  })
}
