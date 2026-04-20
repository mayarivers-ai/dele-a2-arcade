import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useVocabStore } from '../../stores/vocabStore'

interface Word {
  id: string
  field: string
  word_es: string
  translation_ru: string
  example_es: string
}

interface FlashCardProps {
  word: Word
  onNext: () => void
  total: number
  current: number
}

export function FlashCard({ word, onNext, total, current }: FlashCardProps) {
  const { t } = useTranslation()
  const [flipped, setFlipped] = useState(false)
  const reviewWord = useVocabStore((s) => s.reviewWord)

  function handleFlip() {
    if (!flipped) {
      setFlipped(true)
      reviewWord(word.id, 'flashcard', true)
    }
  }

  function handleNext() {
    setFlipped(false)
    onNext()
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

      {/* Card */}
      <div style={{ width: '100%', cursor: 'pointer', perspective: '1000px' }} onClick={handleFlip}>
        <div style={{
          position: 'relative', width: '100%', minHeight: 220,
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform .5s',
        }}>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, border: '1px solid var(--rule)',
            background: 'var(--bg-card)', padding: 32,
            boxShadow: '0 4px 20px rgba(46,75,206,.08)',
            backfaceVisibility: 'hidden',
          }}>
            <p className="dele-pixel" style={{ fontSize: 7, color: 'var(--cobalt)', letterSpacing: '.14em', marginBottom: 16 }}>
              {t('vocab.tap_to_reveal')}
            </p>
            <p className="dele-frau" style={{ fontSize: 42, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
              {word.word_es}
            </p>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            borderRadius: 20, border: '1px solid var(--cobalt-soft)',
            background: 'var(--cobalt-soft)', padding: 32,
            boxShadow: '0 4px 20px rgba(46,75,206,.1)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
            <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--cobalt)', margin: 0 }}>{word.translation_ru}</p>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic', textAlign: 'center', margin: 0 }}>"{word.example_es}"</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, width: '100%' }}>
        {!flipped ? (
          <button onClick={handleFlip} className="dele-btn dele-btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '11px 20px', fontSize: 13, boxShadow: '0 3px 0 var(--cobalt-dark)' }}>
            {t('vocab.show_translation')}
          </button>
        ) : (
          <button onClick={handleNext} className="dele-btn dele-btn-coral" style={{ flex: 1, justifyContent: 'center', padding: '11px 20px', fontSize: 13, boxShadow: '0 3px 0 var(--coral-dark)' }}>
            {t('vocab.next')} →
          </button>
        )}
      </div>
    </div>
  )
}
