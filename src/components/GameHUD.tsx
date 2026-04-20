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
    <div style={{ marginBottom: 32, borderBottom: '1px solid var(--rule)' }}>
      {/* Progress bar */}
      <div style={{ height: 2, width: '100%', background: 'var(--rule)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--cobalt)', transition: 'width .5s' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
        {/* Lives */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {Array.from({ length: max }).map((_, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block', height: 3, width: 20, borderRadius: 2,
                background: i < lives ? 'var(--coral)' : 'var(--rule)',
                transition: 'background .2s',
              }}
            />
          ))}
          <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)', marginLeft: 4 }}>
            {lives}/{max}
          </span>
        </div>

        {/* Counter + XP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)' }}>
            {current} / {total}
          </span>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)' }}>XP</span>
            <span className="dele-frau" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              {lifetimeXP}
            </span>
            {showFloat && <XPFloat key={floatKey} amount={floatAmount} variant="warm" />}
          </div>
        </div>
      </div>
    </div>
  )
}
