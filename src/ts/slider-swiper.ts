import Swiper from 'swiper'
import { Autoplay, Grid, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules'

declare global {
  interface Window {
    Swiper: typeof Swiper
  }
}

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs])
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper

export const createProjectsSlider = (): void => {
  const sliders = document.querySelectorAll('*[data-slider="projects"]') as NodeListOf<HTMLDivElement>

  sliders.forEach((slider: HTMLDivElement): void => {
    if (!slider) return

    const value: string = String(slider.dataset.slider)
    const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
    const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
    const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement

    new window.Swiper(swiper, {
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: true,
    }) as Swiper
  })
}

export default (): void => createProjectsSlider()
