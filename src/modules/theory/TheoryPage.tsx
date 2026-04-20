import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../stores/settingsStore'
import { getLessonById, getAdjacentLessons, theoryBlocks } from '../../data/theory'

export function TheoryPage() {
  const { leccion } = useParams<{ bloque: string; leccion: string }>()
  const { language } = useSettingsStore()
  const navigate = useNavigate()
  const isRu = language === 'ru'

  const lesson = leccion ? getLessonById(leccion) : undefined
  const block = lesson ? theoryBlocks.find((b) => b.id === lesson.bloque) : undefined
  const { prev, next } = leccion ? getAdjacentLessons(leccion) : {}

  if (!lesson || !block) {
    return (
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Lección no encontrada.</p>
        <Link to="/teoria" style={{ color: 'var(--cobalt)', textDecoration: 'none', fontWeight: 600, marginTop: 16, display: 'inline-block' }}>
          ← Teoría
        </Link>
      </div>
    )
  }

  const blockTitle = isRu ? block.title_ru : block.title

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 32px 80px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
        <Link to="/teoria" style={{ color: 'var(--cobalt)', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
          {isRu ? 'Теория' : 'Teoría'}
        </Link>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
        <Link to="/teoria" style={{ color: 'var(--cobalt)', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
          {block.emoji} {blockTitle}
        </Link>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
        <span className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)' }}>{lesson.id}</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="dele-pixel" style={{ fontSize: 8, color: 'var(--cobalt)', letterSpacing: '.12em', marginBottom: 8 }}>
          {isRu ? 'УРОК' : 'LECCIÓN'} {lesson.id}
        </p>
        <h1 className="dele-frau" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--ink)', margin: 0, lineHeight: 1.1 }}>
          {isRu ? lesson.title_ru : lesson.title}
        </h1>
      </div>

      {/* Explanation */}
      <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
        {isRu ? lesson.content.explanation_ru : lesson.content.explanation}
      </p>

      {/* Rule */}
      <div style={{
        marginBottom: 32, borderRadius: 16,
        border: '1px solid var(--cobalt-soft)', background: 'var(--cobalt-soft)',
        padding: '20px 24px',
      }}>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.14em', marginBottom: 10 }}>
          {isRu ? 'ПРАВИЛО' : 'REGLA'}
        </p>
        <p style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
          {isRu ? lesson.content.rule_ru : lesson.content.rule}
        </p>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: 32 }}>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--muted)', letterSpacing: '.14em', marginBottom: 12 }}>
          {isRu ? 'ПРИМЕРЫ' : 'EJEMPLOS'}
        </p>
        <div style={{ borderRadius: 12, border: '1px solid var(--rule)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(46,75,206,.04)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>Español</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>Русский</th>
              </tr>
            </thead>
            <tbody>
              {lesson.content.examples.map((ex, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--rule)', background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(46,75,206,.02)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--ink)' }}>{ex.es}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{ex.ru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note for Russian speakers */}
      {(lesson.content.note_ru || lesson.content.note) && (
        <div style={{
          marginBottom: 32, borderRadius: 16,
          border: '1px solid var(--sun)',
          background: 'var(--sun-soft)',
          padding: '20px 24px',
        }}>
          <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--sun-dark)', letterSpacing: '.14em', marginBottom: 10 }}>
            🇷🇺 {isRu ? 'ДЛЯ РУССКОЯЗЫЧНЫХ' : 'NOTA PARA RUSOHABLANTES'}
          </p>
          <p style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            {isRu
              ? (lesson.content.note_ru ?? lesson.content.note)
              : (lesson.content.note ?? lesson.content.note_ru)}
          </p>
        </div>
      )}

      {/* Exercise link */}
      {lesson.exerciseLink && (
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() => navigate(lesson.exerciseLink!)}
            className="dele-btn dele-btn-coral"
            style={{ padding: '10px 22px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}
          >
            {isRu ? 'К упражнению →' : 'Ir al ejercicio →'}
          </button>
        </div>
      )}

      {/* Prev / Next */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--rule)', paddingTop: 24 }}>
        {prev ? (
          <Link
            to={`/teoria/${prev.bloque}/${prev.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              borderRadius: 12, border: '1px solid var(--rule)',
              padding: '10px 16px', textDecoration: 'none',
              fontSize: 13, color: 'var(--ink-2)', fontWeight: 500,
              background: 'var(--bg-card)', transition: 'border-color .2s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; e.currentTarget.style.color = 'var(--cobalt)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--ink-2)' }}
          >
            ← <span>{isRu ? prev.title_ru : prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            to={`/teoria/${next.bloque}/${next.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              borderRadius: 12, border: '1px solid var(--rule)',
              padding: '10px 16px', textDecoration: 'none',
              fontSize: 13, color: 'var(--ink-2)', fontWeight: 500,
              background: 'var(--bg-card)', transition: 'border-color .2s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; e.currentTarget.style.color = 'var(--cobalt)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--ink-2)' }}
          >
            <span>{isRu ? next.title_ru : next.title}</span> →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
