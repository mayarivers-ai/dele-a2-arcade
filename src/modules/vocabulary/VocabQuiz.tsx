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
    // Build 4 options: correct + 3 random distractors from same field or any
    const distractors = shuffle(
      allWords.filter((w) => w.id !== word.id)
    ).slice(0, 3)
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

  function optionClass(optId: string) {
    if (!answered) {
      return 'border-gray-200 bg-white hover:border-amber-400 hover:bg-amber-50 cursor-pointer'
    }
    if (optId === word.id) return 'border-green-500 bg-green-50 text-green-800'
    if (optId === selected) return 'border-red-400 bg-red-50 text-red-700'
    return 'border-gray-200 bg-white text-gray-400'
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

      {/* Prompt */}
      <div className="w-full rounded-2xl bg-[#F7F4EF] border border-amber-200 p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
          {t('vocab.quiz_prompt')}
        </p>
        <p className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">
          {word.word_es}
        </p>
      </div>

      {/* Options */}
      <div className="w-full grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`w-full rounded-xl border-2 px-5 py-3.5 text-left text-base font-medium transition-all ${optionClass(opt.id)}`}
          >
            {opt.translation_ru}
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div className="w-full flex flex-col gap-3">
          <p className={`text-sm font-semibold text-center ${selected === word.id ? 'text-green-600' : 'text-red-600'}`}>
            {selected === word.id ? t('common.correct') : t('common.incorrect')}
          </p>
          {selected !== word.id && (
            <p className="text-sm text-gray-500 text-center">
              {t('vocab.correct_answer')}: <span className="font-semibold text-gray-800">{word.translation_ru}</span>
            </p>
          )}
          <p className="text-xs text-gray-400 italic text-center">"{word.example_es}"</p>
          <button
            onClick={onNext}
            className="w-full rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
          >
            {t('vocab.next')} →
          </button>
        </div>
      )}
    </div>
  )
}
