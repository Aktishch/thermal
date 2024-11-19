export type FileHandler = {
  input: HTMLInputElement
  error: HTMLSpanElement
}

export const fileHandler = ({ input, error }: FileHandler): boolean => {
  const files = input.files as FileList

  for (let i: number = 0; i < files.length; i++) {
    const file = files[i] as File

    if (files.length === 0) {
      error.classList.remove('invisible', 'opacity-0')
      error.innerText = 'Загрузите изображение'
      return false
    } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
      error.classList.remove('invisible', 'opacity-0')
      error.innerText = 'Только изображения (jpg, png)'
      return false
    } else if (file.size > 2 * Math.pow(1024, 2)) {
      error.classList.remove('invisible', 'opacity-0')
      error.innerText = 'Размер не более 2 мб'
      return false
    } else {
      error.classList.add('invisible', 'opacity-0')
      return true
    }
  }
}
