import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import { touchDevice } from './utils'
import filtering from './filtering'

const excludeDates: number[] = [
  +new Date(2024, 4, 5),
  +new Date(2024, 5, 7),
  +new Date(2024, 5, 10),
]

declare global {
  interface Window {
    AirDatepicker: typeof AirDatepicker
    excludeDates: typeof excludeDates
  }
}

window.AirDatepicker = AirDatepicker
window.excludeDates = excludeDates

export const createCalendar = (): void => {
  const calendar = document.getElementById('calendar') as HTMLDivElement

  if (!calendar) return

  const renderCellHandler = ({
    date,
    cellType,
  }: {
    date: Date
    cellType: string
  }) => {
    if (cellType === 'day') {
      return {
        classes: window.excludeDates.includes(+date)
          ? 'filtering-active btn btn-primary btn-fill text-sm'
          : 'pointer-events-none',
        attrs: {
          'data-filtering-category': 'calendar',
          'data-filtering-value': `date-${date.getDate()}-${date.getMonth() + 1}`,
        },
      }
    }
  }

  new window.AirDatepicker(calendar, {
    locale: localeRu,
    onChangeViewDate: (): void => {
      calendar.classList.add('opacity-20', 'pointer-events-none')
      setTimeout((): void => {
        filtering()
        calendar.classList.remove('opacity-20', 'pointer-events-none')
      }, 500)
    },
    onRenderCell: renderCellHandler,
    selectedDates: [new Date()],
  }) as AirDatepicker<HTMLDivElement>
}

export default (): void => {
  const datepickers = document.querySelectorAll(
    '*[data-datepicker]'
  ) as NodeListOf<HTMLFormElement>

  datepickers.forEach((datepicker: HTMLFormElement): void => {
    if (!datepicker) return

    const inputMin = datepicker.querySelector(
      '*[data-input="min"]'
    ) as HTMLInputElement
    const inputMax = datepicker.querySelector(
      '*[data-input="max"]'
    ) as HTMLInputElement

    const min = new window.AirDatepicker(inputMin, {
      onSelect({ date }) {
        max.update({
          minDate: String(date),
        })
      },
      locale: localeRu,
      isMobile: touchDevice(),
      autoClose: true,
      minDate: new Date(),
      position: 'bottom left' || inputMin.dataset.position,
    }) as AirDatepicker<HTMLInputElement>

    const max = new window.AirDatepicker(inputMax, {
      onSelect({ date }) {
        min.update({
          maxDate: String(date),
        })
      },
      locale: localeRu,
      isMobile: touchDevice(),
      autoClose: true,
      minDate: new Date(),
      position: 'bottom left' || inputMax.dataset.position,
    }) as AirDatepicker<HTMLInputElement>
  })
}
