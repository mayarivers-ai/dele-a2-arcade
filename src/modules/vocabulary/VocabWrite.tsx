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
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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
    if (result !== null) {
      onNext()
      return
    }
    const correct = normalize(input) === normalize(word.word_es)
    setResult(correct ? 'correct' : 'wrong')
    reviewWord(word.id, 'write', correct)
    if (correct) addLifetimeXP(10)
  }

  const inputClass = result === null
    ? 'border-gray-300 focus:border-amber-500 focus:ring-amber-200'
    : result === 'correct'
      ? 'border-green-500 bg-green-50 text-green-800'
      : 'border-red-400 bg-red-50 text-red-700'

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="w-full flex items-center justify-between text-sm text-gray-500">
        <span>{current} / {total}</span>
        <div className="flex-1 mx-4 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Prompt */}
      <div className="w-full rounded-2xl bg-[#F7F4EF] border border-amber-200 p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
          {t('vocab.write_prompt')}
        </p>
        <p className="text-3xl font-bold text-amber-800">{word.translation_ru}</p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => result === null && setInput(e.target.value)}
          placeholder={t('vocab.write_placeholder')}
          className={`w-full rounded-xl border-2 px-5 py-3.5 text-lg font-medium outline-none focus:ring-2 transition-all ${inputClass}`}
          disabled={result !== null}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {result !== null && (
          <div className="flex flex-col gap-1">
            <p className={`text-sm font-semibold ${result === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {result === 'correct' ? t('common.correct') : t('common.incorrect')}
            </p>
            {result === 'wrong' && (
              <p className="text-sm text-gray-600">
                {t('vocab.correct_answer')}: <span className="font-semibold text-gray-900">{word.word_es}</span>
              </p>
            )}
            <p className="text-xs text-gray-400 italic">"{word.example_es}"</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors disabled:opacity-40"
          disabled={result === null && input.trim().length === 0}
        >
          {result === null ? t('common.check') : `${t('vocab.next')} →`}
        </button>
      </form>
    </div>
  )
}
