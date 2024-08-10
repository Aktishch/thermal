const invertedToggle = ({
  event,
  condition,
}: {
  event: Event
  condition: string
}): void => {
  if (
    (event.target as HTMLButtonElement).closest(
      `[data-inverted-toggle="${condition}"]`
    )
  ) {
    const inverted = (event.target as HTMLButtonElement).closest(
      '[data-inverted]'
    ) as HTMLElement

    inverted.dataset.inverted = condition
  }
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    invertedToggle({ event, condition: 'after' })
    invertedToggle({ event, condition: 'before' })
  }) as EventListener)
}
