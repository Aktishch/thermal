import { uploadFile, fileHandler } from './utils'

export default () => {
  const downloads = document.querySelectorAll(
    '*[data-download]'
  ) as NodeListOf<HTMLDivElement>

  downloads.forEach((download: HTMLDivElement): void => {
    if (!download) return

    const label = download.querySelector('*[data-label]') as HTMLLabelElement
    const input = label.querySelector('*[data-input]') as HTMLInputElement
    const error = label.querySelector('*[data-error]') as HTMLSpanElement
    const listing = download.querySelector(
      '*[data-download-listing]'
    ) as HTMLUListElement
    let data = new DataTransfer() as DataTransfer

    input.addEventListener('change', ((): void => {
      const files = input.files as FileList

      if (files.length !== 0 && listing) {
        for (let i: number = 0; i < files.length; i++) {
          uploadFile(files[i] as File).then(({ file }): void => {
            if (!fileHandler({ input, error })) return

            if ((data.files as FileList).length === 3) {
              label.classList.add('pointer-events-none', 'opacity-50')
            } else {
              const item = document.createElement('li') as HTMLLIElement

              item.classList.add(
                'flex',
                'items-center',
                'justify-between',
                'gap-5'
              )
              item.setAttribute('data-download-item', '')
              item.innerHTML = `
                <span class="truncate">${file.name}</span>
                <button class="btn btn-gray text-sm p-1" data-download-remove="${file.name}" type="button">
                  <svg class="icon">
                    <use xlink:href="img/icons.svg#close"></use>
                  </svg>
                </button>`
              listing.appendChild(item)
              data.items.add(file)
              input.files = data.files as FileList
            }
          })
        }
      } else {
        input.files = data.files as FileList
      }
    }) as EventListener)

    download.addEventListener('click', ((event: Event): void => {
      if (
        (event.target as HTMLButtonElement).closest('[data-download-remove]')
      ) {
        const remove = event.target as HTMLButtonElement
        const item = remove.closest('[data-download-item]') as HTMLLIElement
        const files = data.files as FileList

        data = new DataTransfer() as DataTransfer

        for (let i: number = 0; i < files.length; i++) {
          const file = files[i] as File

          if (remove.dataset.downloadRemove === file.name) {
            item.remove()
          } else {
            data.items.add(file)
            input.files = data.files as FileList
          }
        }

        if ((data.files as FileList).length === 0) {
          input.value = ''
        } else {
          label.classList.remove('pointer-events-none', 'opacity-50')
        }
      }
    }) as EventListener)
  })
}
