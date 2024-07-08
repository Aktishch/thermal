export const fileHandler = ({
  input,
  error,
}: {
  input: HTMLInputElement
  error: HTMLSpanElement
}): boolean => {
  const files = input.files as FileList

  if (files.length === 0) {
    error.classList.add('visible', 'opacity-100')
    error.innerText = 'Пожалуйста, загрузите изображение!'
    return false
  } else if (
    !['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type)
  ) {
    error.classList.add('visible', 'opacity-100')
    error.innerText = 'Только изображения!'
    return false
  } else if (files[0].size > 2 * Math.pow(1024, 2)) {
    error.classList.add('visible', 'opacity-100')
    error.innerText = 'Размер не более 2 мб!'
    return false
  } else {
    error.classList.remove('visible', 'opacity-100')
    return true
  }
}
