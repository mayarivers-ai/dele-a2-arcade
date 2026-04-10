import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import grammarData from '../../data/grammar.json'
import type { GrammarExercise } from '../../types'
import { PaywallModal } from '../../components/PaywallModal'
import { GameHUD } from '../../components/GameHUD'
import { ModuleGameOver } from '../../components/ModuleGameOver'
import { useProgressStore } from '../../stores/progressStore'
import { useSettingsStore } from '../../stores/settingsStore'
import { fetchAIGrammar as fetchAIExercise } from '../../lib/aiExercise'

const STATIC_EXERCISES = grammarData as GrammarExercise[]
const XP_PER_CORRECT = 20

const TOPIC_COLORS: Record<string, string> = {
  ser_estar:    'bg-blue-100 text-blue-700',
  indefinido:   'bg-purple-100 text-purple-700',
  imperfecto:   'bg-indigo-100 text-indigo-700',
  por_para:     'bg-orange-100 text-orange-700',
  futuro:       'bg-cyan-100 text-cyan-700',
  imperativo:   'bg-rose-100 text-rose-700',
  reflexivos:   'bg-teal-100 text-teal-700',
  comparativos: 'bg-lime-100 text-lime-700',
  pronombres:   'bg-yellow-100 text-yellow-700',
  subjuntivo:   'bg-pink-100 text-pink-700',
}


