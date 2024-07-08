const cardsShowing = ({
  condition,
  item,
}: {
  condition: boolean
  item: HTMLDivElement
}): void => {
  switch (condition) {
    case true: {
      item.classList.add('hidden')
      break
    }

    case false: {
      item.classList.remove('hidden')
      item.classList.add('filtering-active')
      setTimeout((): void => item.classList.remove('filtering-active'), 300)
      break
    }
  }
}

const filterHandler = ({
  name,
  cards,
  plug,
}: {
  name: string
  cards: NodeListOf<HTMLDivElement>
  plug: HTMLDivElement
}): void => {
  let hidden: number = 0

  cards.forEach((card: HTMLDivElement): void => {
    const absence: boolean =
      String(card.dataset.filteringValue).split(' ').includes(name) === false
    const showAll: boolean = name.toLowerCase() === 'all'

    cardsShowing({ condition: absence && !showAll, item: card })

    if (absence && !showAll) ++hidden
  })

  if (plug) cardsShowing({ condition: hidden !== cards.length, item: plug })
}

export default (): void => {
  const filters = document.querySelectorAll(
    '*[data-filtering]'
  ) as NodeListOf<HTMLDivElement>

  filters.forEach((filter: HTMLDivElement): void => {
    if (!filter) return

    const value = String(filter.dataset.filtering)
    const hash: string = window.location.hash.substr(1)
    const categories = document.querySelectorAll(
      `*[data-filtering-category="${value}"]`
    ) as NodeListOf<HTMLButtonElement | HTMLDivElement>
    const cards = document.querySelectorAll(
      `*[data-filtering-card="${value}"]`
    ) as NodeListOf<HTMLDivElement>
    const plug = document.querySelector(
      `*[data-filtering-plug="${value}"]`
    ) as HTMLDivElement
    const line = document.querySelector(
      `*[data-filtering-line="${value}"]`
    ) as HTMLSpanElement

    const currentCategory = (): HTMLButtonElement | HTMLDivElement => {
      let active = categories[0] as HTMLButtonElement | HTMLDivElement

      categories.forEach(
        (category: HTMLButtonElement | HTMLDivElement): void => {
          if (category.classList.contains('filtering-active')) active = category
        }
      )

      return active
    }

    const currentCard = (
      category: HTMLButtonElement | HTMLDivElement
    ): void => {
      const active = currentCategory() as HTMLButtonElement | HTMLDivElement
      const name = String(category.dataset.filteringValue)

      active.classList.remove('filtering-active')
      category.classList.add('filtering-active')

      if (line) {
        line.style.width = `${category.offsetWidth}px`
        line.style.left = `${category.offsetLeft}px`
      }

      filterHandler({ name: name, cards: cards, plug: plug })
    }

    currentCard(currentCategory())

    categories.forEach((category: HTMLButtonElement | HTMLDivElement): void => {
      if (!category) return

      category.addEventListener('click', ((): void => {
        currentCard(category)
      }) as EventListener)
    })

    if (hash && hash !== '') {
      for (const [index, card] of cards.entries()) {
        if (card.querySelector(`#${hash}`)) {
          const category = categories[index] as
            | HTMLButtonElement
            | HTMLDivElement

          currentCard(category)
        }
      }
    }
  })
}
