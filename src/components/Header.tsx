import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'
import { useSettingsStore } from '../stores/settingsStore'

type Lang = 'ru' | 'es'

const NAV = {
  ru: { arcade: 'Аркада', career: 'Карьера', practice: 'Практика', theory: 'Теория', login: 'Войти', logout: 'Выйти' },
  es: { arcade: 'Arcade', career: 'Carrera', practice: 'Practica', theory: 'Teoría', login: 'Entrar', logout: 'Salir' },
}

function Logo() {
  return (
    <div style={{ position: 'relative', width: 36, height: 36 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: 'var(--cobalt)', transform: 'rotate(-4deg)', boxShadow: '0 3px 0 var(--cobalt-dark)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: 'linear-gradient(135deg, var(--cobalt), #4A66DC)', display: 'grid', placeItems: 'center' }}>
        <span className="dele-pixel" style={{ fontSize: 10, color: 'white' }}>A2</span>
      </div>
      <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', boxShadow: '0 0 0 2px var(--bg)' }} />
    </div>
  )
}

export function Header() {
  const { user, logout } = useUserStore()
  const { language, setLanguage } = useSettingsStore()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const lang = (language as Lang) ?? 'ru'
  const nav = NAV[lang]

  const isArcade = location.pathname === '/arcade'
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  if (isArcade || isLanding) return null

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    textDecoration: 'none',
    color: isActive ? 'var(--cobalt)' : 'var(--ink-2)',
    fontSize: 13,
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    borderBottom: isActive ? '2px solid var(--cobalt)' : '2px solid transparent',
    paddingBottom: 2,
    transition: 'color .2s',
  })

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(247,244,239,.92)' : 'rgba(247,244,239,.98)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid var(--rule)',
      transition: 'all .3s',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Logo />
          <div style={{ lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span className="dele-frau" style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              DELE <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>Arcade</span>
            </span>
            <span className="dele-pixel" style={{ fontSize: 6, color: 'var(--muted)', letterSpacing: '.14em' }}>A2 · RU → ES</span>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 28 }}>
          {([
            { to: '/arcade', label: nav.arcade },
            { to: '/play', label: nav.career },
            { to: '/practica', label: nav.practice },
            { to: '/teoria', label: nav.theory },
          ] as const).map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => navLinkStyle(isActive)}
              onMouseOver={e => { if (!(e.currentTarget as HTMLAnchorElement).getAttribute('aria-current')) e.currentTarget.style.color = 'var(--cobalt)' }}
              onMouseOut={e => { if (!(e.currentTarget as HTMLAnchorElement).getAttribute('aria-current')) e.currentTarget.style.color = 'var(--ink-2)' }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="dele-lang-seg">
            <button
              className={lang === 'ru' ? 'on' : ''}
              onClick={() => setLanguage('ru')}
            >RU</button>
            <button
              className={lang === 'es' ? 'on' : ''}
              onClick={() => setLanguage('es')}
            >ES</button>
          </div>
          {user ? (
            <button
              onClick={logout}
              className="dele-btn dele-btn-ghost"
              style={{ padding: '8px 16px', fontSize: 12 }}
            >
              {nav.logout}
            </button>
          ) : (
            <Link
              to="/login"
              className="dele-btn dele-btn-coral"
              style={{ padding: '9px 18px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}
            >
              {nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
