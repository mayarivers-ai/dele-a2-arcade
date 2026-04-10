interface LivesBarProps {
  lives: number
  max?: number
}

export function LivesBar({ lives, max = 3 }: LivesBarProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-xl transition-all duration-200 ${
            i < lives ? 'opacity-100' : 'opacity-20 grayscale'
          }`}
        >
          ❤️
        </span>
      ))}
    </div>
  )
}
