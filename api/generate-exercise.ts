import type { VercelRequest, VercelResponse } from '@vercel/node'
import { generateText, Output } from 'ai'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

// Uses AI Gateway — model string routed via gateway.vercel.sh
// Auth: AI_GATEWAY_API_KEY env var (or OIDC on Vercel deployments)
const MODEL = 'anthropic/claude-haiku-4.5'

// ── Auth ───────────────────────────────────────────────────────────────────

async function verifyTester(req: VercelRequest): Promise<{ ok: boolean; error?: string }> {
  const testerEmails = process.env.TESTER_EMAILS ?? ''
  if (!testerEmails) return { ok: false, error: 'Tester access not configured' }

  const authHeader = req.headers.authorization ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return { ok: false, error: 'No session token. Please log in.' }

  const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_ANON_KEY ?? '',
  )
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user?.email) return { ok: false, error: 'Invalid session. Please log in again.' }

  const allowed = testerEmails.split(',').map(e => e.trim().toLowerCase())
  if (!allowed.includes(user.email.toLowerCase())) {
    return { ok: false, error: 'Access restricted to testers.' }
  }

  return { ok: true }
}

// ── Schemas ────────────────────────────────────────────────────────────────

const ReadingQuestionSchema = z.object({
  id: z.string(),
  text: z.string().describe('Question in Spanish'),
  options: z.array(z.string()).length(3).describe('Three answer options in Spanish'),
  correct: z.number().int().min(0).max(2).describe('Index of the correct option (0, 1 or 2)'),
  explanation_es: z.string().describe('Brief explanation in Spanish (1-2 sentences)'),
  explanation_ru: z.string().describe('Same explanation translated to Russian'),
})

const ReadingExerciseSchema = z.object({
  id: z.string(),
  type: z.literal('task2'),
  title_es: z.string().describe('Short title in Spanish (3-6 words)'),
  title_ru: z.string().describe('Title translated to Russian'),
  text: z.string().describe('Spanish text, 120-180 words, A2 level, realistic context'),
  questions: z.array(ReadingQuestionSchema).min(3).max(4),
})

const GrammarOptionSchema = z.object({
  text: z.string(),
  correct: z.boolean(),
})

const GrammarExerciseSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'fill_blank']),
  topic: z.enum([
    'ser_estar', 'indefinido', 'imperfecto', 'futuro',
    'por_para', 'imperativo', 'reflexivos', 'comparativos',
    'pronombres', 'subjuntivo',
  ]),
  instruction_es: z.string().describe('Short instruction in Spanish'),
  instruction_ru: z.string().describe('Instruction translated to Russian'),
  sentence: z.string().describe('Sentence with ____ marking the blank'),
  options: z.array(GrammarOptionSchema).length(4).describe('Exactly 4 options, exactly one correct'),
  explanation_es: z.string().describe('Grammar explanation in Spanish (1-2 sentences)'),
  explanation_ru: z.string().describe('Same explanation in Russian'),
})

// ── Helpers ────────────────────────────────────────────────────────────────

const READING_CONTEXTS = [
  'email from a work colleague about a meeting or project',
  'announcement from a language academy about courses',
  'short article about a local market or cultural event',
  'notice from a neighbor about building maintenance',
  'tourist information flyer about a city excursion',
  'social media post about a local restaurant or shop',
  'formal letter from a doctor or medical center',
  'advertisement for a job opening at a Spanish company',
  'email about renting an apartment in a Spanish city',
  'news article about a sports or cultural event',
]

const GRAMMAR_TOPICS = [
  'ser_estar', 'indefinido', 'imperfecto', 'futuro',
  'por_para', 'imperativo', 'reflexivos', 'comparativos',
  'pronombres', 'subjuntivo',
] as const

const GRAMMAR_DESCRIPTIONS: Record<typeof GRAMMAR_TOPICS[number], string> = {
  ser_estar:    'SER vs ESTAR — permanent characteristics vs temporary states/location',
  indefinido:   'Pretérito indefinido (completed past actions with specific time markers)',
  imperfecto:   'Pretérito imperfecto (habitual past actions, descriptions, background)',
  futuro:       'Futuro simple (predictions and plans)',
  por_para:     'POR vs PARA (purpose, cause, recipient, deadline)',
  imperativo:   'Imperativo afirmativo or negativo (instructions and commands)',
  reflexivos:   'Reflexive verbs with correct pronoun (me/te/se/nos/os)',
  comparativos: 'Comparatives (más/menos... que, tan... como)',
  pronombres:   'Direct or indirect object pronouns (lo/la/le/los/las/les)',
  subjuntivo:   'Present subjunctive after querer que, esperar que, es importante que',
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Generators ────────────────────────────────────────────────────────────

async function generateReading(): Promise<z.infer<typeof ReadingExerciseSchema>> {
  const context = randomItem(READING_CONTEXTS)
  const uid = `r_ai_${Date.now()}`

  const { output } = await generateText({
    model: MODEL,
    output: Output.object({ schema: ReadingExerciseSchema }),
    prompt: `Generate a reading comprehension exercise for the DELE A2 Spanish exam.

Context type: ${context}

Requirements:
- Natural, realistic Spanish at A2 level (simple vocabulary, present/past tenses, short sentences)
- 120-180 words
- 3 or 4 multiple-choice comprehension questions with exactly 3 options each
- Questions test understanding of specific information (who, what, where, when, why)
- Explanations must reference the text directly
- Use id "${uid}" for the exercise and "${uid}_q1", "${uid}_q2", etc. for questions
- Russian translations must be accurate and natural`,
  })

  return output
}

async function generateGrammar(): Promise<z.infer<typeof GrammarExerciseSchema>> {
  const topic = randomItem(GRAMMAR_TOPICS)
  const uid = `g_ai_${Date.now()}`

  const { output } = await generateText({
    model: MODEL,
    output: Output.object({ schema: GrammarExerciseSchema }),
    prompt: `Generate a grammar exercise for the DELE A2 Spanish exam.

Grammar topic: ${topic} — ${GRAMMAR_DESCRIPTIONS[topic]}

Requirements:
- Set topic to "${topic}"
- Sentence must be realistic and natural (everyday situations: work, family, city, travel)
- The blank (____) must target the grammar point being tested
- Exactly 4 options, exactly 1 correct, the other 3 are common learner mistakes
- Explanation clearly states the grammar rule in simple terms
- Use id "${uid}"
- Russian translations must be accurate`,
  })

  return output
}

// ── Main handler ───────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const auth = await verifyTester(req)
  if (!auth.ok) return res.status(401).json({ error: auth.error })

  const { type } = req.body ?? {}
  if (type !== 'reading' && type !== 'grammar') {
    return res.status(400).json({ error: 'Invalid type. Must be "reading" or "grammar"' })
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    return res.status(503).json({ error: 'AI generation not configured' })
  }

  try {
    const exercise = type === 'reading'
      ? await generateReading()
      : await generateGrammar()

    return res.status(200).json(exercise)
  } catch (err) {
    console.error('[generate-exercise]', err)
    return res.status(500).json({ error: 'Failed to generate exercise. Please try again.' })
  }
}
