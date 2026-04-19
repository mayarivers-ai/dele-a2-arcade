import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { useUserStore } from '../stores/userStore'

export function Header() {
  const { t } = useTranslation()
  const { user, isTester, logout } = useUserStore()
  const location = useLocation()
  const isArcade = location.pathname === '/arcade'
  const isLanding = location.pathname === '/'

  if (isArcade || isLanding) return null

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-gray-900 ${isActive ? 'text-gray-900 font-semibold' : ''}`

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
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <NavLink to="/arcade" className={navLinkClass}>
            🕹 {t('nav.arcade')}
          </NavLink>
          <NavLink to="/play" className={navLinkClass}>
            🏆 {t('nav.career')}
          </NavLink>
          <NavLink to="/practica" className={navLinkClass}>
            📚 {t('nav.practice')}
          </NavLink>
          <NavLink to="/teoria" className={navLinkClass}>
            📖 {t('nav.theory')}
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user && isTester && (
            <span
              title="Modo tester activo"
              className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700"
            >
              🧪
            </span>
          )}
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
