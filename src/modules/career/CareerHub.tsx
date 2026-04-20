import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCareerStore, isExamUnlocked, type PhaseKey, type CareerLevel, type PhaseState } from '../../stores/careerStore'
import { useSettingsStore } from '../../stores/settingsStore'
import { getLevel, FREE_LEVELS } from '../../data/career'

const PHASE_ORDER: PhaseKey[] = ['reading', 'vocab', 'grammar', 'exam']

const PHASE_META: Record<PhaseKey, { label: { ru: string; es: string }; icon: string; desc: { ru: string; es: string }; color: string }> = {
  reading: { label: { ru: 'Чтение', es: 'Lectura' }, icon: '📖', desc: { ru: '1 текст · 4 вопроса', es: '1 texto · 4 preguntas' }, color: 'var(--cobalt)' },
  vocab:   { label: { ru: 'Лексика', es: 'Vocabulario' }, icon: '✦', desc: { ru: '5 вопросов', es: '5 preguntas' }, color: 'var(--sun-dark)' },
  grammar: { label: { ru: 'Грамматика', es: 'Gramática' }, icon: '✎', desc: { ru: '5 вопросов', es: '5 preguntas' }, color: 'var(--mint-dark)' },
  exam:    { label: { ru: 'Экзамен', es: 'Examen' }, icon: '🎓', desc: { ru: '10 вопросов · зачёт 80%', es: '10 preguntas · aprobar 80%' }, color: 'var(--coral)' },
}

const COPY = {
  ru: {
    home: '← Главная',
    career: 'КАРЬЕРА DELE A2',
    level: 'Уровень',
    passed: (n: number) => `${n}/4 завершено`,
    locked: 'Заблокировано',
    poolExhausted: 'Пул исчерпан',
    start: 'Начать',
    retry: (score: number) => `Повторить (${score}%)`,
    freeLevels: (n: number) => `${n} бесплатных уровней. Сдайте экзамен на 80%, чтобы продвинуться.`,
    levelUp: (lvl: number) => `Уровень ${lvl} завершён! 🎉`,
    levelUnlocked: (lvl: number) => `Открыт уровень ${lvl}.`,
    freeDone: 'Вы прошли бесплатную версию.',
    paywallTitle: 'Конец бесплатной версии',
    paywallDesc: 'Открывайте безлимитные уровни с упражнениями на ИИ. Скоро.',
    careerTitle: 'Ваша карьера',
    careerDesc: (lvl: number) => `Завершите чтение, лексику и грамматику, чтобы разблокировать экзамен уровня ${lvl}.`,
    attempt: (n: number) => `Попытка ${n}/3`,
    review: 'Просмотр →',
  },
  es: {
    home: '← Inicio',
    career: 'CARRERA DELE A2',
    level: 'Nivel',
    passed: (n: number) => `${n}/4 completado${n === 1 ? '' : 's'}`,
    locked: 'Bloqueado',
    poolExhausted: 'Pool agotado',
    start: 'Empezar',
    retry: (score: number) => `Reintentar (${score}%)`,
    freeLevels: (n: number) => `${n} niveles gratis. Supera el examen con 80% para avanzar.`,
    levelUp: (lvl: number) => `¡Nivel ${lvl} completado! 🎉`,
    levelUnlocked: (lvl: number) => `Ya tienes acceso al nivel ${lvl}.`,
    freeDone: 'Has completado la versión gratuita.',
    paywallTitle: 'Has llegado al final de la versión gratuita',
    paywallDesc: 'Desbloquea niveles ilimitados con ejercicios generados por IA. Próximamente.',
    careerTitle: 'Tu carrera',
    careerDesc: (lvl: number) => `Completa lectura, vocabulario y gramática para desbloquear el examen del nivel ${lvl}.`,
    attempt: (n: number) => `Intento ${n}/3`,
    review: 'Revisar →',
  },
}

function statusBadge(state: PhaseState, locked: boolean, copy: typeof COPY['ru']) {
  if (locked) return { label: copy.locked, bg: '#eee', fg: '#999', icon: '🔒' }
  if (state.status === 'passed') return { label: `${state.score}%`, bg: 'var(--mint-soft)', fg: 'var(--mint-dark)', icon: '✓' }
  if (state.status === 'failed') return { label: copy.retry(state.score), bg: 'var(--coral-soft)', fg: 'var(--coral-dark)', icon: '↻' }
  if (state.status === 'exhausted') return { label: copy.poolExhausted, bg: '#f3e8ff', fg: '#7e22ce', icon: '⚠' }
  return { label: copy.start, bg: 'var(--cobalt-soft)', fg: 'var(--cobalt)', icon: '→' }
}

