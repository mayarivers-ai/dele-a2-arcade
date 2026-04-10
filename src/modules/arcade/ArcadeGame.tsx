import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import verbsData from '../../data/verbs.json'
import type { Verb, Tense } from '../../types'
import {
  checkAnswer,
  selectNextCard,
  updateWeight,
  type VerbCard,
  type GameLevel,
} from '../../lib/conjugation-engine'
import { useTimer } from '../../hooks/useTimer'
import { useProgressStore } from '../../stores/progressStore'
import { useSettingsStore } from '../../stores/settingsStore'

import { LivesBar } from '../../components/LivesBar'
import { TimerBar } from './TimerBar'
import { XPFloat } from '../../components/XPFloat'
import { GameOver } from './GameOver'
import { ArcadeConfig } from './ArcadeConfig'
import { LanguageToggle } from '../../components/LanguageToggle'

const verbs = verbsData as Verb[]

const TENSE_LABELS: Record<Tense, string> = {
  presente: 'arcade.tense_presente',
  indefinido: 'arcade.tense_indefinido',
  imperfecto: 'arcade.tense_imperfecto',
  futuro: 'arcade.tense_futuro',
  imperativo_afirmativo: 'arcade.tense_imperativo',
}

const XP_BASE = 10
const XP_STREAK_BONUS = 5

type Phase = 'config' | 'playing' | 'gameover'
type InputState = 'idle' | 'correct' | 'wrong'