export function GrammarPage() {
  const { t, i18n } = useTranslation()
  const { moduleHearts, addLifetimeXP, loseModuleLife, resetModuleLives } = useProgressStore()
  const { testerMode } = useSettingsStore()

  const [exercises, setExercises] = useState<GrammarExercise[]>(STATIC_EXERCISES)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [sentenceAnim, setSentenceAnim] = useState<'correct' | 'wrong' | null>(null)
  const [sessionXP, setSessionXP] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const ex = exercises[currentIdx]
  const isRu = i18n.language === 'ru'
  const hearts = moduleHearts['grammar'] ?? 3
  const isGameOver = hearts === 0
  const isAIExercise = currentIdx >= STATIC_EXERCISES.length

  const correctIdx = ex.options.findIndex((o) => o.correct)
  const isCorrect = checked && selectedIdx === correctIdx

  const handleCheck = () => {
    if (selectedIdx === null || checked) return
    setChecked(true)

    const correct = selectedIdx === correctIdx
    if (correct) {
      addLifetimeXP(XP_PER_CORRECT)
      setSessionXP((prev) => prev + XP_PER_CORRECT)
      setSentenceAnim('correct')
    } else {
      loseModuleLife('grammar')
      setSentenceAnim('wrong')
    }
  }

  const handleNext = async () => {
    const nextIdx = currentIdx + 1

    // Static exercises still available
    if (nextIdx < exercises.length) {
      setCurrentIdx(nextIdx)
      setSelectedIdx(null)
      setChecked(false)
      setSentenceAnim(null)
      return
    }

    // Generate AI exercise
    setIsGenerating(true)
    setAiError(null)
    setSelectedIdx(null)
    setChecked(false)
    setSentenceAnim(null)

    try {
      const aiEx = await fetchAIExercise()
      setExercises((prev) => [...prev, aiEx])
      setCurrentIdx(nextIdx)
    } catch {
      setAiError(t('grammar.ai_error'))
      setShowPaywall(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleContinue = () => {
    resetModuleLives('grammar')
    setChecked(false)
    setSentenceAnim(null)
  }

  const parts = ex.sentence.split('____')

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {showPaywall && (
        <PaywallModal module="grammar" onClose={() => setShowPaywall(false)} />
      )}
      {isGameOver && (
        <ModuleGameOver
          module="grammar"
          xpEarned={sessionXP}
          onContinue={handleContinue}
        />
      )}

      {/* Header */}
      <div className="mb-2 flex items-center gap-3">
        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
          {t('grammar.title')}
        </h1>
        {isAIExercise && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
            ✨ IA
          </span>
        )}
        {testerMode && !isAIExercise && (
          <button
            onClick={async () => {
              setIsGenerating(true)
              setAiError(null)
              try {
                const aiEx = await fetchAIExercise()
                setExercises((prev) => [...prev, aiEx])
                setCurrentIdx(STATIC_EXERCISES.length)
                setSelectedIdx(null)
                setChecked(false)
                setSentenceAnim(null)
              } catch {
                setAiError(t('grammar.ai_error'))
              } finally {
                setIsGenerating(false)
              }
            }}
            disabled={isGenerating}
            className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 hover:bg-purple-200 disabled:opacity-50"
          >
            {isGenerating ? '...' : '⚡ IA'}
          </button>
        )}
      </div>

      <GameHUD module="grammar" current={currentIdx + 1} total={exercises.length} />

      {/* Topic badge */}
      <div
        className={`mb-6 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
          TOPIC_COLORS[ex.topic] ?? 'bg-gray-100 text-gray-600'
        }`}
      >
        {ex.topic.replace(/_/g, ' / ')}
      </div>

      {/* Instruction */}
      <p className="mb-6 text-gray-600">
        {isRu ? ex.instruction_ru : ex.instruction_es}
      </p>

      {/* Sentence with blank */}
      <div
        className={`mb-8 rounded-xl bg-white/80 border border-amber-100 p-6 shadow-md text-center text-xl text-gray-900 leading-loose font-['Playfair_Display'] ${
          sentenceAnim === 'correct' ? 'animate-pulse-correct' :
          sentenceAnim === 'wrong'   ? 'animate-shake' : ''
        }`}
      >
        {parts[0]}
        <span
          className={`mx-1 inline-block min-w-[100px] rounded border-b-2 px-2 font-bold ${
            checked
              ? isCorrect
                ? 'border-green-500 text-green-700'
                : 'border-red-400 text-red-600'
              : selectedIdx !== null
              ? 'border-amber-600 text-gray-900'
              : 'border-gray-300 text-gray-300'
          }`}
        >
          {selectedIdx !== null ? ex.options[selectedIdx].text : '______'}
        </span>
        {parts[1] ?? ''}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {ex.options.map((opt, i) => {
          let style = 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50/60'
          if (checked) {
            if (opt.correct) style = 'border-green-500 bg-green-50 text-green-800'
            else if (i === selectedIdx) style = 'border-red-400 bg-red-50 text-red-700'
            else style = 'border-gray-100 text-gray-400'
          } else if (selectedIdx === i) {
            style = 'border-amber-600 bg-amber-50 text-gray-900'
          }
          return (
            <button
              key={i}
              onClick={() => !checked && setSelectedIdx(i)}
              disabled={checked}
              className={`rounded-xl border-2 px-4 py-3 font-semibold transition-all ${style}`}
            >
              {opt.text}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {checked && (
        <div
          className={`mt-6 rounded-xl p-4 text-sm ${
            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          <span className="font-semibold">{isCorrect ? '✓ ' : '✗ '}</span>
          {isRu ? ex.explanation_ru : ex.explanation_es}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex justify-end">
        {checked ? (
          <button
            onClick={handleNext}
            disabled={isGenerating}
            className="rounded-xl bg-amber-700 px-6 py-2.5 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg disabled:opacity-60 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t('grammar.generating')}
              </>
            ) : (
              <>{t('grammar.new_exercise')} →</>
            )}
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={selectedIdx === null}
            className="rounded-xl bg-[#C0392B] px-6 py-2.5 font-semibold text-white hover:bg-[#a93226] disabled:opacity-40 transition-colors shadow-lg shadow-red-200/50"
          >
            {t('grammar.check')}
          </button>
        )}
      </div>

      {aiError && (
        <p className="mt-3 text-right text-sm text-red-500">{aiError}</p>
      )}
    </div>
  )
}
