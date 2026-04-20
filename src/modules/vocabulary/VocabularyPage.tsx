import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
  familia: '👨‍👩‍👧', vivienda: '🏠', trabajo: '💼', ciudad: '🏙️',
  salud: '🏥', ocio: '🎭', viajes: '✈️', 'alimentación': '🍽️', clima: '🌤️', compras: '🛍️',
}

export function VocabularyPage() {
  const { t } = useTranslation()
  const { cards, resetSession } = useVocabStore()

  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  const sessionWords = useMemo(() => {
    const pool = selectedField ? ALL_WORDS.filter((w) => w.field === selectedField) : ALL_WORDS
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
    if (cardIndex + 1 >= sessionWords.length) setSessionDone(true)
    else setCardIndex((i) => i + 1)
  }

  function handleRestart() {
    setSelectedField(null)
    setMode(null)
    setCardIndex(0)
    setSessionDone(false)
  }

  if (sessionDone) {
    return <SessionComplete total={sessionWords.length} onRestart={handleRestart} onSameAgain={() => startSession(selectedField, mode!)} />
  }

  if (mode !== null && sessionWords.length > 0) {
    const word = sessionWords[cardIndex]
    return (
      <div style={{ minHeight: '100svh', padding: '40px 24px' }}>
        <button onClick={handleRestart} style={{ marginBottom: 32, fontSize: 13, color: 'var(--ink-2)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
          ← {t('common.back')}
        </button>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <GameHUD module="vocab" current={cardIndex + 1} total={sessionWords.length} />
          {mode === 'ver' && <FlashCard word={word} onNext={handleNext} total={sessionWords.length} current={cardIndex + 1} />}
          {mode === 'quiz' && <VocabQuiz word={word} allWords={ALL_WORDS} onNext={handleNext} total={sessionWords.length} current={cardIndex + 1} />}
          {mode === 'escribir' && <VocabWrite word={word} onNext={handleNext} total={sessionWords.length} current={cardIndex + 1} />}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 32px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🗂</div>
        <h1 className="dele-frau" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
          {t('nav.vocabulary')}
        </h1>
        <p style={{ marginTop: 8, color: 'var(--ink-2)', fontSize: 14 }}>{t('vocab.subtitle')}</p>
      </div>

      {/* Field selector */}
      <div style={{ marginBottom: 40 }}>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.14em', marginBottom: 14 }}>
          {t('vocab.choose_field').toUpperCase()}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          <FieldButton
            label={t('vocab.all_fields')}
            emoji="🌐"
            count={ALL_WORDS.length}
            words={t('vocab.words')}
            selected={selectedField === null}
            onClick={() => setSelectedField(null)}
          />
          {FIELDS.map((field) => (
            <FieldButton
              key={field}
              label={field}
              emoji={FIELD_EMOJI[field] ?? '📚'}
              count={ALL_WORDS.filter((w) => w.field === field).length}
              words={t('vocab.words')}
              selected={selectedField === field}
              onClick={() => setSelectedField(field)}
            />
          ))}
        </div>
      </div>

      {/* Mode selector */}
      <div>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.14em', marginBottom: 14 }}>
          {t('vocab.choose_mode').toUpperCase()}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          <ModeCard emoji="👁️" title={t('vocab.mode_ver')} description={t('vocab.mode_ver_desc')} onClick={() => startSession(selectedField, 'ver')} />
          <ModeCard emoji="🎯" title={t('vocab.mode_quiz')} description={t('vocab.mode_quiz_desc')} onClick={() => startSession(selectedField, 'quiz')} />
          <ModeCard emoji="✏️" title={t('vocab.mode_escribir')} description={t('vocab.mode_escribir_desc')} onClick={() => startSession(selectedField, 'escribir')} />
        </div>
      </div>
    </div>
  )
}

function FieldButton({ label, emoji, count, words, selected, onClick }: { label: string; emoji: string; count: number; words: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 14, border: `1.5px solid ${selected ? 'var(--cobalt)' : 'var(--rule)'}`,
        background: selected ? 'var(--cobalt-soft)' : 'var(--bg-card)',
        padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
        fontFamily: 'inherit', transition: 'all .2s',
        boxShadow: selected ? '0 2px 10px rgba(46,75,206,.12)' : 'none',
      }}
    >
      <span style={{ marginRight: 6 }}>{emoji}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: selected ? 'var(--cobalt)' : 'var(--ink)', textTransform: 'capitalize' }}>{label}</span>
      <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{count} {words}</span>
    </button>
  )
}

function ModeCard({ emoji, title, description, onClick }: { emoji: string; title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 16, border: '1.5px solid var(--rule)', background: 'var(--bg-card)',
        padding: '20px 18px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        transition: 'transform .2s, box-shadow .2s, border-color .2s',
        boxShadow: '0 2px 8px rgba(46,75,206,.06)',
      }}
      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--cobalt)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(46,75,206,.12)' }}
      onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(46,75,206,.06)' }}
    >
      <div style={{ fontSize: 26, marginBottom: 10 }}>{emoji}</div>
      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px' }}>{title}</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>{description}</p>
    </button>
  )
}

function SessionComplete({ total, onRestart, onSameAgain }: { total: number; onRestart: () => void; onSameAgain: () => void }) {
  const { t } = useTranslation()
  const { sessionCorrect, sessionTotal } = useVocabStore()
  const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 100

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', gap: 20 }}>
      <div style={{ fontSize: 56 }}>🎉</div>
      <h1 className="dele-frau" style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
        {t('vocab.session_done')}
      </h1>
      <p style={{ color: 'var(--ink-2)', fontSize: 15 }}>
        {t('vocab.reviewed')} <strong style={{ color: 'var(--cobalt)' }}>{total}</strong> {t('vocab.words')}
      </p>
      {sessionTotal > 0 && (
        <p style={{ color: 'var(--ink-2)', fontSize: 15 }}>
          {t('vocab.accuracy')}: <strong style={{ color: 'var(--cobalt)' }}>{pct}%</strong>
          {' '}({sessionCorrect}/{sessionTotal})
        </p>
      )}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onSameAgain} className="dele-btn dele-btn-coral" style={{ padding: '10px 24px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}>
          {t('vocab.again')}
        </button>
        <button onClick={onRestart} className="dele-btn dele-btn-ghost" style={{ padding: '10px 24px', fontSize: 13 }}>
          {t('vocab.change_field')}
        </button>
      </div>
    </div>
  )
}
