import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCareerStore, pickNextVariant, type PhaseKey, thresholdFor } from '../../stores/careerStore'
import { useSettingsStore } from '../../stores/settingsStore'
import { getLevel, type Question } from '../../data/career'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function gradeAnswer(q: Question, userAnswer: string | undefined): boolean {
  if (!userAnswer) return false
  return normalize(userAnswer) === normalize(q.answer)
}

type PhaseParam = 'reading' | 'vocab' | 'grammar' | 'exam'

const PHASE_LABEL: Record<PhaseParam, { ru: string; es: string }> = {
  reading: { ru: 'Чтение', es: 'Lectura' },
  vocab:   { ru: 'Лексика', es: 'Vocabulario' },
  grammar: { ru: 'Грамматика', es: 'Gramática' },
  exam:    { ru: 'Экзамен', es: 'Examen' },
}

const COPY = {
  ru: {
    unknownPhase: 'Неизвестный этап.',
    back: '← Назад',
    exhausted: (label: string) => `Вы использовали все 3 попытки для этапа «${label}»`,
    exhaustedSub: 'Разблокируйте больше упражнений с ИИ — скоро.',
    noContent: 'Материал в разработке',
    noContentSub: 'У этого упражнения пока нет вопросов.',
    backToHub: '← К карьере',
    review: 'ПРОСМОТР',
    passed: 'СДАНО',
    failed: 'НЕ СДАНО',
    minScore: (threshold: number) => `мин. ${threshold}% для зачёта`,
    levelUp: (levelUpAgain?: boolean) => `🎉 Уровень завершён! ${levelUpAgain ? '' : 'Следующий разблокирован.'}`,
    attemptsExhausted: '⚠ Вы использовали все 3 попытки этого этапа.',
    answers: 'Ответы',
    question: (n: number) => `Вопрос ${n}`,
    yourAnswer: 'Ваш ответ',
    correct: 'Правильный ответ',
    retry: 'Повторить с другим упражнением',
    hub: '← К карьере',
    exit: '← Выйти',
    placeholder: 'Введите ответ',
    submit: 'Отправить ответы →',
  },
  es: {
    unknownPhase: 'Fase desconocida.',
    back: '← Volver',
    exhausted: (label: string) => `Has agotado los 3 intentos de ${label.toLowerCase()} para este nivel`,
    exhaustedSub: 'Desbloquea más ejercicios con IA — próximamente.',
    noContent: 'Contenido en preparación',
    noContentSub: 'Este ejercicio aún no tiene preguntas.',
    backToHub: '← Volver al hub',
    review: 'REVISIÓN',
    passed: 'APROBADO',
    failed: 'NO APROBADO',
    minScore: (threshold: number) => `mín ${threshold}% para aprobar`,
    levelUp: (levelUpAgain?: boolean) => `🎉 ¡Nivel completado! ${levelUpAgain ? '' : 'Se desbloqueó el siguiente.'}`,
    attemptsExhausted: '⚠ Has usado los 3 intentos de esta fase.',
    answers: 'Respuestas',
    question: (n: number) => `Pregunta ${n}`,
    yourAnswer: 'Tu respuesta',
    correct: 'Correcta',
    retry: 'Reintentar con otro ejercicio',
    hub: '← Hub',
    exit: '← Salir',
    placeholder: 'Escribe tu respuesta',
    submit: 'Enviar respuestas →',
  },
}

