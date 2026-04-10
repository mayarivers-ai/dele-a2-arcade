import { useEffect, useRef, useState } from 'react'
import { useProgressStore } from '../stores/progressStore'
import { LivesBar } from './LivesBar'
import { XPFloat } from './XPFloat'

interface GameHUDProps {
  module: 'reading' | 'grammar' | 'vocab'
  current: number
  total: number
}

export function GameHUD({ module, current, total }: GameHUDProps) {
  const { moduleHearts, lifetimeXP, lastXPGain } = useProgressStore()
  const lives = moduleHearts[module] ?? 3
  const progress = total > 0 ? (current / total) * 100 : 0

  const [showFloat, setShowFloat] = useState(false)
  const [floatAmount, setFloatAmount] = useState(0)
  const [floatKey, setFloatKey] = useState(0)
  const prevGainId = useRef<number | null>(null)

  useEffect(() => {
    if (!lastXPGain) return
    if (lastXPGain.id === prevGainId.current) return
    prevGainId.current = lastXPGain.id
    setFloatAmount(lastXPGain.amount)
    setFloatKey((k) => k + 1)
    setShowFloat(true)
    const t = setTimeout(() => setShowFloat(false), 950)
    return () => clearTimeout(t)
  }, [lastXPGain])

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-900/10 to-amber-700/5 border border-amber-100 px-4 py-3">
      {/* Lives */}
      <LivesBar lives={lives} />

      {/* Progress bar */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-2 rounded-full bg-amber-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-amber-700/60 text-right tabular-nums">
          {current} / {total}
        </span>
      </div>

      {/* XP */}
      <div className="relative flex items-center gap-1 shrink-0">
        <span className="text-amber-500 text-base">⭐</span>
        <span className="font-bold text-amber-700 tabular-nums">{lifetimeXP}</span>
        {showFloat && (
          <XPFloat key={floatKey} amount={floatAmount} variant="warm" />
        )}
      </div>
    </div>
  )
}
