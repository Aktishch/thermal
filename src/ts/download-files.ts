import { uploadFile, fileHandler } from './utils'

export default () => {
  const data: DataTransfer = new DataTransfer()
  const fileList = data.files as FileList

  document.addEventListener('change', ((event: Event): void => {
    if (
      (event.target as HTMLInputElement).getAttribute('data-input') === 'file'
    ) {
      const input = event.target as HTMLInputElement
      const form = input.closest('[data-form]') as HTMLFormElement

      if (!form) return

      const label = input.closest('[data-label]') as HTMLDivElement
      const files = input.files as FileList
      const error = label.querySelector('*[data-error]') as HTMLSpanElement
      const listing = form.querySelector('*[data-files]') as HTMLUListElement
      const item = document.createElement('li') as HTMLLIElement

      item.classList.add('flex', 'items-center', 'justify-between', 'gap-5')

      if (files.length !== 0) {
        for (let i: number = 0; i < files.length; i++) {
          const file = files[i] as File

          uploadFile(file).then(({ name }): void => {
            if (!fileHandler({ input, error })) return

            data.items.add(file)
            item.setAttribute('data-files-item', '')
            item.innerHTML = `
              <span class="truncate">${name}</span>
              <button class="btn btn-gray text-sm p-1" data-files-remove="${name}" type="button">
                <svg class="icon">
                  <use xlink:href="img/icons.svg#close"></use>
                </svg>
              </button>`
            listing.appendChild(item)

            console.log(data.files)

            if ((data.files as FileList).length === 3)
              label.classList.add('pointer-events-none', 'opacity-50')
          })
        }
      } else {
        input.files = data.files as FileList
        console.log(data.files)
      }
    }
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-files-remove]')) {
      const btn = event.target as HTMLButtonElement
      const form = btn.closest('[data-form') as HTMLFormElement

      if (!form) return

      const input = form.querySelector(
        '*[data-input="file"]'
      ) as HTMLInputElement
      const label = input.closest('[data-label]') as HTMLDivElement
      const item = btn.closest('[data-files-item]') as HTMLLIElement

      for (let i: number = 0; i < (data.files as FileList).length; i++) {
        if (
          btn.dataset.filesRemove === String((data.files as FileList)[i].name)
        ) {
          console.log((data.files as FileList)[i])
          // delete (data.files as FileList)[i]
          // data.splice(i, 1)
          item.remove()
        }
      }

      console.log(data.files)
      ;(data.files as FileList).length === 0
        ? (input.value = '')
        : label.classList.remove('pointer-events-none', 'opacity-50')
    }
  }) as EventListener)

  return data
}
