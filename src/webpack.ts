import fancybox from './ts/fancybox'
import sliderSwiper from './ts/slider-swiper'
import yandexMap from './ts/yandex-map'
import airDatepicker from './ts/air-datepicker'
import smoothScroll from './ts/smooth-scroll'
import scrollHeader from './ts/scroll-header'
import currentTab from './ts/current-tab'
import currentYear from './ts/current-year'
import sidebar from './ts/sidebar'
import menu from './ts/menu'
import progressLine from './ts/progress-line'
import scrollTo from './ts/scroll-to'
import smartMenu from './ts/smart-menu'
import social from './ts/social'
import draggable from './ts/draggable'
import theme from './ts/theme'
import pallete from './ts/pallete'
import snowflakes from './ts/snowflakes'
import runningButton from './ts/running-button'
import animation from './ts/animation'
import waved from './ts/waved'
import movement from './ts/movement'
import bubbles from './ts/bubbles'
import inverted from './ts/inverted'
import listing from './ts/listing'
import accordion from './ts/accordion'
import formatBg from './ts/format-bg'
import parallax from './ts/parallax'
import filtering from './ts/filtering'
import outNumber from './ts/out-number'
import writeText from './ts/write-text'
import downloadFiles from './ts/download-files'
import submitHandler from './ts/submit-handler'
import dataSave from './ts/data-save'
import dragAndDrop from './ts/drag-and-drop'
import choiceFile from './ts/choice-file'
import copy from './ts/copy'
import cookie from './ts/cookie'
import combination from './ts/combination'
import createImage from './ts/create-image'
import inputs from './ts/inputs'
import phoneMask from './ts/phone-mask'
import password from './ts/password'
import quantity from './ts/quantity'
import range from './ts/range'
import player from './ts/player'
import shop from './ts/shop'
import warning from './ts/warning'
import horizontalScrolling from './ts/horizontal-scrolling'
import quiz from './ts/quiz'
import compare from './ts/compare'
import timeCounter from './ts/time-counter'
import timer from './ts/timer'
import worldMap from './ts/world-map'
import game from './ts/game'
import preloader from './ts/preloader'

import '@fancyapps/ui/dist/fancybox/fancybox.css'
import 'swiper/css/bundle'
import 'air-datepicker/air-datepicker.css'
import './scss/main.scss'

window.addEventListener('DOMContentLoaded', ((): void => {
  fancybox()
  sliderSwiper()
  yandexMap()
  airDatepicker()
  currentTab()
  currentYear()
  smoothScroll()
  scrollHeader()
  sidebar()
  menu()
  progressLine()
  scrollTo()
  smartMenu()
  social()
  draggable()
  theme()
  pallete()
  snowflakes()
  runningButton()
  animation()
  waved()
  movement()
  bubbles()
  inverted()
  listing()
  accordion()
  formatBg()
  parallax()
  filtering()
  outNumber()
  writeText()
  downloadFiles()
  submitHandler()
  dataSave()
  dragAndDrop()
  choiceFile()
  copy()
  cookie()
  combination()
  createImage()
  inputs()
  phoneMask()
  password()
  quantity()
  range()
  player()
  shop()
  warning()
  horizontalScrolling()
  quiz()
  compare()
  timeCounter()
  timer()
  worldMap()
  game()
  preloader()
}) as EventListener)
