import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ArcadeSession {
  xp: number
  streak: number
  lives: number
  highScore: number
  totalCorrect: number
  verbWeights: Record<string, number>
}

interface ProgressState extends ArcadeSession {
  // Cross-module persistent XP
  lifetimeXP: number
  // Per-module hearts: { reading: 3, grammar: 3, vocab: 3 }
  moduleHearts: Record<string, number>
  // Reactive trigger for XPFloat in consuming components
  lastXPGain: { amount: number; id: number } | null

  // Arcade actions
  addXP: (amount: number) => void
  incrementStreak: () => void
  resetStreak: () => void
  loseLife: () => void
  resetLives: () => void
  resetSession: () => void
  updateVerbWeight: (key: string, weight: number) => void
  setHighScore: (score: number) => void

  // Cross-module gamification actions
  addLifetimeXP: (amount: number) => void
  loseModuleLife: (module: string) => void
  resetModuleLives: (module: string) => void
}

const MODULE_HEARTS_DEFAULT = { reading: 3, grammar: 3, vocab: 3 }

const INITIAL_SESSION: ArcadeSession = {
  xp: 0,
  streak: 0,
  lives: 3,
  highScore: 0,
  totalCorrect: 0,
  verbWeights: {},
}

let xpGainCounter = 0

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...INITIAL_SESSION,
      lifetimeXP: 0,
      moduleHearts: MODULE_HEARTS_DEFAULT,
      lastXPGain: null,

      addXP: (amount) => {
        const { xp, highScore, totalCorrect } = get()
        const newXP = xp + amount
        const newCorrect = totalCorrect + 1
        set({
          xp: newXP,
          totalCorrect: newCorrect,
          highScore: Math.max(highScore, newXP),
        })
      },

      incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
      resetStreak: () => set({ streak: 0 }),

      loseLife: () => set((s) => ({ lives: Math.max(0, s.lives - 1) })),
      resetLives: () => set({ lives: 3 }),

      resetSession: () =>
        set((s) => ({
          xp: 0,
          streak: 0,
          lives: 3,
          totalCorrect: 0,
          highScore: s.highScore,
          verbWeights: s.verbWeights,
        })),

      updateVerbWeight: (key, weight) =>
        set((s) => ({ verbWeights: { ...s.verbWeights, [key]: weight } })),

      setHighScore: (score) =>
        set((s) => ({ highScore: Math.max(s.highScore, score) })),

      addLifetimeXP: (amount) => {
        xpGainCounter++
        set((s) => ({
          lifetimeXP: s.lifetimeXP + amount,
          lastXPGain: { amount, id: xpGainCounter },
        }))
      },

      loseModuleLife: (module) =>
        set((s) => ({
          moduleHearts: {
            ...s.moduleHearts,
            [module]: Math.max(0, (s.moduleHearts[module] ?? 3) - 1),
          },
        })),

      resetModuleLives: (module) =>
        set((s) => ({
          moduleHearts: {
            ...s.moduleHearts,
            [module]: 3,
          },
        })),
    }),
    { name: 'dele-progress' }
  )
)
