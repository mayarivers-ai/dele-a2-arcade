interface TimerBarProps {
  timeLeft: number
  total: number
}

export function TimerBar({ timeLeft, total }: TimerBarProps) {
  const pct = Math.max(0, timeLeft / total)
  const isLow = pct < 0.25

  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? 'bg-[#FF3131]' : 'bg-[#39FF14]'
          }`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div
        className={`mt-1 text-center font-['Press_Start_2P'] text-xs ${
          isLow ? 'neon-red animate-blink' : 'text-[#39FF14]/60'
        }`}
      >
        {timeLeft}s
      </div>
    </div>
  )
}
