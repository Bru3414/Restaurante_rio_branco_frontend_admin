import { useEffect, useState } from 'react'

type CountdownProps = {
  orderDateTime: string
}

const Countdown = ({ orderDateTime }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const orderTime = new Date(orderDateTime).getTime()
    const endTime = orderTime + 15 * 60 * 1000

    const interval = setInterval(() => {
      const now = Date.now()
      const diff = endTime - now

      setTimeLeft(Math.max(diff, 0))

      if (diff <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [orderDateTime])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return (
    <div>
      Tempo restante: <strong>{formatTime(timeLeft)}</strong>
    </div>
  )
}

export default Countdown