export function CareerHub() {
  const navigate = useNavigate()
  const { language } = useSettingsStore()
  const lang = (language as 'ru' | 'es') ?? 'ru'
  const copy = COPY[lang]

  const { currentLevel, levels, paywallActive, lastLevelUp, dismissLevelUp } = useCareerStore()
  const activeLevel = currentLevel
  const level: CareerLevel = levels[activeLevel] ?? {
    reading: { status: 'available', score: 0, attempts: 0, consumed: [] },
    vocab: { status: 'available', score: 0, attempts: 0, consumed: [] },
    grammar: { status: 'available', score: 0, attempts: 0, consumed: [] },
    exam: { status: 'available', score: 0, attempts: 0, consumed: [] },
  }
  const examUnlocked = isExamUnlocked(level)
  const content = getLevel(activeLevel)

  useEffect(() => {
    if (lastLevelUp != null) {
      const t = setTimeout(dismissLevelUp, 4500)
      return () => clearTimeout(t)
    }
  }, [lastLevelUp, dismissLevelUp])

  const passedCount = PHASE_ORDER.filter(p => level[p].status === 'passed').length

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px 80px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, marginTop: 20 }}>
          {/* Sidebar */}
          <aside style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 20, border: '1px solid var(--rule)', position: 'sticky', top: 20, alignSelf: 'start' }}>
            <div className="dele-pixel" style={{ fontSize: 9, color: 'var(--coral)', letterSpacing: '.2em', marginBottom: 10 }}>◆ {copy.career}</div>
            <div className="dele-frau" style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)' }}>
              {copy.level} {activeLevel}
              <span style={{ fontSize: 16, color: 'var(--muted)', marginLeft: 8 }}>
                {content?.label ?? ''}
              </span>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-2)' }}>
              {copy.passed(passedCount)}
            </div>
            <div style={{ marginTop: 10, height: 8, background: 'var(--rule)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(passedCount / 4) * 100}%`, background: 'linear-gradient(90deg, var(--cobalt), var(--mint))', transition: 'width .4s' }} />
            </div>

            <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PHASE_ORDER.map(p => {
                const st = level[p]
                const locked = p === 'exam' && !examUnlocked
                const meta = PHASE_META[p]
                const b = statusBadge(st, locked, copy)
                return (
                  <button
                    key={p}
                    disabled={locked || st.status === 'exhausted'}
                    onClick={() => navigate(`/play/${p}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 12,
                      border: '1px solid var(--rule)', background: 'var(--bg-card)',
                      textAlign: 'left', cursor: locked || st.status === 'exhausted' ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.55 : 1,
                      fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{meta.icon}</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{meta.label[lang]}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: b.bg, color: b.fg }}>{b.icon} {b.label}</span>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: 20, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
              {copy.freeLevels(FREE_LEVELS)}
            </div>
          </aside>

          {/* Main */}
          <main>
            {lastLevelUp != null && (
              <div style={{ background: 'var(--mint-soft)', border: '1px solid var(--mint)', borderRadius: 16, padding: 18, marginBottom: 20 }}>
                <div className="dele-frau" style={{ fontSize: 22, fontWeight: 700, color: 'var(--mint-dark)' }}>
                  {copy.levelUp(lastLevelUp)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>
                  {paywallActive ? copy.freeDone : copy.levelUnlocked(lastLevelUp + 1)}
                </div>
              </div>
            )}

            {paywallActive && (
              <div style={{ background: 'var(--bg-card)', border: '1.5px dashed var(--rule)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 40 }}>🔒</div>
                <h2 className="dele-frau" style={{ fontSize: 28, margin: '10px 0', color: 'var(--ink)' }}>{copy.paywallTitle}</h2>
                <p style={{ color: 'var(--ink-2)', maxWidth: 420, margin: '0 auto' }}>{copy.paywallDesc}</p>
              </div>
            )}

            {!paywallActive && (
              <div>
                <h1 className="dele-frau" style={{ fontSize: 40, margin: 0, color: 'var(--ink)' }}>
                  {copy.careerTitle} <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>DELE A2</span>
                </h1>
                <p className="dele-frau" style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 560, marginTop: 8 }}>
                  {copy.careerDesc(activeLevel)}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 28 }}>
                  {PHASE_ORDER.map(p => {
                    const st = level[p]
                    const locked = p === 'exam' && !examUnlocked
                    const meta = PHASE_META[p]
                    const b = statusBadge(st, locked, copy)
                    const disabled = locked || st.status === 'exhausted'
                    return (
                      <button
                        key={p}
                        disabled={disabled}
                        onClick={() => navigate(`/play/${p}`)}
                        style={{
                          background: 'var(--bg-card)', border: `1.5px solid ${st.status === 'passed' ? 'var(--mint)' : 'var(--rule)'}`,
                          borderRadius: 20, padding: 22, textAlign: 'left',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          opacity: locked ? 0.55 : 1,
                          fontFamily: 'inherit',
                          transition: 'transform .15s, box-shadow .2s',
                          position: 'relative', overflow: 'hidden',
                        }}
                        onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'translateY(-3px)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                          <span style={{ fontSize: 28 }}>{meta.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div className="dele-frau" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{meta.label[lang]}</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{meta.desc[lang]}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: b.bg, color: b.fg }}>
                            {b.icon} {b.label}
                          </span>
                          {st.attempts > 0 && st.status !== 'passed' && (
                            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                              {copy.attempt(st.consumed.length)}
                            </span>
                          )}
                          {st.status === 'passed' && (
                            <Link to={`/play/${p}?review=1`} onClick={e => e.stopPropagation()} style={{ fontSize: 12, color: 'var(--cobalt)', textDecoration: 'none', fontWeight: 600 }}>
                              {copy.review}
                            </Link>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
