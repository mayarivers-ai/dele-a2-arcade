import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../stores/progressStore'

interface ModuleGameOverProps {
  module: 'reading' | 'grammar' | 'vocab'
  xpEarned: number
  onContinue: () => void
}

export function ModuleGameOver({ module, xpEarned, onContinue }: ModuleGameOverProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const resetModuleLives = useProgressStore((s) => s.resetModuleLives)

  function handleContinue() {
    resetModuleLives(module)
    onContinue()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="text-5xl mb-3">💔</div>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-2">
          {t('module_gameover.title')}
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          {t('module_gameover.subtitle')}
        </p>
        {xpEarned > 0 && (
          <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-1">
              {t('module_gameover.xp_earned')}
            </p>
            <p className="text-2xl font-bold text-amber-700">⭐ {xpEarned} XP</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleContinue}
            className="w-full rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
          >
            {t('module_gameover.regenerate')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            {t('module_gameover.exit')}
          </button>
        </div>
      </div>
    </div>
  )
}
