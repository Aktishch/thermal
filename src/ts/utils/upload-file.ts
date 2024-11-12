type UploadFile = {
  name: string
  size: number
  url: string
}

export const uploadFile = (file: File): Promise<UploadFile> => {
  return new Promise<UploadFile>((resolve, reject): void => {
    const reader = new FileReader() as FileReader

    const createReject = (): void => {
      reject('File upload error')
    }

    reader.readAsDataURL(file)

    reader.addEventListener('loadend', ((): void => {
      reader.result
        ? resolve({
            name: file.name,
            size: file.size,
            url: reader.result.toString(),
          })
        : createReject()
    }) as EventListener)

    reader.addEventListener('error', createReject as EventListener)
  })
}
