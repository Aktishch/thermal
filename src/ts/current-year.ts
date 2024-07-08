export default (): void => {
  const year = document.querySelector('#year') as HTMLSpanElement

  if (year) year.innerText = String(new Date().getFullYear())
}
