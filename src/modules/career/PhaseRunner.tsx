import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCareerStore, pickNextVariant, type PhaseKey, thresholdFor } from '../../stores/careerStore'
import { getLevel, type Question } from '../../data/career'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function gradeAnswer(q: Question, userAnswer: string | undefined): boolean {
  if (!userAnswer) return false
  return normalize(userAnswer) === normalize(q.answer)
}

type PhaseParam = 'reading' | 'vocab' | 'grammar' | 'exam'
const PHASE_LABEL: Record<PhaseParam, string> = {
  reading: 'Lectura',
  vocab: 'Vocabulario',
  grammar: 'Gramática',
  exam: 'Examen',
}

export function PhaseRunner() {
  const { phase } = useParams<{ phase: string }>()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const isReview = params.get('review') === '1'

  const { currentLevel, levels, recordAttempt } = useCareerStore()
  const phaseKey = phase as PhaseParam
  const content = getLevel(currentLevel)
  const levelState = levels[currentLevel]

  if (!content || !levelState || !['reading', 'vocab', 'grammar', 'exam'].includes(phaseKey)) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Fase desconocida.</p>
        <Link to="/play">← Volver</Link>
      </div>
    )
  }

  // Pick variant
  const phaseState = levelState[phaseKey as PhaseKey]
  const reviewingVariant = isReview && phaseState.lastVariantIdx != null ? phaseState.lastVariantIdx : null
  const variantIdx = reviewingVariant ?? (phaseKey === 'exam' ? 0 : pickNextVariant(phaseState))

  // Exhausted pool
  if (variantIdx === -1) {
    return (
      <div className="dele-landing" style={{ minHeight: '100vh', padding: 40 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'white', borderRadius: 20, padding: 32, textAlign: 'center', border: '1.5px dashed var(--rule)' }}>
          <div style={{ fontSize: 40 }}>⚠</div>
          <h2 className="dele-frau" style={{ marginTop: 8 }}>Has agotado los 3 intentos de {PHASE_LABEL[phaseKey].toLowerCase()} para este nivel</h2>
          <p style={{ color: 'var(--ink-2)' }}>Desbloquea más ejercicios con IA — <em>próximamente.</em></p>
          <Link to="/play" className="dele-btn dele-btn-primary" style={{ marginTop: 14 }}>← Volver</Link>
        </div>
      </div>
    )
  }

  // Load questions
  let questions: Question[] = []
  let passageTitle = ''
  let passage = ''
  if (phaseKey === 'reading') {
    const v = content.reading[variantIdx]
    questions = v?.questions ?? []
    passageTitle = v?.title ?? ''
    passage = v?.passage ?? ''
  } else if (phaseKey === 'vocab') {
    questions = content.vocab[variantIdx]?.questions ?? []
  } else if (phaseKey === 'grammar') {
    questions = content.grammar[variantIdx]?.questions ?? []
  } else {
    questions = content.exam.questions
  }

  if (questions.length === 0) {
    return (
      <div className="dele-landing" style={{ minHeight: '100vh', padding: 40 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'white', borderRadius: 20, padding: 32, textAlign: 'center' }}>
          <h2 className="dele-frau">Contenido en preparación</h2>
          <p style={{ color: 'var(--ink-2)' }}>Este ejercicio aún no tiene preguntas.</p>
          <Link to="/play" className="dele-btn dele-btn-primary" style={{ marginTop: 14 }}>← Volver</Link>
        </div>
      </div>
    )
  }

  return (
    <Runner
      phase={phaseKey}
      variantIdx={variantIdx}
      questions={questions}
      passageTitle={passageTitle}
      passage={passage}
      isReview={isReview}
      reviewAnswers={isReview ? phaseState.lastAnswers ?? {} : undefined}
      onSubmit={(answers, score) => recordAttempt(currentLevel, phaseKey, variantIdx, score, answers)}
      onExit={() => navigate('/play')}
    />
  )
}

interface RunnerProps {
  phase: PhaseParam
  variantIdx: number
  questions: Question[]
  passageTitle: string
  passage: string
  isReview: boolean
  reviewAnswers?: Record<number, string>
  onSubmit: (answers: Record<number, string>, score: number) => { passed: boolean; levelUp: boolean; exhausted: boolean }
  onExit: () => void
}

