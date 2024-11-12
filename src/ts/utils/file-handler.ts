export const fileHandler = ({
  input,
  error,
}: {
  input: HTMLInputElement
  error: HTMLSpanElement
}): boolean => {
  const file = (input.files as FileList)[0] as File

  if (file === undefined) {
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
