import { useTranslation } from 'react-i18next'
import { useProgressStore } from '../../stores/progressStore'

interface GameOverProps {
  score: number
  onRestart: () => void
}

export function GameOver({ score, onRestart }: GameOverProps) {
  const { t } = useTranslation()
  const highScore = useProgressStore((s) => s.highScore)
  const isNewRecord = score >= highScore && score > 0

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
      <h2 className="font-['Press_Start_2P'] text-2xl neon-red leading-relaxed">
        {t('arcade.game_over')}
      </h2>

      {isNewRecord && (
        <div className="animate-pulse font-['Press_Start_2P'] text-xs neon-green">
          ⭐ {t('arcade.new_record')} ⭐
        </div>
      )}

      <div className="rounded-lg border border-white/10 bg-white/5 px-8 py-4">
        <div className="mb-1 font-['Press_Start_2P'] text-xs text-white/50">
          {t('arcade.game_over_score')}
        </div>
        <div className="font-['Press_Start_2P'] text-3xl neon-green">{score}</div>
      </div>

      <div className="font-['Press_Start_2P'] text-xs text-white/40">
        {t('arcade.game_over_best')}: {highScore}
      </div>

      <button
        onClick={onRestart}
        className="mt-2 rounded border-2 border-[#39FF14] px-8 py-3 font-['Press_Start_2P'] text-sm text-[#39FF14] transition-all hover:bg-[#39FF14] hover:text-black"
      >
        {t('arcade.play_again')}
      </button>
    </div>
  )
}
