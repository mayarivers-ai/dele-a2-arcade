import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import readingData from '../../data/reading.json'
import type { ReadingExercise } from '../../types'
import { PaywallModal } from '../../components/PaywallModal'
import { GameHUD } from '../../components/GameHUD'
import { ModuleGameOver } from '../../components/ModuleGameOver'
import { useProgressStore } from '../../stores/progressStore'

const exercises = readingData as ReadingExercise[]
const FREE_LIMIT = 5
const XP_PER_CORRECT = 15

export function ReadingPage() {
  const { t, i18n } = useTranslation()
  const { moduleHearts, addLifetimeXP, loseModuleLife, resetModuleLives } = useProgressStore()

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [checked, setChecked] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const [sessionXP, setSessionXP] = useState(0)

  const ex = exercises[currentIdx]
  const isRu = i18n.language === 'ru'
  const hearts = moduleHearts['reading'] ?? 3
  const isGameOver = hearts === 0

  const handleCheck = () => {
    if (checked) return
    setChecked(true)

    let xpEarned = 0
    let anyWrong = false

    ex.questions.forEach((q) => {
      if (selected[q.id] === q.correct) {
        addLifetimeXP(XP_PER_CORRECT)
        xpEarned += XP_PER_CORRECT
      } else {
        loseModuleLife('reading')
        anyWrong = true
      }
    })

    setSessionXP((prev) => prev + xpEarned)

    if (anyWrong) {
      setShakeKey((k) => k + 1)
    }
  }

  const handleNext = () => {
    const nextIdx = currentIdx + 1
    if (nextIdx >= FREE_LIMIT) {
      setShowPaywall(true)
      return
    }
    setCurrentIdx(nextIdx)
    setSelected({})
    setChecked(false)
  }

  const handleContinue = () => {
    // resetModuleLives called inside ModuleGameOver
    resetModuleLives('reading')
    setChecked(false)
  }

  const correctCount = checked
    ? ex.questions.filter((q) => selected[q.id] === q.correct).length
    : 0

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {showPaywall && (
        <PaywallModal module="reading" onClose={() => setShowPaywall(false)} />
      )}
      {isGameOver && (
        <ModuleGameOver
          module="reading"
          xpEarned={sessionXP}
          onContinue={handleContinue}
        />
      )}

      {/* Header */}
      <div className="mb-2">
        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
          {t('reading.title')}
        </h1>
      </div>

      <GameHUD module="reading" current={currentIdx + 1} total={exercises.length} />

      {/* Task badge */}
      <div className="mb-4 inline-block rounded-full bg-[#C0392B]/10 px-3 py-1 text-sm font-semibold text-[#C0392B]">
        {t('reading.task', { n: currentIdx + 1 })}
      </div>

      {/* Text */}
      <div className="mb-8 whitespace-pre-line rounded-xl border border-amber-100 bg-white/80 p-6 text-gray-800 leading-relaxed shadow-md">
        {ex.text}
      </div>

      {/* Questions */}
      <div
        key={shakeKey}
        className={shakeKey > 0 && checked && correctCount < ex.questions.length ? 'animate-shake' : ''}
      >
        <div className="flex flex-col gap-6">
          {ex.questions.map((q) => (
            <div key={q.id}>
              <p className="mb-3 font-['Playfair_Display'] font-semibold text-gray-900">{q.text}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => {
                  const isSelected = selected[q.id] === i
                  const isCorrect = i === q.correct
                  let style = 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50/60'
                  if (checked) {
                    if (isCorrect) style = 'border-green-500 bg-green-50 text-green-800'
                    else if (isSelected) style = 'border-red-400 bg-red-50 text-red-700'
                    else style = 'border-gray-100 text-gray-400'
                  } else if (isSelected) {
                    style = 'border-amber-600 bg-amber-50 text-gray-900'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => !checked && setSelected({ ...selected, [q.id]: i })}
                      disabled={checked}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${style} ${
                        checked && isCorrect ? 'animate-pulse-correct' : ''
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {checked && (
                <p className="mt-2 text-sm text-gray-500">
                  💡 {isRu ? q.explanation_ru : q.explanation_es}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Score + actions */}
      <div className="mt-8 flex items-center justify-between">
        {checked ? (
          <>
            <span className="font-semibold text-gray-700">
              {t('reading.score', { correct: correctCount, total: ex.questions.length })}
            </span>
            <button
              onClick={handleNext}
              className="rounded-xl bg-amber-700 px-6 py-2.5 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg"
            >
              {t('reading.new_exercise')} →
            </button>
          </>
        ) : (
          <button
            onClick={handleCheck}
            disabled={Object.keys(selected).length < ex.questions.length}
            className="ml-auto rounded-xl bg-[#C0392B] px-6 py-2.5 font-semibold text-white hover:bg-[#a93226] disabled:opacity-40 transition-colors shadow-lg shadow-red-200/50"
          >
            {t('reading.check_answers')}
          </button>
        )}
      </div>
    </div>
  )
}