function Runner(props: RunnerProps) {
  const { phase, questions, passageTitle, passage, isReview, reviewAnswers, onSubmit, onExit } = props
  const [answers, setAnswers] = useState<Record<number, string>>(reviewAnswers ?? {})
  const [submitted, setSubmitted] = useState<{ score: number; passed: boolean; levelUp: boolean; exhausted: boolean } | null>(null)

  const canSubmit = !isReview && questions.every((_, i) => (answers[i] ?? '').trim().length > 0)

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q, i) => { if (gradeAnswer(q, answers[i])) correct++ })
    const score = Math.round((correct / questions.length) * 100)
    const res = onSubmit(answers, score)
    setSubmitted({ score, passed: res.passed, levelUp: res.levelUp, exhausted: res.exhausted })
  }

  const threshold = thresholdFor(phase as PhaseKey)

  // Results view
  if (submitted || isReview) {
    const score = submitted
      ? submitted.score
      : Math.round((questions.reduce((acc, q, i) => acc + (gradeAnswer(q, answers[i]) ? 1 : 0), 0) / questions.length) * 100)
    const passed = submitted?.passed ?? score >= threshold
    return (
      <div className="dele-landing" style={{ minHeight: '100vh', padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <button onClick={onExit} style={{ background: 'none', border: 0, color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
            ← Volver al hub
          </button>

          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: `1.5px solid ${passed ? 'var(--mint)' : 'var(--coral)'}` }}>
            <div className="dele-pixel" style={{ fontSize: 10, color: passed ? 'var(--mint-dark)' : 'var(--coral-dark)', letterSpacing: '.2em' }}>
              ◆ {isReview ? 'REVISIÓN' : passed ? 'APROBADO' : 'NO APROBADO'}
            </div>
            <div className="dele-frau" style={{ fontSize: 48, fontWeight: 700, margin: '6px 0' }}>{score}%</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>
              {PHASE_LABEL[phase]} · mín {threshold}% para aprobar
            </div>

            {submitted?.levelUp && (
              <div style={{ marginTop: 14, padding: 12, background: 'var(--sun-soft)', borderRadius: 12, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                🎉 ¡Nivel completado! {submitted.exhausted ? '' : 'Se desbloqueó el siguiente.'}
              </div>
            )}
            {submitted?.exhausted && (
              <div style={{ marginTop: 14, padding: 12, background: '#f3e8ff', borderRadius: 12, fontSize: 13, color: '#7e22ce' }}>
                ⚠ Has usado los 3 intentos de esta fase.
              </div>
            )}
          </div>

          <h3 className="dele-frau" style={{ marginTop: 28, fontSize: 22 }}>Respuestas</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
            {questions.map((q, i) => {
              const userAns = answers[i] ?? '—'
              const ok = gradeAnswer(q, answers[i])
              return (
                <div key={i} style={{ background: 'white', borderRadius: 14, padding: 16, border: `1px solid ${ok ? 'var(--mint)' : 'var(--coral)'}` }}>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>Pregunta {i + 1}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: '4px 0 8px' }}>{q.prompt}</div>
                  <div style={{ fontSize: 13, color: ok ? 'var(--mint-dark)' : 'var(--coral-dark)' }}>
                    Tu respuesta: <strong>{userAns}</strong> {ok ? '✓' : '✗'}
                  </div>
                  {!ok && (
                    <div style={{ fontSize: 13, color: 'var(--mint-dark)' }}>Correcta: <strong>{q.answer}</strong></div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={onExit} className="dele-btn dele-btn-primary">← Hub</button>
            {submitted && !submitted.passed && !submitted.exhausted && (
              <button
                onClick={() => { setSubmitted(null); setAnswers({}) }}
                className="dele-btn dele-btn-coral"
              >
                Reintentar con otro ejercicio
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Active view
  return (
    <div className="dele-landing" style={{ minHeight: '100vh', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button onClick={onExit} style={{ background: 'none', border: 0, color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
          ← Salir
        </button>

        <div className="dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.2em' }}>◆ {PHASE_LABEL[phase].toUpperCase()}</div>
        <h1 className="dele-frau" style={{ fontSize: 34, fontWeight: 700, margin: '4px 0 20px' }}>
          {phase === 'reading' ? passageTitle : PHASE_LABEL[phase]}
        </h1>

        {phase === 'reading' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid var(--rule)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink)' }}>
            {passage}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map((q, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: 18, border: '1px solid var(--rule)' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.05em' }}>PREGUNTA {i + 1} / {questions.length}</div>
              <div className="dele-frau" style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink)', margin: '6px 0 12px', lineHeight: 1.4 }}>{q.prompt}</div>
              {q.options && q.options.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {q.options.map(opt => {
                    const selected = answers[i] === opt
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswers(a => ({ ...a, [i]: opt }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: `1.5px solid ${selected ? 'var(--cobalt)' : 'var(--rule)'}`,
                          background: selected ? 'var(--cobalt-soft)' : 'white',
                          color: selected ? 'var(--cobalt-dark)' : 'var(--ink)',
                          fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left',
                          fontFamily: 'inherit',
                        }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <input
                  value={answers[i] ?? ''}
                  onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                  placeholder="Escribe tu respuesta"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--rule)', fontSize: 15, fontFamily: 'inherit' }}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="dele-btn dele-btn-primary"
          style={{ marginTop: 24, width: '100%', opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
        >
          Enviar respuestas →
        </button>
      </div>
    </div>
  )
}