export function ArcadeGame() {
  const { t } = useTranslation()
  const { timerDuration, gameLevel, region } = useSettingsStore()
  const {
    xp, streak, lives,
    addXP, incrementStreak, resetStreak, loseLife, resetSession,
    verbWeights, updateVerbWeight,
  } = useProgressStore()

  const [phase, setPhase] = useState<Phase>('config')
  const [card, setCard] = useState<VerbCard | null>(null)
  const [input, setInput] = useState('')
  const [inputState, setInputState] = useState<InputState>('idle')
  const [xpFloatKey, setXpFloatKey] = useState(0)
  const [xpFloatAmount, setXpFloatAmount] = useState(0)
  const [showXpFloat, setShowXpFloat] = useState(false)
  const [weights, setWeights] = useState<Record<string, number>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTimerExpire = useCallback(() => {
    setPhase('gameover')
  }, [])

  const { timeLeft, restart } = useTimer(timerDuration, handleTimerExpire)

  const pickNextCard = useCallback(
    (currentWeights: Record<string, number>) => {
      const next = selectNextCard(verbs, gameLevel as GameLevel, region, currentWeights)
      setCard(next)
      setInput('')
      setInputState('idle')
      setTimeout(() => inputRef.current?.focus(), 50)
    },
    [gameLevel, region]
  )

  const handleStart = useCallback(() => {
    resetSession()
    const initialWeights = { ...verbWeights }
    setWeights(initialWeights)
    setPhase('playing')
    restart(timerDuration)
    pickNextCard(initialWeights)
  }, [resetSession, verbWeights, restart, timerDuration, pickNextCard])

  const handleRestart = useCallback(() => {
    setPhase('config')
  }, [])

  const handleSubmit = useCallback(() => {
    if (!card || inputState !== 'idle' || phase !== 'playing') return

    const correct = checkAnswer(input, card.correct)
    const cardKey = `${card.verb.infinitive}_${card.tense}_${card.pronoun}`

    if (correct) {
      const multiplier = streak >= 10 ? 3 : streak >= 5 ? 2 : 1
      const earned = (XP_BASE + (streak > 0 ? XP_STREAK_BONUS : 0)) * multiplier
      addXP(earned)
      incrementStreak()
      setInputState('correct')
      setXpFloatAmount(earned)
      setShowXpFloat(true)
      setXpFloatKey((k) => k + 1)

      const newWeights = updateWeight(weights, card, true)
      setWeights(newWeights)
      updateVerbWeight(cardKey, newWeights[cardKey] ?? 1)

      setTimeout(() => {
        setShowXpFloat(false)
        pickNextCard(newWeights)
      }, 500)
    } else {
      loseLife()
      resetStreak()
      setInputState('wrong')

      const newWeights = updateWeight(weights, card, false)
      setWeights(newWeights)
      updateVerbWeight(cardKey, newWeights[cardKey] ?? 1)

      if (lives - 1 <= 0) {
        setTimeout(() => setPhase('gameover'), 600)
      } else {
        setTimeout(() => {
          pickNextCard(newWeights)
        }, 700)
      }
    }
  }, [
    card, inputState, phase, input, streak,
    addXP, incrementStreak, loseLife, resetStreak,
    weights, updateVerbWeight, lives, pickNextCard,
  ])

  // Focus input when playing
  useEffect(() => {
    if (phase === 'playing') inputRef.current?.focus()
  }, [phase])

  const multiplier = streak >= 10 ? 3 : streak >= 5 ? 2 : 1

  return (
    <div className="arcade-bg min-h-svh text-white">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <Link
          to="/"
          className="font-['Press_Start_2P'] text-[10px] text-white/30 hover:text-white/60 transition-colors"
        >
          ← DELE A2
        </Link>
        <LanguageToggle />
      </div>

      <div className="mx-auto max-w-lg px-4 py-6">
        {phase === 'config' && <ArcadeConfig onStart={handleStart} />}

        {phase === 'gameover' && <GameOver score={xp} onRestart={handleRestart} />}

        {phase === 'playing' && card && (
          <div className="flex flex-col gap-6">
            {/* HUD row */}
            <div className="flex items-center justify-between">
              <LivesBar lives={lives} />
              <div className="text-right">
                <div className="font-['Press_Start_2P'] text-xs text-white/40">{t('arcade.score')}</div>
                <div className="font-['Press_Start_2P'] text-xl neon-green">{xp}</div>
              </div>
            </div>

            {/* Streak */}
            {streak > 0 && (
              <div className="text-center font-['Press_Start_2P'] text-xs">
                <span className="text-white/40">{t('arcade.streak')}: </span>
                <span className="neon-green">{streak}</span>
                {multiplier > 1 && (
                  <span className="ml-2 text-yellow-400">×{multiplier}</span>
                )}
              </div>
            )}

            {/* Timer */}
            <TimerBar timeLeft={timeLeft} total={timerDuration} />

            {/* Verb prompt */}
            <div className="text-center">
              <div className="mb-2 font-['Press_Start_2P'] text-xs text-white/40 uppercase tracking-widest">
                {t(TENSE_LABELS[card.tense])}
              </div>
              <div className="mb-1 font-['Press_Start_2P'] text-2xl leading-relaxed neon-green">
                {card.pronoun}
              </div>
              <div className="font-['Playfair_Display'] text-3xl italic text-white/90">
                {card.verb.infinitive}
              </div>
              <div className="mt-1 text-sm text-white/30">
                ({card.verb.translation_ru})
              </div>
            </div>

            {/* Input */}
            <div className="relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={t('arcade.placeholder')}
                className={`arcade-input rounded-lg ${
                  inputState === 'correct'
                    ? 'correct animate-pulse-correct'
                    : inputState === 'wrong'
                    ? 'wrong animate-shake'
                    : ''
                }`}
                disabled={inputState !== 'idle'}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              {showXpFloat && (
                <XPFloat key={xpFloatKey} amount={xpFloatAmount} />
              )}
            </div>

            {/* Submit button (mobile) */}
            <button
              onClick={handleSubmit}
              disabled={inputState !== 'idle' || !input.trim()}
              className="w-full rounded border-2 border-[#39FF14]/50 py-3 font-['Press_Start_2P'] text-sm text-[#39FF14]/70 transition-all hover:border-[#39FF14] hover:text-[#39FF14] disabled:opacity-30 md:hidden"
            >
              ENTER ↵
            </button>

            {/* Correct answer reveal on wrong */}
            {inputState === 'wrong' && (
              <div className="text-center text-sm text-white/50">
                ✓{' '}
                <span className="font-semibold text-[#39FF14]/70">
                  {card.correct}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
