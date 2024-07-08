import { scrollbarShow, scrollbarHidden } from './functions/scrollbar'
import { timeFormat } from './functions/time-format'

type Playlist = {
  artist: string
  song: string
  audio: string
  poster: string
}

const playlist: Playlist[] = [
  {
    artist: 'Slipknot',
    song: 'Snuff',
    audio:
      'https://mp3minusovki.com/music/fhvndfjwserjgt/247bab1c312b2335afe3f5c9b496a3d3/01d63b016f64e0739a9e3d2599b6521f.mp3',
    poster: 'https://picsum.photos/600/400?random=1',
  },

  {
    artist: 'System of a down',
    song: 'Lonely Day',
    audio:
      'https://cdn1.shadam.net/uploads/files/2018-09/1536003683_system-of-a-down-lonely-day.mp3',
    poster: 'https://picsum.photos/600/400?random=2',
  },

  {
    artist: 'Scorpions',
    song: 'Slave Me',
    audio:
      'https://ruo.morsmusic.org/load/941771577/Scorpions_-_Slave_Me_(musmore.com).mp3',
    poster: 'https://picsum.photos/600/400?random=3',
  },
]

const setPlayer = ({
  id,
  playlist,
}: {
  id: string
  playlist: Playlist[]
}): void => {
  const player = document.querySelector(`#${id}`) as HTMLElement

  if (!player) return

  const compositions = player.querySelectorAll(
    '*[data-player-composition]'
  ) as NodeListOf<HTMLButtonElement>
  const poster = player.querySelector(
    '*[data-player-poster]'
  ) as HTMLImageElement
  const artist = player.querySelector('*[data-player-artist]') as HTMLElement
  const song = player.querySelector('*[data-player-song]') as HTMLElement
  const audio = player.querySelector('*[data-player-audio]') as HTMLAudioElement
  const progress = player.querySelector(
    '*[data-player-progress]'
  ) as HTMLDivElement
  const range = player.querySelector('*[data-player-range]') as HTMLDivElement
  const play = player.querySelector('*[data-player-play]') as HTMLButtonElement
  const loading = play.querySelector('*[data-player-loading]') as SVGElement
  const status = play.querySelector('*[data-player-status]') as SVGElement
  const icon = status.querySelector('use') as SVGUseElement
  const prev = player.querySelector('*[data-player-prev]') as HTMLButtonElement
  const next = player.querySelector('*[data-player-next]') as HTMLButtonElement
  const start = player.querySelector('*[data-player-start]') as
    | HTMLDivElement
    | HTMLSpanElement
  const end = player.querySelector('*[data-player-end]') as
    | HTMLDivElement
    | HTMLSpanElement
  const volume = player.querySelector(
    '*[data-player-volume]'
  ) as HTMLButtonElement
  let active: boolean = false
  let index: number = 0
  let minutes: number
  let seconds: number
  let condition: {
    status: string
    time: number
    index: number
  } = {
    status: 'pause',
    time: 0,
    index: 0,
  }

  const setComposition = (index: number): void => {
    if (artist) artist.innerText = playlist[index].artist
    if (song) song.innerText = playlist[index].song
    if (audio) audio.src = playlist[index].audio
    if (poster) poster.src = playlist[index].poster
  }

  const currentComposition = (): void => {
    compositions.forEach((composition: HTMLButtonElement): void => {
      if (!composition) return

      const compositionIndex = Number(composition.dataset.playerComposition)
      const compositionStatus = composition.querySelector(
        '*[data-player-status]'
      ) as SVGElement
      const compositionIcon = compositionStatus.querySelector(
        'use'
      ) as SVGUseElement

      if (audio.played) {
        switch (compositionIndex === index) {
          case true: {
            compositionIcon.setAttribute('xlink:href', 'img/icons.svg#pause')
            break
          }

          case false: {
            compositionIcon.setAttribute('xlink:href', 'img/icons.svg#play')
            break
          }
        }
      }

      if (audio.paused)
        compositionIcon.setAttribute('xlink:href', 'img/icons.svg#play')
    })
  }

  const statusComposition = (): void => {
    switch (audio.paused) {
      case true: {
        audio.play()
        icon.setAttribute('xlink:href', 'img/icons.svg#pause')
        currentComposition()
        condition.status = 'play'
        break
      }

      case false: {
        audio.pause()
        icon.setAttribute('xlink:href', 'img/icons.svg#play')
        currentComposition()
        condition.status = 'pause'
        break
      }
    }

    condition.index = index
  }

  const randomComposition = (): void => {
    if (player.dataset.player === 'random')
      index = Math.floor(Math.random() * playlist.length)
  }

  const nextComposition = (): void => {
    index++

    if (index > playlist.length - 1) index = 0

    randomComposition()
    setComposition(index)
    statusComposition()
  }

  const prevComposition = (): void => {
    index--

    if (index < 0) index = playlist.length - 1

    randomComposition()
    setComposition(index)
    statusComposition()
  }

  const setProgress = (clickX: number): void => {
    const width: number = progress.clientWidth
    const duration: number = audio.duration

    audio.currentTime = (clickX / width) * duration
  }

  const progressStart = (event: Event): void => {
    if ((event.target as HTMLDivElement).closest('[data-player-progress]')) {
      scrollbarHidden()
      active = true
    }
  }

  const progressEnd = (): void => {
    scrollbarShow()
    active = false
  }

  const progressMove = (event: Event): void => {
    event.stopPropagation()
    event.preventDefault()

    if (!active) return

    if ((event.target as HTMLDivElement).closest('[data-player-controls]')) {
      switch (event.type) {
        case 'mousemove': {
          const clickX: number = (event as MouseEvent).offsetX

          setProgress(clickX)
          break
        }

        case 'touchmove': {
          for (
            let i: number = 0;
            i < (event as TouchEvent).changedTouches.length;
            i++
          ) {
            const clickX: number =
              (event as TouchEvent).changedTouches[i].pageX -
              progress.getBoundingClientRect().left

            setProgress(clickX)
          }

          break
        }
      }
    }
  }

  const audioLoad = (event: Event): void => {
    compositions.forEach((composition: HTMLButtonElement): void => {
      if (!composition) return

      const compositionIndex = Number(composition.dataset.playerComposition)
      const compositionLoading = composition.querySelector(
        '*[data-player-loading]'
      ) as SVGElement
      const compositionStatus = composition.querySelector(
        '*[data-player-status]'
      ) as SVGElement

      switch (event.type) {
        case 'loadstart': {
          play.classList.add('pointer-events-none')
          loading.classList.remove('hidden')
          status.classList.add('hidden')

          if (compositionIndex === index) {
            composition.classList.add('pointer-events-none')
            compositionLoading.classList.remove('hidden')
            compositionStatus.classList.add('hidden')
          }

          break
        }

        case 'loadeddata': {
          play.classList.remove('pointer-events-none')
          loading.classList.add('hidden')
          status.classList.remove('hidden')
          composition.classList.remove('pointer-events-none')
          compositionLoading.classList.add('hidden')
          compositionStatus.classList.remove('hidden')
          break
        }
      }
    })
  }

  const audioTiming = ({
    type,
    time,
  }: {
    type: string
    time: HTMLDivElement | HTMLSpanElement
  }): void => {
    switch (type) {
      case 'timeupdate': {
        minutes = Math.floor(audio.currentTime / 60)
        seconds = Math.floor(audio.currentTime % 60)
        break
      }

      case 'loadedmetadata': {
        minutes = Math.floor(audio.duration / 60)
        seconds = Math.floor(audio.duration % 60)
        break
      }
    }

    if (time) time.innerText = `${timeFormat(minutes)}:${timeFormat(seconds)}`
  }

  const audioStart = (event: Event): void => {
    range.style.width = `${(audio.currentTime / audio.duration) * 100}%`
    audioTiming({ type: event.type, time: start })
    condition.time = audio.currentTime
    sessionStorage.setItem(`${id}`, JSON.stringify(condition))
  }

  const audioEnd = (): void => {
    audio.addEventListener('loadedmetadata', ((event: Event): void => {
      audioTiming({ type: event.type, time: end })
    }) as EventListener)
  }

  const audioPause = (): void => {
    icon.setAttribute('xlink:href', 'img/icons.svg#play')
    currentComposition()
  }

  setComposition(index)

  if (start) start.innerText = '00:00'
  if (end) end.innerText = '00:00'

  if (sessionStorage.getItem(`${id}`)) {
    condition = JSON.parse(sessionStorage.getItem(`${id}`) || '{}')
    index = condition.index

    if (index === null || index === undefined) index = 0

    setComposition(index)
    audio.currentTime = condition.time

    if (condition.status === 'play') {
      statusComposition()

      if (audio.paused) audioPause()
    }
  }

  compositions.forEach((composition: HTMLButtonElement): void => {
    if (!composition) return

    const compositionIndex = Number(composition.dataset.playerComposition)

    composition.addEventListener('click', ((): void => {
      if (compositionIndex !== index) {
        index = compositionIndex
        setComposition(index)
      }

      statusComposition()
    }) as EventListener)
  })

  if (volume) {
    volume.addEventListener('click', ((): void => {
      const volumeStatus = volume.querySelector('svg') as SVGSVGElement
      const volumeIcon = volumeStatus.querySelector('use') as SVGUseElement

      switch (volume.dataset.playerVolume) {
        case 'on': {
          volume.dataset.playerVolume = 'off'
          volumeStatus.classList.add('opacity-50')
          volumeIcon.setAttribute('xlink:href', 'img/icons.svg#volume-off')
          audio.volume = 0
          break
        }

        case 'off': {
          volume.dataset.playerVolume = 'on'
          volumeStatus.classList.remove('opacity-50')
          volumeIcon.setAttribute('xlink:href', 'img/icons.svg#volume-on')
          audio.volume = 1
          break
        }
      }
    }) as EventListener)
  }

  play.addEventListener('click', statusComposition as EventListener)
  next.addEventListener('click', nextComposition as EventListener)
  prev.addEventListener('click', prevComposition as EventListener)
  progress.addEventListener('click', ((event: MouseEvent): void => {
    const clickX: number = event.offsetX

    setProgress(clickX)
  }) as EventListener)
  player.addEventListener('mousedown', progressStart as EventListener)
  player.addEventListener('mouseup', progressEnd as EventListener)
  player.addEventListener('mouseleave', progressEnd as EventListener)
  player.addEventListener('mousemove', progressMove as EventListener)
  player.addEventListener('touchstart', progressStart as EventListener)
  player.addEventListener('touchend', progressEnd as EventListener)
  player.addEventListener('touchcancel', progressEnd as EventListener)
  player.addEventListener('touchmove', progressMove as EventListener)
  audio.addEventListener('loadstart', audioLoad as EventListener)
  audio.addEventListener('loadeddata', audioLoad as EventListener)
  audio.addEventListener('timeupdate', audioStart as EventListener)
  audio.addEventListener('timeupdate', audioEnd as EventListener)
  audio.addEventListener('ended', nextComposition as EventListener)
  audio.addEventListener('pause', audioPause as EventListener)
}

const playOnlyOne = (event: Event): void => {
  const audios = document.querySelectorAll(
    'audio'
  ) as NodeListOf<HTMLAudioElement>

  for (let i: number = 0; i < audios.length; i++) {
    const audio = audios[i] as HTMLAudioElement

    if (audio !== event.target) audio.pause()
  }
}

export default (): void => {
  setPlayer({ id: 'player', playlist: playlist })
  document.addEventListener('play', playOnlyOne as EventListener, true)
}
