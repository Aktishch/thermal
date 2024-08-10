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

export default (): void => {
  new window.Swiper('.gallery-slider .swiper', {
    pagination: {
      el: '.gallery-slider .swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.gallery-slider .swiper-button-prev',
      nextEl: '.gallery-slider .swiper-button-next',
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

  new window.Swiper('.products-slider .swiper', {
    pagination: {
      el: '.products-slider .swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.products-slider .swiper-button-prev',
      nextEl: '.products-slider .swiper-button-next',
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

  const quizImages = new window.Swiper('.quiz-images .swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    allowTouchMove: false,
  }) as Swiper

  new window.Swiper('.quiz-slider .swiper', {
    navigation: {
      prevEl: '.quiz-slider .swiper-button-prev',
      nextEl: '.quiz-slider .swiper-button-next',
    },
    pagination: {
      el: '.quiz-slider .swiper-pagination',
      type: 'custom',
      renderCustom: (
        swiper: Swiper,
        current: number,
        total: number
      ): string => {
        return String(total - current)
      },
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    allowTouchMove: false,
    watchSlidesProgress: true,
    on: {
      slideChange: (swiper: Swiper): void => {
        quizImages.slideTo(swiper.activeIndex)
        checkQuizSlide(swiper.visibleSlides[0])

        switch (
          swiper.visibleSlides[0] === swiper.slides[swiper.slides.length - 1]
        ) {
          case true: {
            ;(swiper.el.closest('[data-quiz]') as HTMLElement).setAttribute(
              'data-quiz-end',
              ''
            )
            break
          }

          case false: {
            ;(swiper.el.closest('[data-quiz]') as HTMLElement).removeAttribute(
              'data-quiz-end'
            )
            break
          }
        }
      },
    },
  }) as Swiper

  const descriptionBg = new window.Swiper('.description-bg .swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    allowTouchMove: false,
  }) as Swiper

  const descriptionBullets = new window.Swiper('.description-bullets .swiper', {
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

  const descriptionInfo = new window.Swiper('.description-info .swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    allowTouchMove: false,
  }) as Swiper

  new window.Swiper('.description-slider .swiper', {
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
        descriptionInfo.slideTo(swiper.activeIndex)
      },
    },
  }) as Swiper
}
