export type FileHandler = {
  error: HTMLSpanElement
  file: File
}

export const fileHandler = ({ error, file }: FileHandler): boolean => {
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    error.classList.remove('invisible', 'opacity-0')
    error.innerText = 'Только jpg или png'
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
