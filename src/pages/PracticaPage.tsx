import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
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

// --- Grammar exercise ---
function GrammarExercise({ lang }: { lang: string }) {
  const { t } = useTranslation()
  const [question, setQuestion] = useState<GrammarQuestion>(() =>
    pickRandom(grammarData as GrammarQuestion[])
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [inputVal, setInputVal] = useState('')
  const [revealed, setRevealed] = useState(false)

  const isMultipleChoice = question.type === 'multiple_choice'
  const correctOption = isMultipleChoice
    ? question.options?.find((o) => o.correct)?.text
    : question.answer

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
  const isCorrect = isMultipleChoice
    ? selected === correctOption
    : inputVal.trim().toLowerCase() === (correctOption ?? '').toLowerCase()

  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{instruction}</p>
      <p className="text-lg font-medium text-gray-900">
        {question.sentence.replace('____', isMultipleChoice ? '____' : '_____')}
      </p>

      {isMultipleChoice ? (
        <div className="grid gap-2">
          {question.options?.map((opt) => {
            let cls =
              'rounded-xl border px-4 py-3 text-left text-sm transition-all cursor-pointer '
            if (!revealed) {
              cls +=
                selected === opt.text
                  ? 'border-amber-400 bg-amber-50 text-amber-800'
                  : 'border-gray-100 hover:border-amber-200 hover:bg-amber-50'
            } else {
              if (opt.correct) cls += 'border-green-400 bg-green-50 text-green-800 font-semibold'
              else if (selected === opt.text && !opt.correct)
                cls += 'border-red-300 bg-red-50 text-red-700'
              else cls += 'border-gray-100 text-gray-400'
            }
            return (
              <button
                key={opt.text}
                disabled={revealed}
                onClick={() => setSelected(opt.text)}
                className={cls}
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
          placeholder="Escribe tu respuesta..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-amber-400 focus:outline-none"
        />
      )}

      {revealed && (
        <div
          className={`rounded-xl p-4 text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          <p className="mb-1 font-semibold">
            {isCorrect ? t('practica.correct') : `${t('practica.incorrect')} → ${correctOption}`}
          </p>
          <p className="text-xs opacity-80">{explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!revealed && (
          <button
            onClick={check}
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Comprobar
          </button>
        )}
        <button
          onClick={next}
          className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          {t('practica.new_exercise')}
        </button>
      </div>
    </div>
  )
}

// --- Reading exercise ---
function ReadingExercise({ lang }: { lang: string }) {
  const { t } = useTranslation()
  const [passage, setPassage] = useState<ReadingPassage>(() =>
    pickRandom(readingData as ReadingPassage[])
  )
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
    <div className="space-y-5">
      <div className="rounded-2xl bg-gray-50 p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {lang === 'ru' ? passage.title_ru : passage.title_es}
        </p>
        {passage.text}
      </div>

      <div>
        <p className="mb-1 text-xs text-gray-400">
          Pregunta {qIndex + 1} / {passage.questions.length}
        </p>
        <p className="font-medium text-gray-900">{question.text}</p>
      </div>

      <div className="grid gap-2">
        {question.options.map((opt, i) => {
          let cls = 'rounded-xl border px-4 py-3 text-left text-sm transition-all cursor-pointer '
          if (!revealed) {
            cls +=
              selected === i
                ? 'border-amber-400 bg-amber-50 text-amber-800'
                : 'border-gray-100 hover:border-amber-200 hover:bg-amber-50'
          } else {
            if (i === question.correct)
              cls += 'border-green-400 bg-green-50 text-green-800 font-semibold'
            else if (i === selected && i !== question.correct)
              cls += 'border-red-300 bg-red-50 text-red-700'
            else cls += 'border-gray-100 text-gray-400'
          }
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={cls}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div
          className={`rounded-xl p-4 text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          <p className="mb-1 font-semibold">
            {isCorrect ? t('practica.correct') : t('practica.incorrect')}
          </p>
          <p className="text-xs opacity-80">{explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!revealed && selected !== null && (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Comprobar
          </button>
        )}
        {revealed && (
          <button
            onClick={nextQuestion}
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            {qIndex < passage.questions.length - 1 ? 'Siguiente pregunta' : t('practica.new_exercise')}
          </button>
        )}
      </div>
    </div>
  )
}

// --- Vocabulary exercise ---
function VocabularyExercise() {
  const { t } = useTranslation()
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
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        ¿Cómo se traduce esta palabra?
      </p>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
        <p className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
          {state.word.word_es}
        </p>
        <p className="mt-2 text-sm italic text-gray-400">{state.word.example_es}</p>
      </div>

      <div className="grid gap-2">
        {state.options.map((opt, i) => {
          let cls = 'rounded-xl border px-4 py-3 text-left text-sm transition-all cursor-pointer '
          if (!revealed) {
            cls +=
              selected === i
                ? 'border-amber-400 bg-amber-50 text-amber-800'
                : 'border-gray-100 hover:border-amber-200 hover:bg-amber-50'
          } else {
            if (i === state.correct)
              cls += 'border-green-400 bg-green-50 text-green-800 font-semibold'
            else if (i === selected && i !== state.correct)
              cls += 'border-red-300 bg-red-50 text-red-700'
            else cls += 'border-gray-100 text-gray-400'
          }
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={cls}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div
          className={`rounded-xl p-4 text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          <p className="font-semibold">
            {isCorrect ? t('practica.correct') : `${t('practica.incorrect')} → ${state.word.translation_ru}`}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!revealed && selected !== null && (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Comprobar
          </button>
        )}
        <button
          onClick={next}
          className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          {t('practica.new_exercise')}
        </button>
      </div>
    </div>
  )
}

// --- Main page ---
export function PracticaPage() {
  const { t, i18n } = useTranslation()
  const [tab, setTab] = useState<Tab>('grammar')
  const lang = i18n.language

  const tabs: { key: Tab; label: string }[] = [
    { key: 'grammar', label: t('practica.grammar') },
    { key: 'reading', label: t('practica.reading') },
    { key: 'vocabulary', label: t('practica.vocabulary') },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
          {t('practica.title')}
        </h1>
        <p className="mt-2 text-gray-500">{t('practica.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 rounded-2xl bg-gray-100 p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition-all ${
              tab === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Exercise */}
      {tab === 'grammar' && <GrammarExercise lang={lang} />}
      {tab === 'reading' && <ReadingExercise lang={lang} />}
      {tab === 'vocabulary' && <VocabularyExercise />}
    </div>
  )
}
