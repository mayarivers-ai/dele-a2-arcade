import { useState, useCallback } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import grammarData from '../data/grammar.json'
import readingData from '../data/reading.json'
import vocabularyData from '../data/vocabulary.json'

type Tab = 'grammar' | 'reading' | 'vocabulary'

interface GrammarQuestion {
  id: string
  type: string
  topic: string
  instruction_es: string
  instruction_ru: string
  sentence: string
  options?: { text: string; correct: boolean }[]
  answer?: string
  explanation_es: string
  explanation_ru: string
}

interface ReadingPassage {
  id: string
  title_es: string
  title_ru: string
  text: string
  questions: {
    id: string
    text: string
    options: string[]
    correct: number
    explanation_es: string
    explanation_ru: string
  }[]
}

interface VocabWord {
  id: string
  field: string
  word_es: string
  translation_ru: string
  example_es: string
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildVocabQuestion(word: VocabWord, allWords: VocabWord[]) {
  const distractors = allWords
    .filter((w) => w.id !== word.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.translation_ru)
  const options = [word.translation_ru, ...distractors].sort(() => Math.random() - 0.5)
  return { word, options, correct: options.indexOf(word.translation_ru) }
}

// Shared option button style helper
function optionStyle(state: 'idle' | 'selected' | 'correct' | 'wrong'): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'block', width: '100%', borderRadius: 12,
    border: '1.5px solid', padding: '12px 16px', textAlign: 'left',
    fontSize: 14, cursor: 'pointer', transition: 'all .15s',
    fontFamily: 'inherit', background: 'var(--bg-card)',
  }
  if (state === 'idle') return { ...base, borderColor: 'var(--rule)', color: 'var(--ink)' }
  if (state === 'selected') return { ...base, borderColor: 'var(--cobalt)', background: 'var(--cobalt-soft)', color: 'var(--cobalt)' }
  if (state === 'correct') return { ...base, borderColor: 'var(--mint-dark)', background: 'var(--mint-soft)', color: 'var(--mint-dark)', fontWeight: 700 }
  return { ...base, borderColor: 'var(--coral-dark)', background: 'var(--coral-soft)', color: 'var(--coral-dark)' }
}

// --- Grammar exercise ---
function GrammarExercise({ lang }: { lang: string }) {
  const [question, setQuestion] = useState<GrammarQuestion>(() => pickRandom(grammarData as GrammarQuestion[]))
  const [selected, setSelected] = useState<string | null>(null)
  const [inputVal, setInputVal] = useState('')
  const [revealed, setRevealed] = useState(false)

  const isMultipleChoice = question.type === 'multiple_choice'
  const correctOption = isMultipleChoice ? question.options?.find((o) => o.correct)?.text : question.answer
  const isCorrect = isMultipleChoice
    ? selected === correctOption
    : inputVal.trim().toLowerCase() === (correctOption ?? '').toLowerCase()

  const next = useCallback(() => {
    setQuestion(pickRandom(grammarData as GrammarQuestion[]))
    setSelected(null)
    setInputVal('')
    setRevealed(false)
  }, [])

  const check = () => {
    if (isMultipleChoice && !selected) return
    setRevealed(true)
  }

  const instruction = lang === 'ru' ? question.instruction_ru : question.instruction_es
  const explanation = lang === 'ru' ? question.explanation_ru : question.explanation_es

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.12em' }}>{instruction}</p>
      <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
        {question.sentence.replace('____', isMultipleChoice ? '____' : '_____')}
      </p>

      {isMultipleChoice ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {question.options?.map((opt) => {
            let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle'
            if (revealed) {
              if (opt.correct) state = 'correct'
              else if (selected === opt.text) state = 'wrong'
            } else if (selected === opt.text) state = 'selected'
            return (
              <button
                key={opt.text}
                disabled={revealed}
                onClick={() => setSelected(opt.text)}
                style={optionStyle(state)}
              >
                {opt.text}
              </button>
            )
          })}
        </div>
      ) : (
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={revealed}
          placeholder={lang === 'ru' ? 'Введите ответ...' : 'Escribe tu respuesta...'}
          style={{
            borderRadius: 12, border: '1.5px solid var(--rule)',
            padding: '12px 16px', fontSize: 14, color: 'var(--ink)',
            background: 'var(--bg)', outline: 'none', fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--cobalt)'}
          onBlur={e => e.target.style.borderColor = 'var(--rule)'}
        />
      )}

      {revealed && (
        <div style={{
          borderRadius: 12, padding: '16px',
          background: isCorrect ? 'var(--mint-soft)' : 'var(--coral-soft)',
          border: `1px solid ${isCorrect ? 'var(--mint)' : 'var(--coral)'}`,
        }}>
          <p style={{ fontWeight: 700, color: isCorrect ? 'var(--mint-dark)' : 'var(--coral-dark)', marginBottom: 4 }}>
            {isCorrect ? (lang === 'ru' ? '✓ Верно!' : '✓ Correcto') : `✗ ${lang === 'ru' ? 'Неверно' : 'Incorrecto'} → ${correctOption}`}
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.85 }}>{explanation}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        {!revealed && (
          <button onClick={check} className="dele-btn dele-btn-primary" style={{ padding: '10px 22px', fontSize: 13, boxShadow: '0 3px 0 var(--cobalt-dark)' }}>
            {lang === 'ru' ? 'Проверить' : 'Comprobar'}
          </button>
        )}
        <button onClick={next} className="dele-btn dele-btn-ghost" style={{ padding: '10px 22px', fontSize: 13 }}>
          {lang === 'ru' ? 'Следующий' : 'Nueva pregunta'}
        </button>
      </div>
    </div>
  )
}