export function PhaseRunner() {
  const { phase } = useParams<{ phase: string }>()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const isReview = params.get('review') === '1'
  const { language } = useSettingsStore()
  const lang = (language as 'ru' | 'es') ?? 'ru'
  const copy = COPY[lang]

  const { currentLevel, levels, recordAttempt } = useCareerStore()
  const phaseKey = phase as PhaseParam
  const content = getLevel(currentLevel)
  const levelState = levels[currentLevel]

  if (!content || !levelState || !['reading', 'vocab', 'grammar', 'exam'].includes(phaseKey)) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>{copy.unknownPhase}</p>
        <Link to="/play">{copy.back}</Link>
      </div>
    )
  }

  const phaseLabel = PHASE_LABEL[phaseKey][lang]
  const phaseState = levelState[phaseKey as PhaseKey]
  const reviewingVariant = isReview && phaseState.lastVariantIdx != null ? phaseState.lastVariantIdx : null
  const variantIdx = reviewingVariant ?? (phaseKey === 'exam' ? 0 : pickNextVariant(phaseState))

  if (variantIdx === -1) {
    return (
      <div style={{ minHeight: '100vh', padding: 40, background: 'var(--bg)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 20, padding: 32, textAlign: 'center', border: '1.5px dashed var(--rule)' }}>
          <div style={{ fontSize: 40 }}>⚠</div>
          <h2 className="dele-frau" style={{ marginTop: 8, color: 'var(--ink)' }}>{copy.exhausted(phaseLabel)}</h2>
          <p style={{ color: 'var(--ink-2)' }}>{copy.exhaustedSub}</p>
          <Link to="/play" className="dele-btn dele-btn-primary" style={{ marginTop: 14 }}>{copy.back}</Link>
        </div>
      </div>
    )
  }

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
      <div style={{ minHeight: '100vh', padding: 40, background: 'var(--bg)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
          <h2 className="dele-frau" style={{ color: 'var(--ink)' }}>{copy.noContent}</h2>
          <p style={{ color: 'var(--ink-2)' }}>{copy.noContentSub}</p>
          <Link to="/play" className="dele-btn dele-btn-primary" style={{ marginTop: 14 }}>{copy.back}</Link>
        </div>
      </div>
    )
  }

  return (
    <Runner
      phase={phaseKey}
      phaseLabel={phaseLabel}
      variantIdx={variantIdx}
      questions={questions}
      passageTitle={passageTitle}
      passage={passage}
      isReview={isReview}
      reviewAnswers={isReview ? phaseState.lastAnswers ?? {} : undefined}
      copy={copy}
      onSubmit={(answers, score) => recordAttempt(currentLevel, phaseKey, variantIdx, score, answers)}
      onExit={() => navigate('/play')}
    />
  )
}

interface RunnerProps {
  phase: PhaseParam
  phaseLabel: string
  variantIdx: number
  questions: Question[]
  passageTitle: string
  passage: string
  isReview: boolean
  reviewAnswers?: Record<number, string>
  copy: typeof COPY['ru']
  onSubmit: (answers: Record<number, string>, score: number) => { passed: boolean; levelUp: boolean; exhausted: boolean }
  onExit: () => void
}

function Runner(props: RunnerProps) {
  const { phase, phaseLabel, questions, passageTitle, passage, isReview, reviewAnswers, copy, onSubmit, onExit } = props
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

  if (submitted || isReview) {
    const score = submitted
      ? submitted.score
      : Math.round((questions.reduce((acc, q, i) => acc + (gradeAnswer(q, answers[i]) ? 1 : 0), 0) / questions.length) * 100)
    const passed = submitted?.passed ?? score >= threshold
    return (
      <div style={{ minHeight: '100vh', padding: '32px 24px 80px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <button onClick={onExit} style={{ background: 'none', border: 0, color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
            {copy.backToHub}
          </button>

          <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 28, border: `1.5px solid ${passed ? 'var(--mint)' : 'var(--coral)'}` }}>
            <div className="dele-pixel" style={{ fontSize: 10, color: passed ? 'var(--mint-dark)' : 'var(--coral-dark)', letterSpacing: '.2em' }}>
              ◆ {isReview ? copy.review : passed ? copy.passed : copy.failed}
            </div>
            <div className="dele-frau" style={{ fontSize: 48, fontWeight: 700, margin: '6px 0', color: 'var(--ink)' }}>{score}%</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>
              {phaseLabel} · {copy.minScore(threshold)}
            </div>

            {submitted?.levelUp && (
              <div style={{ marginTop: 14, padding: 12, background: 'var(--sun-soft)', borderRadius: 12, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                {copy.levelUp(submitted.exhausted)}
              </div>
            )}
            {submitted?.exhausted && (
              <div style={{ marginTop: 14, padding: 12, background: '#f3e8ff', borderRadius: 12, fontSize: 13, color: '#7e22ce' }}>
                {copy.attemptsExhausted}
              </div>
            )}
          </div>

          <h3 className="dele-frau" style={{ marginTop: 28, fontSize: 22, color: 'var(--ink)' }}>{copy.answers}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
            {questions.map((q, i) => {
              const userAns = answers[i] ?? '—'
              const ok = gradeAnswer(q, answers[i])
              return (
                <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 16, border: `1px solid ${ok ? 'var(--mint)' : 'var(--coral)'}` }}>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{copy.question(i + 1)}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: '4px 0 8px' }}>{q.prompt}</div>
                  <div style={{ fontSize: 13, color: ok ? 'var(--mint-dark)' : 'var(--coral-dark)' }}>
                    {copy.yourAnswer}: <strong>{userAns}</strong> {ok ? '✓' : '✗'}
                  </div>
                  {!ok && (
                    <div style={{ fontSize: 13, color: 'var(--mint-dark)' }}>{copy.correct}: <strong>{q.answer}</strong></div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={onExit} className="dele-btn dele-btn-primary">{copy.hub}</button>
            {submitted && !submitted.passed && !submitted.exhausted && (
              <button
                onClick={() => { setSubmitted(null); setAnswers({}) }}
                className="dele-btn dele-btn-coral"
              >
                {copy.retry}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px 80px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button onClick={onExit} style={{ background: 'none', border: 0, color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
          {copy.exit}
        </button>

        <div className="dele-pixel" style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '.2em' }}>◆ {phaseLabel.toUpperCase()}</div>
        <h1 className="dele-frau" style={{ fontSize: 34, fontWeight: 700, margin: '4px 0 20px', color: 'var(--ink)' }}>
          {phase === 'reading' ? passageTitle : phaseLabel}
        </h1>

        {phase === 'reading' && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid var(--rule)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink)' }}>
            {passage}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map((q, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 18, border: '1px solid var(--rule)' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.05em' }}>{copy.question(i + 1).toUpperCase()} / {questions.length}</div>
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
                          background: selected ? 'var(--cobalt-soft)' : 'var(--bg-card)',
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
                  placeholder={copy.placeholder}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--rule)', fontSize: 15, fontFamily: 'inherit', background: 'var(--bg-card)', color: 'var(--ink)' }}
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
          {copy.submit}
        </button>
      </div>
    </div>
  )
}
