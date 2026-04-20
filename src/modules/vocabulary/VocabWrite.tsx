import { useState, useRef, useEffect } from 'react'
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

interface VocabWriteProps {
  word: Word
  onNext: () => void
  total: number
  current: number
}

function normalize(text: string): string {
  return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function VocabWrite({ word, onNext, total, current }: VocabWriteProps) {
  const { t } = useTranslation()
  const reviewWord = useVocabStore((s) => s.reviewWord)
  const addLifetimeXP = useProgressStore((s) => s.addLifetimeXP)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInput('')
    setResult(null)
    inputRef.current?.focus()
  }, [word.id])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (result !== null) { onNext(); return }
    const correct = normalize(input) === normalize(word.word_es)
    setResult(correct ? 'correct' : 'wrong')
    reviewWord(word.id, 'write', correct)
    if (correct) addLifetimeXP(10)
  }

  const inputBorderColor = result === null ? 'var(--rule)' : result === 'correct' ? 'var(--mint-dark)' : 'var(--coral-dark)'
  const inputBg = result === null ? 'var(--bg)' : result === 'correct' ? 'var(--mint-soft)' : 'var(--coral-soft)'

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
          {t('vocab.write_prompt')}
        </p>
        <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--cobalt)', margin: 0 }}>{word.translation_ru}</p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => result === null && setInput(e.target.value)}
          placeholder={t('vocab.write_placeholder')}
          style={{
            width: '100%', borderRadius: 12,
            border: `1.5px solid ${inputBorderColor}`,
            padding: '14px 18px', fontSize: 17,
            color: result === 'correct' ? 'var(--mint-dark)' : result === 'wrong' ? 'var(--coral-dark)' : 'var(--ink)',
            background: inputBg, outline: 'none', fontFamily: 'inherit',
            transition: 'border-color .2s, background .2s',
          }}
          disabled={result !== null}
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
        />

        {result !== null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: result === 'correct' ? 'var(--mint-dark)' : 'var(--coral-dark)', margin: 0 }}>
              {result === 'correct' ? t('common.correct') : t('common.incorrect')}
            </p>
            {result === 'wrong' && (
              <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0 }}>
                {t('vocab.correct_answer')}: <strong style={{ color: 'var(--ink)' }}>{word.word_es}</strong>
              </p>
            )}
            <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', margin: 0 }}>"{word.example_es}"</p>
          </div>
        )}

        <button
          type="submit"
          className={`dele-btn ${result === null ? 'dele-btn-primary' : 'dele-btn-coral'}`}
          style={{
            width: '100%', justifyContent: 'center', padding: '11px 20px', fontSize: 13,
            boxShadow: result === null ? '0 3px 0 var(--cobalt-dark)' : '0 3px 0 var(--coral-dark)',
            opacity: result === null && input.trim().length === 0 ? 0.4 : 1,
          }}
          disabled={result === null && input.trim().length === 0}
        >
          {result === null ? t('common.check') : `${t('vocab.next')} →`}
        </button>
      </form>
    </div>
  )
}
