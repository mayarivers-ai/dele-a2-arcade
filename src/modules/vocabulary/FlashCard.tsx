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

      {/* Card */}
      <div
        className="w-full cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '240px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-[#F7F4EF] shadow-md p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-xs uppercase tracking-widest text-amber-600 mb-4 font-semibold">
              {t('vocab.tap_to_reveal')}
            </p>
            <p className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">
              {word.word_es}
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-300 bg-amber-50 shadow-md p-8 gap-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-3xl font-bold text-amber-800">{word.translation_ru}</p>
            <p className="text-sm text-gray-600 italic text-center mt-2">"{word.example_es}"</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full">
        {!flipped ? (
          <button
            onClick={handleFlip}
            className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            {t('vocab.show_translation')}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
          >
            {t('vocab.next')} →
          </button>
        )}
      </div>
    </div>
  )
}
