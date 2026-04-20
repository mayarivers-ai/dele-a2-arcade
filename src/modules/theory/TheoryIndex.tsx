import { Link } from 'react-router-dom'
import { useSettingsStore } from '../../stores/settingsStore'
import { theoryBlocks } from '../../data/theory'

const COPY = {
  ru: {
    title: 'Теория',
    subtitle: 'Грамматика и словарь DELE A2 — объяснения на русском для русскоязычных',
    block: 'Блок',
    lessons: 'уроков',
  },
  es: {
    title: 'Teoría',
    subtitle: 'Gramática y vocabulario DELE A2 explicado para rusohablantes',
    block: 'Bloque',
    lessons: 'lecciones',
  },
}

export function TheoryIndex() {
  const { language } = useSettingsStore()
  const lang = (language as 'ru' | 'es') ?? 'ru'
  const copy = COPY[lang]

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 32px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p className="dele-pixel" style={{ fontSize: 9, color: 'var(--cobalt)', letterSpacing: '.12em', marginBottom: 10 }}>
          {copy.block.toUpperCase()} INDEX
        </p>
        <h1 className="dele-frau" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--ink)', margin: 0, lineHeight: 1 }}>
          {copy.title}
        </h1>
        <p style={{ marginTop: 12, color: 'var(--ink-2)', fontSize: 15, fontWeight: 500 }}>
          {copy.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {theoryBlocks.map((block) => {
          const blockTitle = lang === 'ru' ? block.title_ru : block.title
          return (
            <div
              key={block.id}
              style={{
                borderRadius: 16,
                border: '1px solid var(--rule)',
                background: 'var(--bg-card)',
                padding: '20px 20px 16px',
                transition: 'box-shadow .2s, transform .2s',
                boxShadow: '0 2px 8px rgba(46,75,206,.06)',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(46,75,206,.13)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(46,75,206,.06)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
              }}
            >
              {/* Block header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>{block.emoji}</span>
                <div>
                  <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)', letterSpacing: '.12em', margin: 0 }}>
                    {copy.block.toUpperCase()} {block.id}
                  </p>
                  <h2 className="dele-frau" style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.2 }}>
                    {blockTitle}
                  </h2>
                </div>
              </div>

              {/* Lesson list */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {block.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      to={`/teoria/${block.id}/${lesson.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '6px 8px', borderRadius: 8,
                        textDecoration: 'none', color: 'var(--ink-2)',
                        fontSize: 13, fontWeight: 500,
                        transition: 'background .15s, color .15s',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = 'var(--cobalt-soft)'
                        e.currentTarget.style.color = 'var(--cobalt)'
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--ink-2)'
                      }}
                    >
                      <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)', minWidth: 28, flexShrink: 0 }}>
                        {lesson.id}
                      </span>
                      <span>{lesson.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--rule)' }}>
                <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)' }}>
                  {block.lessons.length} {copy.lessons}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
