import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useVocabStore } from '../../stores/vocabStore'
import { sortByPriority } from '../../lib/spaced-repetition'
import { FlashCard } from './FlashCard'
import { VocabQuiz } from './VocabQuiz'
import { VocabWrite } from './VocabWrite'
import { GameHUD } from '../../components/GameHUD'
import vocabularyData from '../../data/vocabulary.json'

type Mode = 'ver' | 'quiz' | 'escribir'

interface Word {
  id: string
  field: string
  word_es: string
  translation_ru: string
  example_es: string
}

const ALL_WORDS = vocabularyData as Word[]

const FIELDS = [
  'familia', 'vivienda', 'trabajo', 'ciudad', 'salud',
  'ocio', 'viajes', 'alimentación', 'clima', 'compras',
]

const FIELD_EMOJI: Record<string, string> = {
  familia: '👨‍👩‍👧',
  vivienda: '🏠',
  trabajo: '💼',
  ciudad: '🏙️',
  salud: '🏥',
  ocio: '🎭',
  viajes: '✈️',
  'alimentación': '🍽️',
  clima: '🌤️',
  compras: '🛍️',
}

export function VocabularyPage() {
  const { t } = useTranslation()
  const { cards, resetSession } = useVocabStore()

  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  const sessionWords = useMemo(() => {
    const pool = selectedField
      ? ALL_WORDS.filter((w) => w.field === selectedField)
      : ALL_WORDS
    return sortByPriority(pool, cards).slice(0, 20)
  }, [selectedField, cards])

  function startSession(f: string | null, m: Mode) {
    setSelectedField(f)
    setMode(m)
    setCardIndex(0)
    setSessionDone(false)
    resetSession()
  }

  function handleNext() {
    if (cardIndex + 1 >= sessionWords.length) {
      setSessionDone(true)
    } else {
      setCardIndex((i) => i + 1)
    }
  }

  function handleRestart() {
    setSelectedField(null)
    setMode(null)
    setCardIndex(0)
    setSessionDone(false)
  }

  // ── Session done ─────────────────────────────────────────────
  if (sessionDone) {
    return (
      <SessionComplete
        total={sessionWords.length}
        onRestart={handleRestart}
        onSameAgain={() => startSession(selectedField, mode!)}
      />
    )
  }

  // ── Active session ────────────────────────────────────────────
  if (mode !== null && sessionWords.length > 0) {
    const word = sessionWords[cardIndex]
    return (
      <div className="min-h-screen bg-[#F7F4EF] px-4 py-10">
        {/* Back button */}
        <button
          onClick={handleRestart}
          className="mb-8 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
        >
          ← {t('common.back')}
        </button>

        <div className="max-w-lg mx-auto">
          <GameHUD module="vocab" current={cardIndex + 1} total={sessionWords.length} />
          {mode === 'ver' && (
            <FlashCard
              word={word}
              onNext={handleNext}
              total={sessionWords.length}
              current={cardIndex + 1}
            />
          )}
          {mode === 'quiz' && (
            <VocabQuiz
              word={word}
              allWords={ALL_WORDS}
              onNext={handleNext}
              total={sessionWords.length}
              current={cardIndex + 1}
            />
          )}
          {mode === 'escribir' && (
            <VocabWrite
              word={word}
              onNext={handleNext}
              total={sessionWords.length}
              current={cardIndex + 1}
            />
          )}
        </div>
      </div>
    )
  }

  // ── Field + mode selector ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F4EF] px-4 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center">
          <div className="text-5xl mb-3">🗂</div>
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
            {t('nav.vocabulary')}
          </h1>
          <p className="mt-2 text-gray-500 text-sm">{t('vocab.subtitle')}</p>
        </div>

        {/* Field selector */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
            {t('vocab.choose_field')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* All fields option */}
            <button
              onClick={() => setSelectedField(null)}
              className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold text-left transition-all ${
                selectedField === null
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
              }`}
            >
              <span className="mr-2">🌐</span>
              {t('vocab.all_fields')}
              <span className="block text-xs font-normal text-gray-400 mt-0.5">500 {t('vocab.words')}</span>
            </button>

            {FIELDS.map((field) => {
              const count = ALL_WORDS.filter((w) => w.field === field).length
              return (
                <button
                  key={field}
                  onClick={() => setSelectedField(field)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold text-left transition-all capitalize ${
                    selectedField === field
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                  }`}
                >
                  <span className="mr-2">{FIELD_EMOJI[field] ?? '📚'}</span>
                  {field}
                  <span className="block text-xs font-normal text-gray-400 mt-0.5">{count} {t('vocab.words')}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mode selector */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
            {t('vocab.choose_mode')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ModeCard
              emoji="👁️"
              title={t('vocab.mode_ver')}
              description={t('vocab.mode_ver_desc')}
              onClick={() => startSession(selectedField, 'ver')}
            />
            <ModeCard
              emoji="🎯"
              title={t('vocab.mode_quiz')}
              description={t('vocab.mode_quiz_desc')}
              onClick={() => startSession(selectedField, 'quiz')}
            />
            <ModeCard
              emoji="✏️"
              title={t('vocab.mode_escribir')}
              description={t('vocab.mode_escribir_desc')}
              onClick={() => startSession(selectedField, 'escribir')}
            />
          </div>
        </div>

        <Link
          to="/"
          className="text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← {t('common.back_home')}
        </Link>
      </div>
    </div>
  )
}

function ModeCard({
  emoji, title, description, onClick,
}: {
  emoji: string
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border-2 border-gray-200 bg-white p-5 text-left hover:border-amber-400 hover:bg-amber-50 transition-all group"
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="font-semibold text-gray-900 group-hover:text-amber-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  )
}

function SessionComplete({
  total, onRestart, onSameAgain,
}: {
  total: number
  onRestart: () => void
  onSameAgain: () => void
}) {
  const { t } = useTranslation()
  const { sessionCorrect, sessionTotal } = useVocabStore()
  const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 100

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center px-4 gap-6 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
        {t('vocab.session_done')}
      </h1>
      <p className="text-gray-600">
        {t('vocab.reviewed')} <span className="font-bold text-amber-700">{total}</span> {t('vocab.words')}
      </p>
      {sessionTotal > 0 && (
        <p className="text-gray-600">
          {t('vocab.accuracy')}: <span className="font-bold text-amber-700">{pct}%</span>
          {' '}({sessionCorrect}/{sessionTotal})
        </p>
      )}
      <div className="flex gap-3">
        <button
          onClick={onSameAgain}
          className="rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
        >
          {t('vocab.again')}
        </button>
        <button
          onClick={onRestart}
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
        >
          {t('vocab.change_field')}
        </button>
      </div>
    </div>
  )
}
