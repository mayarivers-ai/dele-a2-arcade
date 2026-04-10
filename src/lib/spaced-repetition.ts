// SM-2 Spaced Repetition Algorithm
// Quality: 0-5 (0-1 = complete blackout, 2 = wrong but familiar, 3 = correct with effort, 4 = correct, 5 = perfect)

export interface SM2Card {
  ease_factor: number       // starts at 2.5
  interval_days: number     // starts at 1
  repetitions: number       // how many times reviewed successfully in a row
  next_review_at: number    // timestamp (ms)
}

export function defaultCard(): SM2Card {
  return {
    ease_factor: 2.5,
    interval_days: 1,
    repetitions: 0,
    next_review_at: Date.now(),
  }
}

/**
 * Update SM-2 card state after a review.
 * @param card  Current card state
 * @param quality 0–5: 0=forgot, 3=correct hard, 5=perfect
 * @returns Updated card state
 */
export function sm2Update(card: SM2Card, quality: 0 | 1 | 2 | 3 | 4 | 5): SM2Card {
  const q = quality

  // Calculate new ease factor
  let ef = card.ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  ef = Math.max(1.3, ef) // minimum EF is 1.3

  let interval: number
  let reps: number

  if (q < 3) {
    // Incorrect — reset repetitions but keep EF
    interval = 1
    reps = 0
  } else {
    // Correct
    reps = card.repetitions + 1
    if (reps === 1) {
      interval = 1
    } else if (reps === 2) {
      interval = 6
    } else {
      interval = Math.round(card.interval_days * ef)
    }
  }

  const next_review_at = Date.now() + interval * 24 * 60 * 60 * 1000

  return {
    ease_factor: ef,
    interval_days: interval,
    repetitions: reps,
    next_review_at,
  }
}

/**
 * Map simple correct/wrong to SM-2 quality scores.
 * - Flashcard reveal (just viewed): quality 3
 * - Quiz correct: quality 4
 * - Quiz wrong: quality 1
 * - Write correct: quality 5
 * - Write wrong: quality 1
 */
export function qualityFromResult(mode: 'flashcard' | 'quiz' | 'write', correct: boolean): 0 | 1 | 2 | 3 | 4 | 5 {
  if (mode === 'flashcard') return 3 // always "correct" on reveal
  if (mode === 'quiz') return correct ? 4 : 1
  if (mode === 'write') return correct ? 5 : 1
  return 3
}

/**
 * Sort words by review priority: overdue first, then by earliest next_review_at.
 */
export function sortByPriority<T extends { id: string }>(
  words: T[],
  cards: Record<string, SM2Card>
): T[] {
  const now = Date.now()
  return [...words].sort((a, b) => {
    const ca = cards[a.id] ?? defaultCard()
    const cb = cards[b.id] ?? defaultCard()
    const overdueA = now - ca.next_review_at
    const overdueB = now - cb.next_review_at
    return overdueB - overdueA // most overdue first
  })
}
