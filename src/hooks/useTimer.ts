import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds: number, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const rafRef = useRef<number | null>(null)
  const endTimeRef = useRef<number>(0)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  const start = useCallback(() => {
    endTimeRef.current = Date.now() + timeLeft * 1000
    setRunning(true)
  }, [timeLeft])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(
    (seconds?: number) => {
      setRunning(false)
      setTimeLeft(seconds ?? initialSeconds)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [initialSeconds]
  )

  const restart = useCallback(
    (seconds?: number) => {
      const s = seconds ?? initialSeconds
      setTimeLeft(s)
      endTimeRef.current = Date.now() + s * 1000
      setRunning(true)
    },
    [initialSeconds]
  )

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) {
        setRunning(false)
        onExpireRef.current()
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [running])

  const progress = timeLeft / initialSeconds

  return { timeLeft, running, progress, start, pause, reset, restart }
}
