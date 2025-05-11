import { useEffect, useRef, useState } from 'react'

type Props = {
  playSound: boolean
}

const NotificationManager = ({ playSound }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)

  useEffect(() => {
    const enableAudio = () => {
      audioRef.current = new Audio('/sounds/alarm-clock-01-VEED.mp3')
      setIsAudioEnabled(true)
      document.removeEventListener('click', enableAudio)
    }

    document.addEventListener('click', enableAudio)

    return () => {
      document.removeEventListener('click', enableAudio)
    }
  }, [])

  useEffect(() => {
    if (playSound && isAudioEnabled && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Falha ao tocar som:', err)
      })
    }
  }, [playSound, isAudioEnabled])

  return null
}

export default NotificationManager
