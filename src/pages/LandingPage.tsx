import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useSettingsStore } from '../stores/settingsStore'

/* ─── COPY ──────────────────────────────────────────────────── */
const COPY = {
  nav: {
    ru: { courses: 'Курсы', levels: 'Уровни', arcade: 'Аркада', grammar: 'Грамматика', about: 'О проекте' },
    es: { courses: 'Cursos', levels: 'Niveles', arcade: 'Arcade', grammar: 'Gramática', about: 'Proyecto' },
  },
  hero: {
    badge_ru: 'Открытый бета-доступ',
    badge_es: 'Beta abierta',
    pre_ru: 'Подготовка к DELE A2',
    pre_es: 'Preparación DELE A2',
    title_ru: ['испанский', 'как', 'игра'],
    title_es: ['el español', 'como', 'un juego'],
    sub_ru: 'Интерактивный курс для тех, кто хочет сдать DELE A2 без стресса. Учи, играй, побеждай.',
    sub_es: 'Curso interactivo para aprobar el DELE A2 sin estrés. Aprende, juega y gana.',
    cta_ru: 'Начать бесплатно',
    cta_es: 'Empezar gratis',
    cta2_ru: 'Смотреть демо',
    cta2_es: 'Ver demo',
    note_ru: 'Без карты · первый урок через 30 секунд',
    note_es: 'Sin tarjeta · primera lección en 30 segundos',
  },
  ticker: ['Ser vs Estar', 'Pretérito Indefinido', 'Preposiciones', 'Verbos irregulares', 'Vocabulario A2', 'Comprensión lectora', 'Imperativo', 'Hay vs Está'],
  pillars: {
    kicker_ru: 'Как это работает', kicker_es: 'Cómo funciona',
    title_ru: ['Три шага', 'до DELE A2'], title_es: ['Tres pasos', 'hasta DELE A2'],
    items: [
      { n: '01', ru: 'Учись', es: 'Aprende', desc_ru: 'Микро-уроки грамматики и словаря с интервальным повторением.', desc_es: 'Microlecciones de gramática y vocabulario con repetición espaciada.', color: 'cobalt' as const, icon: '✎' },
      { n: '02', ru: 'Играй', es: 'Juega', desc_ru: 'Аркада спряжений: таймер, жизни, XP, уровни.', desc_es: 'Arcade de conjugación: timer, vidas, XP, niveles.', color: 'coral' as const, icon: '★' },
      { n: '03', ru: 'Сдавай', es: 'Aprueba', desc_ru: 'Полные симуляции экзамена в формате Instituto Cervantes.', desc_es: 'Simulacros completos en formato Instituto Cervantes.', color: 'mint' as const, icon: '✓' },
    ],
  },
  map: {
    kicker_ru: 'Карта курса', kicker_es: 'Mapa del curso',
    title_ru: 'От первых слов — до экзамена', title_es: 'De las primeras palabras al examen',
    sub_ru: 'Семь глав. Каждая открывается, когда ты готов.', sub_es: 'Siete capítulos. Cada uno se desbloquea cuando estás listo.',
    chapters: [
      { ru: 'Приветствия', es: 'Saludos', n: '01' },
      { ru: 'Настоящее', es: 'Presente', n: '02' },
      { ru: 'Рутина', es: 'Rutinas', n: '03' },
      { ru: 'Прошедшее', es: 'Pretérito', n: '04' },
      { ru: 'Путешествия', es: 'Viajes', n: '05' },
      { ru: 'Здоровье', es: 'Salud', n: '06' },
      { ru: 'Экзамен', es: 'Examen', n: '07' },
    ],
  },
  modules: {
    kicker_ru: 'В одном приложении', kicker_es: 'En una sola app',
    title_ru: 'Всё, что нужно для A2', title_es: 'Todo lo que necesitas para A2',
    items: [
      { icon: '🕹', tag_ru: 'Аркада', tag_es: 'Arcade', title_ru: 'Спряжения в стиле аркады', title_es: 'Conjugación arcade', desc_ru: 'Таймер, жизни, серии, XP.', desc_es: 'Timer, vidas, rachas, XP.', free: true, color: 'coral' as const, to: '/arcade' },
      { icon: '📖', tag_ru: 'Чтение', tag_es: 'Lectura', title_ru: 'Понимание текстов', title_es: 'Comprensión lectora', desc_ru: 'Тексты в формате DELE A2.', desc_es: 'Textos en formato DELE A2.', color: 'cobalt' as const, to: '/play' },
      { icon: '✎', tag_ru: 'Грамматика', tag_es: 'Gramática', title_ru: 'Вся грамматика A2', title_es: 'Toda la gramática A2', desc_ru: 'Ser/estar, претериты, местоимения.', desc_es: 'Ser/estar, pretéritos, pronombres.', color: 'mint' as const, to: '/play' },
      { icon: '✦', tag_ru: 'Словарь', tag_es: 'Vocab', title_ru: 'Слова с повторением', title_es: 'Vocabulario con SRS', desc_ru: 'Карточки с интервальным повторением.', desc_es: 'Flashcards con repetición espaciada.', color: 'sun' as const, to: '/play' },
    ],
  },
  demo: {
    kicker_ru: 'Попробуй прямо здесь', kicker_es: 'Pruébalo aquí mismo',
    title_ru: 'Аркада спряжений', title_es: 'Arcade de conjugación',
    sub_ru: 'Напиши правильную форму глагола — и дальше по уровню. Никакой регистрации.',
    sub_es: 'Escribe la forma correcta — y sigues al siguiente. Sin registro.',
  },
  reviews: {
    kicker_ru: 'Отзывы', kicker_es: 'Reseñas',
    title_ru: 'Мы только начали', title_es: 'Acabamos de empezar',
    sub_ru: 'Первые студенты появятся здесь. Твой отзыв может быть первым.',
    sub_es: 'Las primeras reseñas aparecerán aquí. La tuya puede ser la primera.',
    cta_ru: 'Стать бета-тестером', cta_es: 'Ser beta tester',
  },
  cta: {
    title_ru: ['готов(а)', 'начать?'], title_es: ['¿Listo', 'para empezar?'],
    sub_ru: 'Первый урок займёт 3 минуты.', sub_es: 'La primera lección dura 3 minutos.',
    btn_ru: 'Начать бесплатно', btn_es: 'Empezar gratis',
  },
}