// --- Reading exercise ---
function ReadingExercise({ lang }: { lang: string }) {
  const [passage, setPassage] = useState<ReadingPassage>(() => pickRandom(readingData as ReadingPassage[]))
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const question = passage.questions[qIndex]
  const isCorrect = selected === question.correct
  const explanation = lang === 'ru' ? question.explanation_ru : question.explanation_es

  const nextQuestion = () => {
    if (qIndex < passage.questions.length - 1) {
      setQIndex((i) => i + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      setPassage(pickRandom(readingData as ReadingPassage[]))
      setQIndex(0)
      setSelected(null)
      setRevealed(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--rule)', padding: '20px 24px' }}>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.12em', marginBottom: 12 }}>
          {lang === 'ru' ? passage.title_ru : passage.title_es}
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
          {passage.text}
        </p>
      </div>

      <div>
        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>
          {lang === 'ru' ? 'Вопрос' : 'Pregunta'} {qIndex + 1} / {passage.questions.length}
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{question.text}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {question.options.map((opt, i) => {
          let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle'
          if (revealed) {
            if (i === question.correct) state = 'correct'
            else if (i === selected) state = 'wrong'
          } else if (i === selected) state = 'selected'
          return (
            <button key={i} disabled={revealed} onClick={() => setSelected(i)} style={optionStyle(state)}>
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div style={{
          borderRadius: 12, padding: '16px',
          background: isCorrect ? 'var(--mint-soft)' : 'var(--coral-soft)',
          border: `1px solid ${isCorrect ? 'var(--mint)' : 'var(--coral)'}`,
        }}>
          <p style={{ fontWeight: 700, color: isCorrect ? 'var(--mint-dark)' : 'var(--coral-dark)', marginBottom: 4 }}>
            {isCorrect ? (lang === 'ru' ? '✓ Верно!' : '✓ Correcto') : (lang === 'ru' ? '✗ Неверно' : '✗ Incorrecto')}
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.85 }}>{explanation}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        {!revealed && selected !== null && (
          <button onClick={() => setRevealed(true)} className="dele-btn dele-btn-primary" style={{ padding: '10px 22px', fontSize: 13, boxShadow: '0 3px 0 var(--cobalt-dark)' }}>
            {lang === 'ru' ? 'Проверить' : 'Comprobar'}
          </button>
        )}
        {revealed && (
          <button onClick={nextQuestion} className="dele-btn dele-btn-coral" style={{ padding: '10px 22px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}>
            {qIndex < passage.questions.length - 1
              ? (lang === 'ru' ? 'Следующий вопрос' : 'Siguiente pregunta')
              : (lang === 'ru' ? 'Новый текст' : 'Nuevo texto')}
          </button>
        )}
      </div>
    </div>
  )
}

// --- Vocabulary exercise ---
function VocabularyExercise({ lang }: { lang: string }) {
  const allWords = vocabularyData as VocabWord[]
  const [state, setState] = useState(() => buildVocabQuestion(pickRandom(allWords), allWords))
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const isCorrect = selected === state.correct

  const next = useCallback(() => {
    setState(buildVocabQuestion(pickRandom(allWords), allWords))
    setSelected(null)
    setRevealed(false)
  }, [allWords])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.12em' }}>
        {lang === 'ru' ? 'КАК ПЕРЕВОДИТСЯ?' : '¿CÓMO SE TRADUCE?'}
      </p>

      <div style={{
        borderRadius: 16, border: '1px solid var(--rule)',
        background: 'var(--bg-card)', padding: '32px 24px', textAlign: 'center',
        boxShadow: '0 2px 12px rgba(46,75,206,.06)',
      }}>
        <p className="dele-frau" style={{ fontSize: 40, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
          {state.word.word_es}
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', margin: 0 }}>
          {state.word.example_es}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {state.options.map((opt, i) => {
          let st: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle'
          if (revealed) {
            if (i === state.correct) st = 'correct'
            else if (i === selected) st = 'wrong'
          } else if (i === selected) st = 'selected'
          return (
            <button key={i} disabled={revealed} onClick={() => setSelected(i)} style={optionStyle(st)}>
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div style={{
          borderRadius: 12, padding: '14px 16px',
          background: isCorrect ? 'var(--mint-soft)' : 'var(--coral-soft)',
          border: `1px solid ${isCorrect ? 'var(--mint)' : 'var(--coral)'}`,
        }}>
          <p style={{ fontWeight: 700, color: isCorrect ? 'var(--mint-dark)' : 'var(--coral-dark)', margin: 0 }}>
            {isCorrect
              ? (lang === 'ru' ? '✓ Верно!' : '✓ Correcto')
              : `✗ ${lang === 'ru' ? 'Неверно' : 'Incorrecto'} → ${state.word.translation_ru}`}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        {!revealed && selected !== null && (
          <button onClick={() => setRevealed(true)} className="dele-btn dele-btn-primary" style={{ padding: '10px 22px', fontSize: 13, boxShadow: '0 3px 0 var(--cobalt-dark)' }}>
            {lang === 'ru' ? 'Проверить' : 'Comprobar'}
          </button>
        )}
        <button onClick={next} className="dele-btn dele-btn-ghost" style={{ padding: '10px 22px', fontSize: 13 }}>
          {lang === 'ru' ? 'Следующее' : 'Nueva palabra'}
        </button>
      </div>
    </div>
  )
}

// --- Main page ---
export function PracticaPage() {
  const { language } = useSettingsStore()
  const lang = language ?? 'ru'
  const [tab, setTab] = useState<Tab>('grammar')

  const tabs: { key: Tab; label_ru: string; label_es: string }[] = [
    { key: 'grammar', label_ru: 'Грамматика', label_es: 'Gramática' },
    { key: 'reading', label_ru: 'Чтение', label_es: 'Lectura' },
    { key: 'vocabulary', label_ru: 'Словарь', label_es: 'Vocabulario' },
  ]

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 32px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p className="dele-pixel" style={{ fontSize: 8, color: 'var(--cobalt)', letterSpacing: '.12em', marginBottom: 10 }}>
          {lang === 'ru' ? 'СВОБОДНАЯ ПРАКТИКА' : 'PRÁCTICA LIBRE'}
        </p>
        <h1 className="dele-frau" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--ink)', margin: 0, lineHeight: 1 }}>
          {lang === 'ru' ? 'Практика' : 'Practica'}
        </h1>
        <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 14 }}>
          {lang === 'ru' ? 'Случайные упражнения без прогрессии' : 'Ejercicios aleatorios sin progresión'}
        </p>
      </div>

      {/* Tab selector */}
      <div style={{
        display: 'flex', gap: 4, padding: 4,
        background: 'rgba(46,75,206,.06)', borderRadius: 14,
        marginBottom: 32, border: '1px solid var(--rule)',
      }}>
        {tabs.map(({ key, label_ru, label_es }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1, borderRadius: 10, padding: '9px 12px',
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all .2s',
              background: tab === key ? 'var(--bg-card)' : 'transparent',
              color: tab === key ? 'var(--cobalt)' : 'var(--muted)',
              boxShadow: tab === key ? '0 1px 6px rgba(46,75,206,.1)' : 'none',
            }}
          >
            {lang === 'ru' ? label_ru : label_es}
          </button>
        ))}
      </div>

      {/* Exercise */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--rule)', padding: '28px 28px 24px', boxShadow: '0 2px 16px rgba(46,75,206,.06)' }}>
        {tab === 'grammar' && <GrammarExercise lang={lang} />}
        {tab === 'reading' && <ReadingExercise lang={lang} />}
        {tab === 'vocabulary' && <VocabularyExercise lang={lang} />}
      </div>
    </div>
  )
}
