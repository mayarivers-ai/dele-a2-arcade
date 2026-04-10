import type { Verb, Tense, Pronoun } from '../types'

// Normaliza texto: minúsculas, sin tildes opcionales para comparación flexible
export function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar diacríticos
}

// Compara respuesta del usuario con la correcta (flexible: tildes opcionales, case-insensitive)
export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  if (!userAnswer.trim()) return false
  const u = normalize(userAnswer)
  const c = normalize(correctAnswer)
  return u === c
}

export type GameLevel = 'A1' | 'A2'

const TENSES_BY_LEVEL: Record<GameLevel, Tense[]> = {
  A1: ['presente'],
  A2: ['presente', 'indefinido', 'imperfecto', 'futuro', 'imperativo_afirmativo'],
}

const ALL_PRONOUNS: Pronoun[] = ['yo', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes']
const LATAM_PRONOUNS: Pronoun[] = ['yo', 'tú', 'usted', 'nosotros', 'ustedes']

export interface VerbCard {
  verb: Verb
  tense: Tense
  pronoun: Pronoun
  correct: string
}

// Selecciona el siguiente verbo usando pesos (SM-2 simplificado)
export function selectNextCard(
  verbs: Verb[],
  level: GameLevel,
  region: 'espana' | 'latam',
  weights: Record<string, number> // key: `${infinitive}_${tense}_${pronoun}`
): VerbCard {
  const tenses = TENSES_BY_LEVEL[level]
  const pronouns = region === 'latam' ? LATAM_PRONOUNS : ALL_PRONOUNS

  // Filtrar verbos por nivel (A1 incluye A1, A2 incluye ambos)
  const eligible = level === 'A1'
    ? verbs.filter(v => v.level === 'A1')
    : verbs

  // Construir pool de cards posibles
  const pool: Array<{ card: VerbCard; weight: number }> = []

  for (const verb of eligible) {
    for (const tense of tenses) {
      if (!verb.conjugations[tense]) continue
      for (const pronoun of pronouns) {
        // imperativo no tiene "yo"
        if (tense === 'imperativo_afirmativo' && pronoun === 'yo') continue
        const correct = verb.conjugations[tense]?.[pronoun]
        if (!correct) continue

        const key = `${verb.infinitive}_${tense}_${pronoun}`
        const w = weights[key] ?? 1
        pool.push({ card: { verb, tense, pronoun, correct }, weight: w })
      }
    }
  }

  if (pool.length === 0) {
    // Fallback: hablar presente yo
    const fallback = verbs.find(v => v.infinitive === 'hablar') ?? verbs[0]
    return { verb: fallback, tense: 'presente', pronoun: 'yo', correct: 'hablo' }
  }

  // Selección aleatoria ponderada
  const totalWeight = pool.reduce((s, p) => s + p.weight, 0)
  let rand = Math.random() * totalWeight
  for (const { card, weight } of pool) {
    rand -= weight
    if (rand <= 0) return card
  }
  return pool[pool.length - 1].card
}

// Actualiza el peso de un verbo en función de si acertó o falló
// Verbos fallados tienen peso mayor (aparecen más)
export function updateWeight(
  weights: Record<string, number>,
  card: VerbCard,
  correct: boolean
): Record<string, number> {
  const key = `${card.verb.infinitive}_${card.tense}_${card.pronoun}`
  const current = weights[key] ?? 1
  const newWeight = correct
    ? Math.max(0.5, current * 0.7)   // acierto: baja el peso
    : Math.min(5, current * 2.0)     // fallo: sube el peso

  return { ...weights, [key]: newWeight }
}
