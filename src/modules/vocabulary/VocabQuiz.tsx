import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useVocabStore } from '../../stores/vocabStore'
import { useProgressStore } from '../../stores/progressStore'

interface Word {
  id: string
  field: string
  word_es: string
  translation_ru: string
  example_es: string
}

interface VocabQuizProps {
  word: Word
  allWords: Word[]
  onNext: () => void
  total: number
  current: number
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function VocabQuiz({ word, allWords, onNext, total, current }: VocabQuizProps) {
  const { t } = useTranslation()
  const reviewWord = useVocabStore((s) => s.reviewWord)
  const addLifetimeXP = useProgressStore((s) => s.addLifetimeXP)
  const [options, setOptions] = useState<Word[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const distractors = shuffle(allWords.filter((w) => w.id !== word.id)).slice(0, 3)
    setOptions(shuffle([word, ...distractors]))
    setSelected(null)
  }, [word.id]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(optionId: string) {
    if (selected !== null) return
    const correct = optionId === word.id
    setSelected(optionId)
    reviewWord(word.id, 'quiz', correct)
    if (correct) addLifetimeXP(10)
  }

  const answered = selected !== null

  function optionStyle(optId: string): React.CSSProperties {
    const base: React.CSSProperties = {
      display: 'block', width: '100%', borderRadius: 12,
      border: '1.5px solid', padding: '12px 16px', textAlign: 'left',
      fontSize: 14, fontFamily: 'inherit', transition: 'all .15s',
      background: 'var(--bg-card)',
    }
    if (!answered) return { ...base, borderColor: 'var(--rule)', color: 'var(--ink)', cursor: 'pointer' }
    if (optId === word.id) return { ...base, borderColor: 'var(--mint-dark)', background: 'var(--mint-soft)', color: 'var(--mint-dark)', fontWeight: 700, cursor: 'default' }
    if (optId === selected) return { ...base, borderColor: 'var(--coral-dark)', background: 'var(--coral-soft)', color: 'var(--coral-dark)', cursor: 'default' }
    return { ...base, borderColor: 'var(--rule)', color: 'var(--muted)', cursor: 'default' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%', maxWidth: 520, margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)', minWidth: 40 }}>{current} / {total}</span>
        <div style={{ flex: 1, height: 4, background: 'var(--rule)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(current / total) * 100}%`, background: 'var(--cobalt)', borderRadius: 999, transition: 'width .3s' }} />
        </div>
      </div>

      {/* Prompt */}
      <div style={{
        width: '100%', borderRadius: 20, border: '1px solid var(--rule)',
        background: 'var(--bg-card)', padding: '28px 24px', textAlign: 'center',
        boxShadow: '0 2px 12px rgba(46,75,206,.06)',
      }}>
        <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.14em', marginBottom: 12 }}>
          {t('vocab.quiz_prompt')}
        </p>
        <p className="dele-frau" style={{ fontSize: 40, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
          {word.word_es}
        </p>
      </div>

      {/* Options */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt) => (
          <button key={opt.id} onClick={() => handleSelect(opt.id)} style={optionStyle(opt.id)}>
            {opt.translation_ru}
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 700, textAlign: 'center', color: selected === word.id ? 'var(--mint-dark)' : 'var(--coral-dark)' }}>
            {selected === word.id ? t('common.correct') : t('common.incorrect')}
          </p>
          {selected !== word.id && (
            <p style={{ fontSize: 13, color: 'var(--ink-2)', textAlign: 'center' }}>
              {t('vocab.correct_answer')}: <strong style={{ color: 'var(--ink)' }}>{word.translation_ru}</strong>
            </p>
          )}
          <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center' }}>"{word.example_es}"</p>
          <button onClick={onNext} className="dele-btn dele-btn-coral" style={{ width: '100%', justifyContent: 'center', padding: '11px 20px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}>
            {t('vocab.next')} →
          </button>
        </div>
      )}
    </div>
  )
}
