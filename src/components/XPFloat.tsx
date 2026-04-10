import { useEffect, useState } from 'react'

interface XPFloatProps {
  amount: number
  key: number // force remount to retrigger animation
  variant?: 'arcade' | 'warm'
}

export function XPFloat({ amount, variant = 'arcade' }: XPFloatProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  const textClass = variant === 'warm'
    ? "font-bold text-amber-600 text-base"
    : "font-['Press_Start_2P'] text-sm font-bold neon-green"

  return (
    <div className={`animate-xp-float pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 ${textClass}`}>
      +{amount} XP
    </div>
  )
}
