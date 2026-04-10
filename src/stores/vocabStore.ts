import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SM2Card } from '../lib/spaced-repetition'
import { defaultCard, sm2Update, qualityFromResult } from '../lib/spaced-repetition'

interface VocabStore {
  // SM-2 cards keyed by word id
  cards: Record<string, SM2Card>

  // Session stats
  sessionCorrect: number
  sessionTotal: number

  // Actions
  reviewWord: (
    wordId: string,
    mode: 'flashcard' | 'quiz' | 'write',
    correct: boolean
  ) => void
  getCard: (wordId: string) => SM2Card
  resetProgress: () => void
  resetSession: () => void
}

export const useVocabStore = create<VocabStore>()(
  persist(
    (set, get) => ({
      cards: {},
      sessionCorrect: 0,
      sessionTotal: 0,

      reviewWord(wordId, mode, correct) {
        const existing = get().cards[wordId] ?? defaultCard()
        const quality = qualityFromResult(mode, correct)
        const updated = sm2Update(existing, quality)
        set((s) => ({
          cards: { ...s.cards, [wordId]: updated },
          sessionCorrect: s.sessionCorrect + (correct ? 1 : 0),
          sessionTotal: s.sessionTotal + 1,
        }))
      },

      getCard(wordId) {
        return get().cards[wordId] ?? defaultCard()
      },

      resetProgress() {
        set({ cards: {} })
      },

      resetSession() {
        set({ sessionCorrect: 0, sessionTotal: 0 })
      },
    }),
    {
      name: 'dele-vocab',
    }
  )
)
