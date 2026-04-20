import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '../../stores/settingsStore'

interface ArcadeConfigProps {
  onStart: () => void
}

export function ArcadeConfig({ onStart }: ArcadeConfigProps) {
  const { t } = useTranslation()
  const { timerDuration, gameLevel, setTimerDuration, setGameLevel } = useSettingsStore()

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <Link to="/" className="self-start font-['Press_Start_2P'] text-xs text-white/40 hover:text-white/70 no-underline transition-colors">
        ← {t('common.back')}
      </Link>
      <h1 className="font-['Press_Start_2P'] text-3xl leading-relaxed neon-green text-center">
        DELE A2<br />ARCADE
      </h1>

      {/* Nivel */}
      <div className="w-full max-w-sm">
        <div className="mb-3 font-['Press_Start_2P'] text-xs text-white/60">
          {t('arcade.level_select')}
        </div>
        <div className="flex gap-2">
          {(['A1', 'A2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setGameLevel(lvl)}
              className={`flex-1 rounded border-2 py-3 font-['Press_Start_2P'] text-xs transition-all ${
                gameLevel === lvl
                  ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                  : 'border-white/20 text-white/50 hover:border-white/40'
              }`}
            >
              {lvl === 'A1' ? t('arcade.level_a1') : t('arcade.level_a2')}
            </button>
          ))}
        </div>
      </div>

      {/* Tiempo */}
      <div className="w-full max-w-sm">
        <div className="mb-3 font-['Press_Start_2P'] text-xs text-white/60">
          {t('arcade.time_select')}
        </div>
        <div className="flex gap-2">
          {([60, 90, 120] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerDuration(sec)}
              className={`flex-1 rounded border-2 py-3 font-['Press_Start_2P'] text-xs transition-all ${
                timerDuration === sec
                  ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                  : 'border-white/20 text-white/50 hover:border-white/40'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-2 rounded border-2 border-[#39FF14] bg-[#39FF14]/10 px-12 py-4 font-['Press_Start_2P'] text-lg text-[#39FF14] transition-all hover:bg-[#39FF14] hover:text-black"
      >
        {t('arcade.start_game')}
      </button>
    </div>
  )
}
