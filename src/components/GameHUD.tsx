import { useEffect, useRef, useState } from 'react'
import { useProgressStore } from '../stores/progressStore'
import { XPFloat } from './XPFloat'

interface GameHUDProps {
  module: 'reading' | 'grammar' | 'vocab'
  current: number
  total: number
}

export function GameHUD({ module, current, total }: GameHUDProps) {
  const { moduleHearts, lifetimeXP, lastXPGain } = useProgressStore()
  const lives = moduleHearts[module] ?? 3
  const max = 3
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
    <div className="mb-8 border-y border-[#1a1a1a]/10">
      {/* Progress line — full width, razor thin */}
      <div className="h-px w-full bg-[#1a1a1a]/8">
        <div
          className="h-px bg-[#C0392B] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between py-3">
        {/* Lives — editorial dashes */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: max }).map((_, i) => (
            <span
              key={i}
              className={`inline-block h-[3px] w-5 rounded-none transition-all duration-200 ${
                i < lives ? 'bg-[#C0392B]' : 'bg-[#1a1a1a]/15'
              }`}
            />
          ))}
          <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
            {lives}/{max}
          </span>
        </div>

        {/* Progress counter + XP */}
        <div className="flex items-center gap-5">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 tabular-nums">
            {current} / {total}
          </span>
          <div className="relative flex items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">XP</span>
            <span className="font-['Playfair_Display'] text-base font-semibold tabular-nums text-[#1a1a1a]">
              {lifetimeXP}
            </span>
            {showFloat && (
              <XPFloat key={floatKey} amount={floatAmount} variant="warm" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
