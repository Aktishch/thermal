export default (): void => {
  const social = document.querySelector('*[data-social]') as HTMLDivElement

  if (!social) return

  const round = social.querySelector('*[data-social-round]') as HTMLDivElement
  const links = social.querySelectorAll(
    '*[data-social-link]'
  ) as NodeListOf<HTMLAnchorElement>
  const btn = social.querySelector('*[data-social-button]') as HTMLButtonElement
  let lastTap: number

  const doubleTap = (): void => {
    const timeSince: number = new Date().getTime() - lastTap

    if (timeSince < 300 && timeSince > 0) {
      switch (round.dataset.socialRound) {
        case 'hidden': {
          round.dataset.socialRound = 'show'
          round.classList.remove('opacity-0')
          break
        }

        case 'show': {
          round.dataset.socialRound = 'hidden'
          round.classList.add('opacity-0')
          break
        }
      }
    }

    lastTap = new Date().getTime()
  }

  for (let i: number = 0; i < links.length; i++) {
    const network = links[i] as HTMLAnchorElement

    network.style.top =
      (
        42 +
        35 * Math.sin(-0.5 * Math.PI - 2 * (1 / links.length) * i * Math.PI)
      ).toFixed(4) + '%'
    network.style.left =
      (
        42 -
        35 * Math.cos(-0.5 * Math.PI - 2 * (1 / links.length) * i * Math.PI)
      ).toFixed(4) + '%'
  }

  btn.addEventListener('click', doubleTap as EventListener)
  btn.addEventListener('touchstart', doubleTap as EventListener)
}