type Lang = 'ru' | 'es'

/* ─── Hooks ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.dele-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('dele-scroll-progress')
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      if (bar) bar.style.transform = `scaleX(${scrolled || 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function useMouse() {
  const [m, setM] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const on = (e: MouseEvent) => setM({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', on)
    return () => window.removeEventListener('mousemove', on)
  }, [])
  return m
}

/* ─── Logo ──────────────────────────────────────────────────── */
function Logo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'var(--cobalt)', transform: 'rotate(-4deg)', boxShadow: '0 3px 0 var(--cobalt-dark)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg, var(--cobalt), #4A66DC)', display: 'grid', placeItems: 'center' }}>
        <span className="dele-pixel" style={{ fontSize: size * 0.32, color: 'white' }}>A2</span>
      </div>
      <div style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)', boxShadow: '0 0 0 2px white' }} />
    </div>
  )
}

/* ─── Nav ───────────────────────────────────────────────────── */
function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const nav = COPY.nav[lang]
  const items: { key: keyof typeof nav; href: string }[] = [
    { key: 'courses', href: '/play' },
    { key: 'levels', href: '/play' },
    { key: 'arcade', href: '/arcade' },
    { key: 'grammar', href: '/grammar' },
    { key: 'about', href: '#about' },
  ]
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,246,239,.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all .3s',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <Logo />
          <div style={{ lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="dele-frau" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              DELE <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>Arcade</span>
            </span>
            <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)', letterSpacing: '.14em' }}>A2 · RU → ES</span>
          </div>
        </Link>
        <nav style={{ display: 'flex', gap: 30 }}>
          {items.map(it => (
            <Link key={it.key} to={it.href} style={{ textDecoration: 'none', color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'color .2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--cobalt)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ink-2)')}>
              {nav[it.key]}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="dele-lang-seg">
            <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
          </div>
          <Link to="/login" className="dele-btn dele-btn-coral" style={{ padding: '10px 18px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}>
            {lang === 'ru' ? 'Начать' : 'Empezar'}
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero({ lang }: { lang: Lang }) {
  const h = COPY.hero
  const mouse = useMouse()
  const title = lang === 'ru' ? h.title_ru : h.title_es
  const px = (mouse.x - 0.5) * 20
  const py = (mouse.y - 0.5) * 20
  return (
    <section style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 40px 120px', minHeight: '88vh' }}>
      <div style={{ position: 'absolute', top: '8%', right: '12%', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, var(--coral-soft), transparent 70%)', filter: 'blur(8px)', transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, transition: 'transform .3s ease-out' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-4%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, var(--mint-soft), transparent 70%)', filter: 'blur(8px)', transform: `translate(${-px * 0.4}px, ${-py * 0.4}px)`, transition: 'transform .3s ease-out' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center', position: 'relative' }}>
        <div>
          <div className="dele-reveal dele-pill" style={{ marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }} className="dele-pulse-ring" />
            <span style={{ color: 'var(--ink-2)' }}>{lang === 'ru' ? h.pre_ru : h.pre_es}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--cobalt)' }}>{lang === 'ru' ? h.badge_ru : h.badge_es}</span>
          </div>

          <h1 className="dele-display dele-reveal d1" style={{ fontSize: 'clamp(56px, 7.5vw, 104px)', margin: 0, color: 'var(--ink)' }}>
            <span style={{ display: 'block' }}>{title[0]}</span>
            <span className="dele-italic-soft" style={{ display: 'block', color: 'var(--coral)' }}>{title[1]}</span>
            <span style={{ display: 'block', color: 'var(--cobalt)' }}>{title[2]}</span>
          </h1>

          <p className="dele-reveal d2 dele-frau" style={{ fontSize: 20, color: 'var(--ink-2)', maxWidth: 500, marginTop: 32, lineHeight: 1.5 }}>
            {lang === 'ru' ? h.sub_ru : h.sub_es}
          </p>

          <div className="dele-reveal d3" style={{ display: 'flex', gap: 14, marginTop: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="dele-btn dele-btn-primary">
              <span>{lang === 'ru' ? h.cta_ru : h.cta_es}</span>
              <span style={{ fontSize: 18 }}>→</span>
            </Link>
            <a href="#demo" className="dele-btn dele-btn-ghost">
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--cobalt)', color: 'white', display: 'grid', placeItems: 'center', fontSize: 9 }}>▶</span>
              {lang === 'ru' ? h.cta2_ru : h.cta2_es}
            </a>
          </div>

          <div className="dele-reveal d4" style={{ marginTop: 20, fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
            {lang === 'ru' ? h.note_ru : h.note_es}
          </div>
        </div>

        <div style={{ position: 'relative', height: 560 }}>
          <div className="dele-orbit-ring" style={{ position: 'absolute', top: '10%', left: '15%', width: 340, height: 340 }}>
            <svg viewBox="0 0 340 340" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <radialGradient id="dele-blobGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FFD4E8" />
                  <stop offset="100%" stopColor="#FFBACD" />
                </radialGradient>
              </defs>
              <path d="M170,20 C245,20 320,65 320,170 C320,260 260,320 170,320 C85,320 20,250 20,165 C20,85 95,20 170,20 Z" fill="url(#dele-blobGrad)" />
            </svg>
          </div>

          <div className="dele-reveal d2 dele-lift" style={{ position: 'absolute', right: 0, top: 40, width: 340, background: 'white', borderRadius: 24, padding: 24, boxShadow: '0 30px 60px rgba(46,75,206,.15)', border: '1px solid rgba(255,255,255,.8)', transform: `translate(${px * 0.6}px, ${py * 0.6}px) rotate(-1.5deg)`, transition: 'transform .6s ease-out, box-shadow .35s', zIndex: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cobalt-soft)', display: 'grid', placeItems: 'center', fontSize: 14, color: 'var(--cobalt)' }}>✎</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--cobalt)' }}>{lang === 'ru' ? 'Урок · Глаголы' : 'Lección · Verbos'}</span>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1, 1, 1, 0, 0].map((v, i) => (
                  <div key={i} style={{ width: 18, height: 4, borderRadius: 2, background: v ? 'var(--mint)' : 'var(--rule)' }} />
                ))}
              </div>
            </div>
            <div className="dele-frau dele-italic-soft" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
              {lang === 'ru' ? 'Переведи на русский' : 'Traduce al ruso'}
            </div>
            <div className="dele-frau" style={{ fontSize: 26, color: 'var(--ink)', marginBottom: 20, lineHeight: 1.2, fontWeight: 500 }}>
              Yo <span style={{ background: 'linear-gradient(120deg, transparent 0%, transparent 30%, var(--sun-soft) 30%, var(--sun-soft) 90%, transparent 90%)', padding: '0 4px' }}>hablo</span> español
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {(lang === 'ru'
                ? ['Я говорю по-испански', 'Он говорит по-французски', 'Мы учим немецкий', 'Ты читаешь книгу']
                : ['Yo hablo español', 'Él habla francés', 'Nosotros aprendemos', 'Tú lees un libro']
              ).map((opt, i) => (
                <div key={i} style={{ padding: '11px 13px', border: i === 0 ? '2px solid var(--mint)' : '1.5px solid var(--rule)', background: i === 0 ? 'var(--mint-soft)' : 'white', borderRadius: 12, fontSize: 12, fontWeight: 600, color: i === 0 ? 'var(--mint-dark)' : 'var(--ink-2)', position: 'relative', transition: 'all .2s' }}>
                  {opt}
                  {i === 0 && <span style={{ position: 'absolute', top: 5, right: 7, fontSize: 11, color: 'var(--mint-dark)' }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="dele-reveal d4 dele-bob" style={{ position: 'absolute', left: 0, bottom: 60, width: 220, background: 'linear-gradient(135deg, var(--cobalt), var(--cobalt-dark))', color: 'white', borderRadius: 20, padding: 18, boxShadow: '0 20px 40px rgba(46,75,206,.3)', transform: `translate(${-px * 0.4}px, ${-py * 0.4}px)`, transition: 'transform .6s ease-out', zIndex: 3 }}>
            <div className="dele-pixel" style={{ fontSize: 7, color: 'var(--sun)', letterSpacing: '.2em', marginBottom: 12 }}>◆ ARCADE MODE</div>
            <div className="dele-pixel" style={{ fontSize: 16, color: 'var(--sun)', marginBottom: 4 }}>yo</div>
            <div className="dele-frau dele-italic-soft" style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', marginBottom: 12 }}>hablar · presente</div>
            <div style={{ height: 36, border: '1.5px solid rgba(255,255,255,.25)', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', background: 'rgba(0,0,0,.2)' }}>
              <span className="dele-pixel" style={{ fontSize: 13, color: 'var(--sun)' }}>habl</span>
              <span className="dele-pixel dele-blink" style={{ color: 'var(--sun)', fontSize: 13 }}>_</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, alignItems: 'center' }}>
              <span style={{ color: 'var(--coral)', letterSpacing: '2px' }}>♥♥♥</span>
              <span className="dele-pixel" style={{ fontSize: 9, color: 'var(--sun)' }}>00:47</span>
            </div>
          </div>

          <div className="dele-chip-float dele-bob-slow" style={{ top: 30, right: 80, ['--r' as string]: '-4deg' } as CSSProperties}>
            <span style={{ fontSize: 14 }}>🎓</span>
            <span style={{ color: 'var(--cobalt)' }}>{lang === 'ru' ? 'Уровень A2' : 'Nivel A2'}</span>
          </div>
          <div className="dele-chip-float dele-bob" style={{ bottom: 0, right: 40, animationDelay: '-1.5s', ['--r' as string]: '3deg' } as CSSProperties}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <span style={{ color: 'var(--coral)' }}>+10 XP</span>
          </div>

          <div className="dele-spin-slow" style={{ position: 'absolute', top: 5, right: 15, fontSize: 28, color: 'var(--coral)' }}>✦</div>
          <div style={{ position: 'absolute', top: 260, left: 20, fontSize: 18, color: 'var(--cobalt)', opacity: 0.5 }}>✦</div>
        </div>
      </div>
    </section>
  )
}

/* ─── Ticker ────────────────────────────────────────────────── */
function Ticker() {
  return (
    <section style={{ background: 'var(--ink)', color: 'white', padding: '18px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <div style={{ position: 'relative' }}>
        <div className="dele-marquee-track dele-frau dele-italic-soft" style={{ fontSize: 28 }}>
          {[...COPY.ticker, ...COPY.ticker, ...COPY.ticker].map((t, i) => (
            <span key={i} style={{ paddingLeft: 40, paddingRight: 40, borderRight: '1px solid rgba(255,255,255,.15)', color: i % 3 === 0 ? 'var(--sun)' : i % 3 === 1 ? 'var(--coral)' : 'rgba(255,255,255,.9)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pillars ───────────────────────────────────────────────── */
function Pillars({ lang }: { lang: Lang }) {
  const p = COPY.pillars
  const COLORS = {
    cobalt: { bg: 'linear-gradient(135deg, var(--cobalt), var(--cobalt-dark))', fg: 'white', accent: 'var(--sun)' },
    coral: { bg: 'linear-gradient(135deg, var(--coral), var(--coral-dark))', fg: 'white', accent: 'var(--cobalt-soft)' },
    mint: { bg: 'linear-gradient(135deg, var(--mint), var(--mint-dark))', fg: 'white', accent: 'var(--coral-soft)' },
  }
  const title = lang === 'ru' ? p.title_ru : p.title_es
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 48 }}>
        <div>
          <div className="dele-reveal dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.22em', marginBottom: 14 }}>
            ◆ {(lang === 'ru' ? p.kicker_ru : p.kicker_es).toUpperCase()}
          </div>
          <h2 className="dele-reveal d1 dele-display" style={{ fontSize: 'clamp(44px, 5vw, 72px)', margin: 0, color: 'var(--ink)' }}>
            <span style={{ display: 'block' }}>{title[0]}</span>
            <span className="dele-italic-soft" style={{ display: 'block', color: 'var(--cobalt)' }}>{title[1]}</span>
          </h2>
        </div>
        <div className="dele-reveal d2 dele-frau" style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 420, lineHeight: 1.55, alignSelf: 'end', paddingBottom: 8 }}>
          {lang === 'ru' ? 'Без зубрёжки и скучных таблиц. Прогресс через игру и короткие сессии.' : 'Sin memorizar tablas aburridas. Progreso a través del juego y sesiones cortas.'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {p.items.map((it, i) => {
          const col = COLORS[it.color]
          return (
            <div key={i} className={`dele-reveal d${i + 1} dele-lift`} style={{ position: 'relative', background: col.bg, color: col.fg, borderRadius: 28, padding: '36px 30px 40px', minHeight: 300, overflow: 'hidden', boxShadow: '0 12px 30px rgba(26,15,46,.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div className="dele-pixel" style={{ fontSize: 11, color: col.accent, letterSpacing: '.1em' }}>{it.n}</div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', fontSize: 18 }}>
                  {it.icon}
                </div>
              </div>
              <div className="dele-display" style={{ fontSize: 44, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {lang === 'ru' ? it.ru : it.es}
              </div>
              <div className="dele-frau dele-italic-soft" style={{ fontSize: 17, opacity: 0.75, marginTop: 6 }}>
                {lang === 'ru' ? it.es : it.ru}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 24, opacity: 0.9, maxWidth: 280 }}>
                {lang === 'ru' ? it.desc_ru : it.desc_es}
              </p>
              <div className="dele-frau" style={{ position: 'absolute', right: -20, bottom: -60, fontSize: 240, opacity: 0.08, color: col.accent, fontWeight: 700, pointerEvents: 'none' }}>
                {it.icon}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Level Map ─────────────────────────────────────────────── */
function LevelMap({ lang }: { lang: Lang }) {
  const m = COPY.map
  const mapRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const on = () => {
      if (!mapRef.current) return
      const r = mapRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.8
      const end = -r.height * 0.2
      const pct = Math.max(0, Math.min(1, (start - r.top) / (start - end)))
      setProgress(pct)
    }
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [])

  const positions = [
    { x: 8, y: 72 }, { x: 22, y: 32 }, { x: 36, y: 68 }, { x: 50, y: 28 },
    { x: 64, y: 64 }, { x: 78, y: 26 }, { x: 92, y: 60 },
  ]
  const activeIdx = 3
  return (
    <section ref={mapRef} style={{ background: 'var(--ink)', color: 'white', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, var(--cobalt-glow), transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,107,.2), transparent 70%)', filter: 'blur(40px)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <div style={{ marginBottom: 56, maxWidth: 680 }}>
          <div className="dele-reveal dele-pixel" style={{ fontSize: 10, color: 'var(--sun)', letterSpacing: '.22em', marginBottom: 14 }}>
            ◆ {(lang === 'ru' ? m.kicker_ru : m.kicker_es).toUpperCase()}
          </div>
          <h2 className="dele-reveal d1 dele-display" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', margin: 0 }}>
            {lang === 'ru' ? m.title_ru : m.title_es}
          </h2>
          <p className="dele-reveal d2 dele-frau dele-italic-soft" style={{ fontSize: 19, color: 'rgba(255,255,255,.7)', marginTop: 16 }}>
            {lang === 'ru' ? m.sub_ru : m.sub_es}
          </p>
        </div>

        <div className="dele-reveal d3" style={{ position: 'relative', background: 'rgba(255,255,255,.04)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 32, height: 420, backdropFilter: 'blur(8px)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }} />

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M 8 72 Q 15 20, 22 32 T 36 68 T 50 28 T 64 64 T 78 26 T 92 60" stroke="rgba(255,255,255,.15)" strokeWidth="2.5" fill="none" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
            <path d="M 8 72 Q 15 20, 22 32 T 36 68 T 50 28 T 64 64 T 78 26 T 92 60" stroke="url(#dele-pathGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={100} strokeDasharray="100" strokeDashoffset={100 - progress * 60} />
            <defs>
              <linearGradient id="dele-pathGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--mint)" />
                <stop offset="50%" stopColor="var(--sun)" />
                <stop offset="100%" stopColor="var(--coral)" />
              </linearGradient>
            </defs>
          </svg>

          {positions.map((pos, i) => {
            const ch = m.chapters[i]
            const isCurrent = i === activeIdx
            const isDone = i < activeIdx
            const isExam = i === positions.length - 1
            let bg = 'rgba(255,255,255,.08)', fg = 'rgba(255,255,255,.5)', border = '2px dashed rgba(255,255,255,.25)', content = '🔒', size = 60
            if (isExam) { bg = 'var(--coral)'; fg = 'white'; border = '4px solid var(--sun)'; content = '🎓'; size = 88 }
            else if (isCurrent) { bg = 'var(--sun)'; fg = 'var(--ink)'; border = '4px solid white'; content = '★'; size = 88 }
            else if (isDone) { bg = 'var(--mint)'; fg = 'white'; border = '3px solid rgba(255,255,255,.25)'; content = '✓'; size = 66 }
            return (
              <div key={i} style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <div className={isCurrent ? 'dele-pulse-ring' : ''} style={{ width: size, height: size, borderRadius: '50%', background: bg, color: fg, border, display: 'grid', placeItems: 'center', fontFamily: "'Fraunces', serif", fontSize: size > 70 ? 32 : 22, fontWeight: 700, boxShadow: isCurrent ? '0 12px 40px rgba(255,212,138,.4)' : '0 6px 0 rgba(0,0,0,.25)', transition: 'transform .2s' }}>{content}</div>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: isCurrent ? 'var(--sun)' : isExam ? 'var(--coral)' : isDone ? 'white' : 'rgba(255,255,255,.45)', whiteSpace: 'nowrap' }}>
                  {lang === 'ru' ? ch.ru : ch.es}
                </div>
                <div className="dele-pixel" style={{ fontSize: 7, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>CH.{ch.n}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Live Demo ─────────────────────────────────────────────── */
function LiveDemo({ lang }: { lang: Lang }) {
  const d = COPY.demo
  const prompts = [
    { subject: 'yo', inf: 'hablar', answer: 'hablo' },
    { subject: 'tú', inf: 'comer', answer: 'comes' },
    { subject: 'ella', inf: 'vivir', answer: 'vive' },
    { subject: 'nosotros', inf: 'tener', answer: 'tenemos' },
  ]
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [state, setState] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [xp, setXp] = useState(0)
  const [lives, setLives] = useState(3)
  const cur = prompts[idx % prompts.length]
  const inputRef = useRef<HTMLInputElement | null>(null)

  const check = () => {
    if (!input.trim()) return
    if (input.trim().toLowerCase() === cur.answer) {
      setState('correct')
      setXp(x => x + 10)
      setTimeout(() => {
        setIdx(i => i + 1)
        setInput('')
        setState('idle')
        inputRef.current?.focus()
      }, 900)
    } else {
      setState('wrong')
      setLives(l => Math.max(0, l - 1))
      setTimeout(() => setState('idle'), 800)
    }
  }

  return (
    <section id="demo" style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div className="dele-reveal dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.22em', marginBottom: 14 }}>
            ◆ {(lang === 'ru' ? d.kicker_ru : d.kicker_es).toUpperCase()}
          </div>
          <h2 className="dele-reveal d1 dele-display" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', margin: 0, color: 'var(--ink)' }}>
            {lang === 'ru' ? d.title_ru : d.title_es}
          </h2>
          <p className="dele-reveal d2 dele-frau" style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 16, maxWidth: 440, lineHeight: 1.5 }}>
            {lang === 'ru' ? d.sub_ru : d.sub_es}
          </p>
          <div className="dele-reveal d3" style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { ic: '⌨', ru: 'Введи форму — Enter для проверки', es: 'Escribe la forma — Enter para verificar' },
              { ic: '♥', ru: '3 жизни. Ошибёшься — потеряешь одну', es: '3 vidas. Un fallo = una vida menos' },
              { ic: '⚡', ru: '+10 XP за каждый правильный ответ', es: '+10 XP por cada respuesta correcta' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--ink-2)' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cobalt-soft)', color: 'var(--cobalt)', display: 'grid', placeItems: 'center', fontSize: 14 }}>{r.ic}</div>
                <span>{lang === 'ru' ? r.ru : r.es}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dele-reveal d2" style={{ position: 'relative' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--ink), #2A1F45)', borderRadius: 28, padding: 8, boxShadow: '0 30px 80px rgba(26,15,46,.35)', position: 'relative' }}>
            <div style={{ background: '#0a0514', borderRadius: 24, padding: '28px 30px 36px', position: 'relative', overflow: 'hidden', minHeight: 360 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 1px, transparent 3px)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, position: 'relative' }}>
                <div>
                  <div className="dele-pixel" style={{ fontSize: 8, color: 'rgba(255,255,255,.4)', letterSpacing: '.18em', marginBottom: 4 }}>XP</div>
                  <div className="dele-pixel" style={{ fontSize: 18, color: 'var(--sun)' }}>{String(xp).padStart(4, '0')}</div>
                </div>
                <div className="dele-pixel" style={{ fontSize: 10, color: 'var(--mint)' }}>◆ LEVEL 1</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="dele-pixel" style={{ fontSize: 8, color: 'rgba(255,255,255,.4)', letterSpacing: '.18em', marginBottom: 4 }}>LIVES</div>
                  <div style={{ fontSize: 16, color: 'var(--coral)', letterSpacing: '3px' }}>
                    {'♥'.repeat(lives)}<span style={{ color: 'rgba(255,255,255,.15)' }}>{'♥'.repeat(3 - lives)}</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'relative', textAlign: 'center', marginBottom: 28 }}>
                <div className="dele-pixel" style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginBottom: 14, letterSpacing: '.15em' }}>
                  ▸ {lang === 'ru' ? 'СПРЯГИ ГЛАГОЛ' : 'CONJUGA EL VERBO'}
                </div>
                <div className="dele-pixel" style={{ fontSize: 24, color: 'var(--sun)', marginBottom: 8 }}>{cur.subject}</div>
                <div className="dele-frau dele-italic-soft" style={{ fontSize: 22, color: 'rgba(255,255,255,.7)' }}>
                  {cur.inf}
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', marginLeft: 8 }}>· {lang === 'ru' ? 'настоящее' : 'presente'}</span>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && check()}
                  placeholder={cur.subject + '...'}
                  style={{
                    width: '100%',
                    background: state === 'correct' ? 'rgba(127,194,155,.15)' : state === 'wrong' ? 'rgba(255,122,107,.15)' : 'rgba(255,255,255,.05)',
                    border: '2px solid ' + (state === 'correct' ? 'var(--mint)' : state === 'wrong' ? 'var(--coral)' : 'rgba(255,255,255,.15)'),
                    color: state === 'correct' ? 'var(--mint)' : state === 'wrong' ? 'var(--coral)' : 'var(--sun)',
                    padding: '16px 18px',
                    fontSize: 20,
                    fontFamily: "'Press Start 2P', monospace",
                    borderRadius: 12, outline: 'none',
                    textAlign: 'center', letterSpacing: '2px',
                    transition: 'all .2s',
                  }}
                />
                <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                  <button onClick={check} style={{ flex: 1, padding: '12px', background: 'var(--coral)', color: 'white', border: 0, borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: "'Press Start 2P', monospace", fontSize: 11, letterSpacing: '.1em', boxShadow: '0 4px 0 var(--coral-dark)' }}>
                    ✓ {lang === 'ru' ? 'ПРОВЕРИТЬ' : 'VERIFICAR'}
                  </button>
                  <button onClick={() => { setIdx(i => i + 1); setInput(''); setState('idle') }} style={{ padding: '12px 16px', background: 'rgba(255,255,255,.08)', color: 'white', border: '1.5px solid rgba(255,255,255,.15)', borderRadius: 10, fontFamily: "'Press Start 2P', monospace", fontSize: 11, cursor: 'pointer' }}>↷</button>
                </div>
              </div>

              {state === 'correct' && (
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(127,194,155,.1)', pointerEvents: 'none' }}>
                  <div className="dele-pixel" style={{ fontSize: 36, color: 'var(--mint)', textShadow: '0 0 20px rgba(127,194,155,.6)' }}>+10 XP</div>
                </div>
              )}
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="dele-pixel" style={{ fontSize: 8, color: 'rgba(255,255,255,.4)', letterSpacing: '.2em' }}>DELE · ARCADE</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--coral)' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--sun)' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--mint)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Modules ───────────────────────────────────────────────── */
function Modules({ lang }: { lang: Lang }) {
  const m = COPY.modules
  const colorMap = {
    coral: { ic: 'var(--coral-soft)', fg: 'var(--coral-dark)', stripe: 'var(--coral)' },
    cobalt: { ic: 'var(--cobalt-soft)', fg: 'var(--cobalt)', stripe: 'var(--cobalt)' },
    mint: { ic: 'var(--mint-soft)', fg: 'var(--mint-dark)', stripe: 'var(--mint)' },
    sun: { ic: 'var(--sun-soft)', fg: 'var(--sun-dark)', stripe: 'var(--sun)' },
  }
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>
      <div style={{ marginBottom: 48, maxWidth: 640 }}>
        <div className="dele-reveal dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.22em', marginBottom: 14 }}>
          ◆ {(lang === 'ru' ? m.kicker_ru : m.kicker_es).toUpperCase()}
        </div>
        <h2 className="dele-reveal d1 dele-display" style={{ fontSize: 'clamp(40px, 4.5vw, 60px)', margin: 0, color: 'var(--ink)' }}>
          {lang === 'ru' ? m.title_ru : m.title_es}
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 18 }}>
        {m.items.map((it, i) => {
          const col = colorMap[it.color]
          return (
            <Link key={i} to={it.to} className={`dele-reveal d${i + 1} dele-lift`} style={{ textDecoration: 'none', background: 'white', borderRadius: 22, padding: '28px 24px', border: '1px solid var(--rule)', position: 'relative', minHeight: 260, cursor: 'pointer', overflow: 'hidden', display: 'block' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: col.stripe }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, marginTop: 4 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: col.ic, display: 'grid', placeItems: 'center', fontSize: 24, color: col.fg }}>
                  {it.icon}
                </div>
                {it.free && <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--mint-dark)', background: 'var(--mint-soft)', padding: '4px 10px', borderRadius: 999, letterSpacing: '.08em' }}>FREE</span>}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: col.fg, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 10 }}>
                {lang === 'ru' ? it.tag_ru : it.tag_es}
              </div>
              <div className="dele-frau" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em' }}>
                {lang === 'ru' ? it.title_ru : it.title_es}
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0 }}>
                {lang === 'ru' ? it.desc_ru : it.desc_es}
              </p>
              <div style={{ position: 'absolute', right: 20, bottom: 18, color: col.fg, fontSize: 18, fontWeight: 700, transition: 'transform .2s' }}>→</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Reviews ───────────────────────────────────────────────── */
function Reviews({ lang }: { lang: Lang }) {
  const r = COPY.reviews
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px' }}>
      <div style={{ background: 'white', borderRadius: 32, padding: '56px 48px', border: '1.5px dashed var(--rule)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, var(--sun-soft), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, var(--coral-soft), transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="dele-reveal dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.22em', marginBottom: 14 }}>
              ◆ {(lang === 'ru' ? r.kicker_ru : r.kicker_es).toUpperCase()}
            </div>
            <h2 className="dele-reveal d1 dele-display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', margin: 0, color: 'var(--ink)' }}>
              {lang === 'ru' ? r.title_ru : r.title_es}
            </h2>
            <p className="dele-reveal d2 dele-frau dele-italic-soft" style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.5, maxWidth: 420 }}>
              {lang === 'ru' ? r.sub_ru : r.sub_es}
            </p>
            <Link to="/login" className="dele-reveal d3 dele-btn dele-btn-primary" style={{ marginTop: 28 }}>
              {lang === 'ru' ? r.cta_ru : r.cta_es} →
            </Link>
          </div>
          <div className="dele-reveal d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[{ t: -2 }, { t: 3 }, { t: 2 }, { t: -3 }].map((x, i) => (
              <div key={i} style={{ background: 'var(--bg-2)', borderRadius: 16, padding: 20, minHeight: 120, transform: `rotate(${x.t}deg)`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', display: 'grid', placeItems: 'center', fontSize: 14, color: 'var(--muted)', border: '1.5px dashed var(--muted)' }}>?</div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(154,143,171,.25)', marginBottom: 6 }} />
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(154,143,171,.18)', width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─────────────────────────────────────────────── */
function FinalCTA({ lang }: { lang: Lang }) {
  const c = COPY.cta
  const title = lang === 'ru' ? c.title_ru : c.title_es
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 100px' }}>
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, var(--cobalt), var(--cobalt-dark))', borderRadius: 36, padding: '90px 60px', overflow: 'hidden', color: 'white', boxShadow: '0 30px 80px rgba(46,75,206,.3)' }}>
        <div className="dele-spin-slow" style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, border: '2px dashed rgba(255,255,255,.15)', borderRadius: '50%' }} />
        <div className="dele-spin-slow" style={{ position: 'absolute', bottom: -80, left: -80, width: 200, height: 200, border: '2px dashed rgba(255,212,138,.2)', borderRadius: '50%', animationDirection: 'reverse' }} />
        <div className="dele-bob" style={{ position: 'absolute', top: 40, right: 100, fontSize: 40, color: 'var(--sun)' }}>✦</div>
        <div className="dele-bob dele-bob-slow" style={{ position: 'absolute', bottom: 60, right: 200, fontSize: 24, color: 'var(--coral)' }}>✦</div>

        <div style={{ position: 'relative', maxWidth: 720 }}>
          <h2 className="dele-reveal dele-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', margin: 0, color: 'white' }}>
            <span style={{ display: 'block' }}>{title[0]}</span>
            <span className="dele-italic-soft" style={{ display: 'block', color: 'var(--sun)' }}>{title[1]}</span>
          </h2>
          <p className="dele-reveal d1 dele-frau" style={{ fontSize: 20, color: 'rgba(255,255,255,.8)', marginTop: 20 }}>
            {lang === 'ru' ? c.sub_ru : c.sub_es}
          </p>
          <Link to="/login" className="dele-reveal d2 dele-btn dele-btn-coral" style={{ marginTop: 32, padding: '20px 36px', fontSize: 16 }}>
            {lang === 'ru' ? c.btn_ru : c.btn_es} →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer({ lang }: { lang: Lang }) {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,.7)', padding: '60px 0 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 30, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Logo size={36} />
          <div>
            <div className="dele-frau" style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>
              DELE <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>Arcade</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>
              {lang === 'ru' ? 'Подготовка к DELE A2 для русскоязычных' : 'Preparación DELE A2 para rusoparlantes'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 40, fontSize: 13 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="dele-pixel" style={{ fontSize: 8, color: 'var(--sun)', letterSpacing: '.15em', marginBottom: 4 }}>PROJECT</div>
            <a href="#" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>GitHub</a>
            <a href="#about" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>{lang === 'ru' ? 'О нас' : 'Sobre'}</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="dele-pixel" style={{ fontSize: 8, color: 'var(--coral)', letterSpacing: '.15em', marginBottom: 4 }}>LEGAL</div>
            <a href="#" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>{lang === 'ru' ? 'Условия' : 'Términos'}</a>
            <a href="#" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>{lang === 'ru' ? 'Приватность' : 'Privacidad'}</a>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>© 2026 · Open source</div>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export function LandingPage() {
  const { language, setLanguage } = useSettingsStore()
  const lang: Lang = language === 'ru' ? 'ru' : 'es'
  const setLang = (l: Lang) => setLanguage(l)

  useReveal()
  useScrollProgress()

  return (
    <div className="dele-landing">
      <div className="dele-scroll-progress" id="dele-scroll-progress" />
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Ticker />
      <Pillars lang={lang} />
      <LevelMap lang={lang} />
      <LiveDemo lang={lang} />
      <Modules lang={lang} />
      <Reviews lang={lang} />
      <FinalCTA lang={lang} />
      <Footer lang={lang} />
    </div>
  )
}
