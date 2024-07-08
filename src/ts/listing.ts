export default (): void => {
  const listings = document.querySelectorAll(
    '*[data-listing]'
  ) as NodeListOf<HTMLElement>

  listings.forEach((listing: HTMLElement): void => {
    if (!listing) return

    const show = listing.querySelector(
      '*[data-listing-show]'
    ) as HTMLButtonElement

    show.addEventListener('click', ((): void => {
      const items = listing.querySelectorAll(
        '*[data-listing-item]'
      ) as NodeListOf<HTMLDivElement>
      const count: number =
        listing.dataset.listing !== '' || undefined || null
          ? Number(listing.dataset.listing)
          : items.length

      for (let i: number = 0; i < count; i++) {
        const item = items[i] as HTMLDivElement

        if (item && item.classList.contains('hidden'))
          item.classList.remove('hidden')
        if (item && item.hasAttribute('data-anim')) item.dataset.anim = 'show'
        if (item) item.removeAttribute('data-listing-item')
        if (!item || items.length === count) show.remove()
      }
    }) as EventListener)
  })
}
