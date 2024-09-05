import { fileHandler } from './utils'

export default (): File[] => {
  const data: File[] = []

  document.addEventListener('change', ((event: Event): void => {
    if (
      (event.target as HTMLInputElement).getAttribute('data-input') === 'file'
    ) {
      const input = event.target as HTMLInputElement
      const form = input.closest('[data-files]') as HTMLFormElement

      if (!form) return

      const download = form.querySelector(
        '*[data-label="download"]'
      ) as HTMLDivElement
      const files = input.files as FileList
      const text = download.querySelector(
        '*[data-files-text]'
      ) as HTMLSpanElement
      const error = download.querySelector('*[data-error]') as HTMLSpanElement
      const listing = form.querySelector(
        '*[data-files-listing]'
      ) as HTMLUListElement
      const item = document.createElement('li') as HTMLLIElement

      item.classList.add('flex', 'items-center', 'justify-between', 'gap-5')

      if (fileHandler({ input, error })) {
        for (let i: number = 0; i < files.length; i++) {
          data.push(files[i])
          item.setAttribute('data-files-item', '')
          item.innerHTML = `
            <span class="truncate">${files[i].name}</span>
            <button class="btn btn-gray text-sm p-1" data-files-remove="${files[i].name}" type="button">
              <svg class="icon">
                <use xlink:href="img/icons.svg#close"></use>
              </svg>
            </button>`
          listing.appendChild(item)

          if (!listing.classList.contains('mb-5')) listing.classList.add('mb-5')

          if (data.length === 3) {
            download.classList.add('pointer-events-none', 'opacity-50')
            text.innerText = 'Не более 3 файлов'
          } else {
            text.innerText = 'Добавить еще'
          }
        }
      }
    }
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-files-remove]')) {
      const btn = event.target as HTMLButtonElement
      const form = btn.closest('[data-files') as HTMLFormElement

      if (!form) return

      const download = form.querySelector(
        '*[data-label="download"]'
      ) as HTMLDivElement
      const input = download.querySelector(
        '*[data-input="file"]'
      ) as HTMLInputElement
      const text = download.querySelector(
        '*[data-files-text]'
      ) as HTMLSpanElement
      const listing = form.querySelector(
        '*[data-files-listing]'
      ) as HTMLUListElement
      const item = btn.closest('[data-files-item]') as HTMLLIElement

      for (let i: number = 0; i < data.length; i++) {
        if (btn.dataset.filesRemove === String(data[i].name)) {
          data.splice(i, 1)
          item.remove()
        }
      }

      if (data.length === 0) {
        input.value = ''
        text.innerText = 'Загрузить файлы'
        listing.classList.remove('mb-5')
      } else {
        download.classList.remove('pointer-events-none', 'opacity-50')
        text.innerText = 'Добавить еще'
      }
    }
  }) as EventListener)

  return data
}
