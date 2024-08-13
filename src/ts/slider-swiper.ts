import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Grid,
  Thumbs,
  EffectCoverflow,
} from 'swiper/modules'
import { media } from './utils'
import { checkQuizSlide } from './quiz'

declare global {
  interface Window {
    Swiper: typeof Swiper
  }
}

Swiper.use([
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Grid,
  Thumbs,
  EffectCoverflow,
])
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper

const createGallerySlider = (): void => {
  const slider = document.querySelector(
    '*[data-slider="gallery"]'
  ) as HTMLDivElement

  if (!slider) return

  const swiper = slider.querySelector('.swiper') as HTMLDivElement
  const pagination = slider.querySelector(
    '.swiper-pagination'
  ) as HTMLDivElement
  const prev = slider.querySelector('.swiper-button-prev') as HTMLButtonElement
  const next = slider.querySelector('.swiper-button-next') as HTMLButtonElement

  new window.Swiper(swiper, {
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    effect: 'coverflow',
    slidesPerView: 1.3,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    freeMode: true,
    breakpoints: {
      [media.sm]: {
        slidesPerView: 2,
      },
      [media.lg]: {
        slidesPerView: 3,
      },
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  }) as Swiper
}

const createProductsSlider = (): void => {
  const slider = document.querySelector(
    '*[data-slider="products"]'
  ) as HTMLDivElement

  if (!slider) return

  const swiper = slider.querySelector('.swiper') as HTMLDivElement
  const pagination = slider.querySelector(
    '.swiper-pagination'
  ) as HTMLDivElement
  const prev = slider.querySelector('.swiper-button-prev') as HTMLButtonElement
  const next = slider.querySelector('.swiper-button-next') as HTMLButtonElement

  new window.Swiper(swiper, {
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    slidesPerView: 1.3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    grabCursor: true,
    watchSlidesProgress: true,
    breakpoints: {
      [media.sm]: {
        slidesPerView: 2,
      },
      [media.lg]: {
        slidesPerView: 3,
      },
      [media.xl]: {
        slidesPerView: 4,
      },
    },
  }) as Swiper
}

const createQuizSlider = (): void => {
  const slider = document.querySelector(
    '*[data-slider="quiz"]'
  ) as HTMLDivElement

  if (!slider) return

  const swiper = slider.querySelector('.swiper') as HTMLDivElement
  const pagination = slider.querySelector(
    '.swiper-pagination'
  ) as HTMLDivElement
  const prev = slider.querySelector('.swiper-button-prev') as HTMLButtonElement
  const next = slider.querySelector('.swiper-button-next') as HTMLButtonElement

  new window.Swiper(swiper, {
    pagination: {
      el: pagination,
      type: 'custom',
      renderCustom: (
        swiper: Swiper,
        current: number,
        total: number
      ): string => {
        return String(total - current)
      },
    },
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    allowTouchMove: false,
    watchSlidesProgress: true,
    on: {
      slideChange: (swiper: Swiper): void => {
        const quiz = swiper.el.closest('[data-quiz]') as HTMLElement
        const visibleSlide = swiper.visibleSlides[0] as HTMLDivElement

        checkQuizSlide(visibleSlide)

        visibleSlide === swiper.slides[swiper.slides.length - 1]
          ? quiz.setAttribute('data-quiz-end', '')
          : quiz.removeAttribute('data-quiz-end')
      },
    },
  }) as Swiper
}

const createDescriptionSlider = (): void => {
  const slider = document.querySelector(
    '*[data-slider="description"]'
  ) as HTMLDivElement

  if (!slider) return

  const sliderBg = document.querySelector(
    '*[data-slider="description-bg"]'
  ) as HTMLDivElement
  const swiperBg = sliderBg.querySelector('.swiper') as HTMLDivElement
  const descriptionBg = new window.Swiper(swiperBg, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    allowTouchMove: false,
  }) as Swiper

  const sliderBullets = document.querySelector(
    '*[data-slider="description-bullets"]'
  ) as HTMLDivElement
  const swiperBullets = sliderBullets.querySelector('.swiper') as HTMLDivElement
  const descriptionBullets = new window.Swiper(swiperBullets, {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 1000,
    grabCursor: true,
    breakpoints: {
      [media.md]: {
        slidesPerView: 4,
      },
    },
  }) as Swiper

  const swiper = slider.querySelector('.swiper') as HTMLDivElement

  new window.Swiper(swiper, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    grabCursor: true,
    thumbs: {
      swiper: descriptionBullets,
    },
    on: {
      slideChange: (swiper: Swiper): void => {
        descriptionBg.slideTo(swiper.activeIndex)
      },
    },
  }) as Swiper
}

export default (): void => {
  createGallerySlider()
  createProductsSlider()
  createQuizSlider()
  createDescriptionSlider()
}
