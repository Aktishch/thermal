import accordion from './ts/accordion'
import animation from './ts/animation'
import currentTab from './ts/current-tab'
import fancybox from './ts/fancybox'
import inputs from './ts/inputs'
import loadMedia from './ts/load-media'
import menu from './ts/menu'
import phoneMask from './ts/phone-mask'
import preloader from './ts/preloader'
import scrollHeader from './ts/scroll-header'
import scrollTo from './ts/scroll-to'
import sidebar from './ts/sidebar'
import sliderSwiper from './ts/slider-swiper'
import submitHandler from './ts/submit-handler'
import waved from './ts/waved'

import '@fancyapps/ui/dist/fancybox/fancybox.css'
import 'swiper/css/bundle'
import './scss/main.scss'

window.addEventListener('DOMContentLoaded', ((): void => {
  accordion()
  animation()
  currentTab()
  fancybox()
  inputs()
  loadMedia()
  menu()
  phoneMask()
  preloader()
  scrollHeader()
  scrollTo()
  sidebar()
  sliderSwiper()
  submitHandler()
  waved()
}) as EventListener)
