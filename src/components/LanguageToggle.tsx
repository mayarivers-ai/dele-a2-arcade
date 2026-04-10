import { useSettingsStore } from '../stores/settingsStore'
import { useTranslation } from 'react-i18next'
import type { Language } from '../types'

export function LanguageToggle() {
  const { language, setLanguage } = useSettingsStore()
  const { i18n } = useTranslation()

  const toggle = (lang: Language) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 p-0.5 text-sm">
      <button
        onClick={() => toggle('ru')}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          language === 'ru'
            ? 'bg-gray-900 text-white'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => toggle('es')}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          language === 'es'
            ? 'bg-gray-900 text-white'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        ES
      </button>
    </div>
  )
}
