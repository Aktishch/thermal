import { scrollToElement } from './scroll-to'

export type FilterCardsShowing = {
  condition: boolean
  item: HTMLDivElement
}

export type FilterHandler = {
  name: string
  cards: NodeListOf<HTMLDivElement>
  plug: HTMLDivElement
}

export const filterCardsShowing = ({ condition, item }: FilterCardsShowing): void => {
  if (condition) {
    item.classList.add('hidden')
  } else {
    item.classList.remove('hidden')
    item.classList.add('filtering-card')
    setTimeout((): void => item.classList.remove('filtering-card'), 300)
  }
}

export const filterHandler = ({ name, cards, plug }: FilterHandler): void => {
  let hidden: number = 0

  cards.forEach((card: HTMLDivElement): void => {
    const absence: boolean = String(card.dataset.filteringValue).split(' ').includes(name) === false
    const showAll: boolean = name.toLowerCase() === 'all'

    filterCardsShowing({ condition: absence && !showAll, item: card })

    if (absence && !showAll) ++hidden
  })

  if (plug) filterCardsShowing({ condition: hidden !== cards.length, item: plug })
}

export default (): void => {
  const filters = document.querySelectorAll('*[data-filtering]') as NodeListOf<HTMLDivElement>

  filters.forEach((filter: HTMLDivElement): void => {
    if (!filter) return

    const value: string = String(filter.dataset.filtering)
    const hash: string = window.location.hash.substr(1)
    const categories = document.querySelectorAll(`*[data-filtering-category="${value}"]`) as NodeListOf<HTMLElement>
    const cards = document.querySelectorAll(`*[data-filtering-card="${value}"]`) as NodeListOf<HTMLDivElement>
    const plug = document.querySelector(`*[data-filtering-plug="${value}"]`) as HTMLDivElement
    const line = document.querySelector(`*[data-filtering-line="${value}"]`) as HTMLSpanElement

    const currentCategory = (): HTMLElement => {
      let active = categories[0] as HTMLElement

      categories.forEach((category: HTMLElement): void => {
        if (category.classList.contains('filtering-category')) active = category
      })

      return active
    }

    const currentCard = (category: HTMLElement): void => {
      const active = currentCategory() as HTMLElement
      const name: string = String(category.dataset.filteringValue)

      active.classList.remove('filtering-category')
      category.classList.add('filtering-category')

      if (line) {
        line.style.width = `${category.offsetWidth}px`
        line.style.left = `${category.offsetLeft}px`
      }

      filterHandler({ name, cards, plug })
    }

    currentCard(currentCategory())

    categories.forEach((category: HTMLElement): void => {
      if (!category) return

      category.addEventListener('click', ((): void => {
        currentCard(category)
      }) as EventListener)
    })

    if (hash && hash !== '') {
      for (const [index, card] of cards.entries()) {
        if (card.querySelector(`#${hash}`)) {
          const category = categories[index] as HTMLElement

          currentCard(category)

          setTimeout((): void => scrollToElement(filter), 100)
        }
      }
    }
  })
}
