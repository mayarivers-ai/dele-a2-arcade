import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { useUserStore } from '../stores/userStore'
import { useSettingsStore } from '../stores/settingsStore'

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useUserStore()
  const { testerMode, setTesterMode } = useSettingsStore()
  const location = useLocation()
  const isArcade = location.pathname === '/arcade'
  const [practiceOpen, setPracticeOpen] = useState(false)

  if (isArcade) return null

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-['Playfair_Display'] text-lg font-bold text-gray-900">
            DELE A2
          </span>
          <span className="rounded bg-[#C0392B] px-1.5 py-0.5 font-['Press_Start_2P'] text-[9px] text-white leading-none">
            ARCADE
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-gray-600 md:flex">
          <Link
            to="/arcade"
            className="flex items-center gap-1 transition-colors hover:text-gray-900"
          >
            🕹 {t('nav.arcade')}
            <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
              {t('common.free_badge')}
            </span>
          </Link>

          {/* Práctica dropdown */}
          <div className="relative">
            <button
              onClick={() => setPracticeOpen((o) => !o)}
              onBlur={() => setTimeout(() => setPracticeOpen(false), 150)}
              className="flex items-center gap-1 transition-colors hover:text-gray-900"
            >
              📚 {t('nav.practice')} <span className="text-gray-400">▾</span>
            </button>
            {practiceOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 rounded-xl border border-gray-100 bg-white shadow-lg py-1 z-50">
                <Link
                  to="/reading"
                  className="block px-4 py-2.5 text-sm hover:bg-amber-50 hover:text-amber-800 transition-colors"
                  onClick={() => setPracticeOpen(false)}
                >
                  📖 {t('nav.reading')}
                </Link>
                <Link
                  to="/grammar"
                  className="block px-4 py-2.5 text-sm hover:bg-amber-50 hover:text-amber-800 transition-colors"
                  onClick={() => setPracticeOpen(false)}
                >
                  ✏️ {t('nav.grammar')}
                </Link>
                <Link
                  to="/vocabulary"
                  className="block px-4 py-2.5 text-sm hover:bg-amber-50 hover:text-amber-800 transition-colors"
                  onClick={() => setPracticeOpen(false)}
                >
                  🗂 {t('nav.vocabulary')}
                </Link>
              </div>
            )}
          </div>

          {/* Simulacro */}
          <Link
            to="/exam"
            className="flex items-center gap-1 transition-colors hover:text-gray-900"
          >
            📝 {t('nav.exam')}
            <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
              {t('common.new_badge')}
            </span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTesterMode(!testerMode)}
            title={testerMode ? 'Desactivar modo tester' : 'Activar modo tester (IA directa)'}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
              testerMode
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            🧪
          </button>
          <LanguageToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="hidden text-sm text-gray-600 hover:text-gray-900 md:block"
              >
                {t('nav.dashboard')}
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
