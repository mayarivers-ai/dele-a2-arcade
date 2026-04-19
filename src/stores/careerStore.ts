import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FREE_LEVELS, POOL_SIZE } from '../data/career'

export type PhaseKey = 'reading' | 'vocab' | 'grammar' | 'exam'
export type PhaseStatus = 'available' | 'passed' | 'failed' | 'exhausted'

export const PHASE_THRESHOLD = 60 // sub-phases
export const EXAM_THRESHOLD = 80

export interface PhaseState {
  status: PhaseStatus
  /** Last score 0-100 */
  score: number
  attempts: number
  /** Indices consumed from the pool (only for reading/vocab/grammar). Exam always reuses the same. */
  consumed: number[]
  /** Last attempt data for review (question index → user answer) */
  lastAnswers?: Record<number, string>
  /** Variant index used in the last attempt (for review). */
  lastVariantIdx?: number
}

export interface CareerLevel {
  reading: PhaseState
  vocab: PhaseState
  grammar: PhaseState
  exam: PhaseState
}

function defaultPhase(): PhaseState {
  return { status: 'available', score: 0, attempts: 0, consumed: [] }
}

function defaultLevel(): CareerLevel {
  return {
    reading: defaultPhase(),
    vocab: defaultPhase(),
    grammar: defaultPhase(),
    exam: defaultPhase(),
  }
}

export function isExamUnlocked(level: CareerLevel): boolean {
  return level.reading.status === 'passed' && level.vocab.status === 'passed' && level.grammar.status === 'passed'
}

export function isLevelComplete(level: CareerLevel): boolean {
  return isExamUnlocked(level) && level.exam.status === 'passed'
}

export function thresholdFor(phase: PhaseKey): number {
  return phase === 'exam' ? EXAM_THRESHOLD : PHASE_THRESHOLD
}

/** Pick next unused variant index. Returns -1 when pool exhausted. */
export function pickNextVariant(phase: PhaseState): number {
  for (let i = 0; i < POOL_SIZE; i++) {
    if (!phase.consumed.includes(i)) return i
  }
  return -1
}

interface CareerStore {
  currentLevel: number
  levels: Record<number, CareerLevel>
  paywallActive: boolean
  lastLevelUp: number | null

  /** Record a phase attempt. Returns { passed, variantIdx, exhausted, levelUp } for UI routing. */
  recordAttempt: (
    levelId: number,
    phase: PhaseKey,
    variantIdx: number,
    score: number,
    answers: Record<number, string>,
  ) => { passed: boolean; levelUp: boolean; exhausted: boolean }

  dismissLevelUp: () => void
  reset: () => void
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set, get) => ({
      currentLevel: 1,
      levels: { 1: defaultLevel() },
      paywallActive: false,
      lastLevelUp: null,

      recordAttempt: (levelId, phase, variantIdx, score, answers) => {
        const passed = score >= thresholdFor(phase)
        const state = get()
        const lvl = state.levels[levelId] ?? defaultLevel()
        const prev = lvl[phase]

        // For exam, "consumed" is not tracked. For others, consume the variant.
        const newConsumed = phase === 'exam' ? prev.consumed : Array.from(new Set([...prev.consumed, variantIdx]))
        const exhausted = phase !== 'exam' && !passed && newConsumed.length >= POOL_SIZE

        const nextStatus: PhaseStatus = passed ? 'passed' : exhausted ? 'exhausted' : 'failed'

        const updatedPhase: PhaseState = {
          status: nextStatus,
          score,
          attempts: prev.attempts + 1,
          consumed: newConsumed,
          lastAnswers: answers,
          lastVariantIdx: variantIdx,
        }

        const updatedLevel: CareerLevel = { ...lvl, [phase]: updatedPhase }
        let levelUp = false
        let paywallActive = state.paywallActive
        let currentLevel = state.currentLevel
        const updatedLevels: Record<number, CareerLevel> = { ...state.levels, [levelId]: updatedLevel }

        if (isLevelComplete(updatedLevel)) {
          levelUp = true
          if (levelId >= FREE_LEVELS) {
            paywallActive = true
          } else {
            const next = levelId + 1
            currentLevel = Math.max(currentLevel, next)
            if (!updatedLevels[next]) updatedLevels[next] = defaultLevel()
          }
        }

        set({
          levels: updatedLevels,
          currentLevel,
          paywallActive,
          lastLevelUp: levelUp ? levelId : state.lastLevelUp,
        })

        return { passed, levelUp, exhausted }
      },

      dismissLevelUp: () => set({ lastLevelUp: null }),

      reset: () =>
        set({
          currentLevel: 1,
          levels: { 1: defaultLevel() },
          paywallActive: false,
          lastLevelUp: null,
        }),
    }),
    { name: 'career-v2' },
  ),
)
