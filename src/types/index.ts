export type Tense =
  | 'presente'
  | 'indefinido'
  | 'imperfecto'
  | 'futuro'
  | 'imperativo_afirmativo'

export type Pronoun = 'yo' | 'tú' | 'usted' | 'nosotros' | 'vosotros' | 'ustedes'

export type VerbType = 'regular' | 'irregular'
export type VerbLevel = 'A1' | 'A2'

export interface Verb {
  infinitive: string
  translation_ru: string
  level: VerbLevel
  type: VerbType
  conjugations: Partial<Record<Tense, Partial<Record<Pronoun, string>>>>
}

export interface ReadingQuestion {
  id: string
  text: string
  options: string[]
  correct: number // index of correct option
  explanation_es: string
  explanation_ru: string
}

export interface ReadingExercise {
  id: string
  type: 'task1' | 'task2' | 'task3' | 'task4'
  title_es: string
  title_ru: string
  text: string
  questions: ReadingQuestion[]
}

export interface GrammarOption {
  text: string
  correct: boolean
}

export interface GrammarExercise {
  id: string
  type: 'multiple_choice' | 'fill_blank'
  topic: string
  instruction_es: string
  instruction_ru: string
  sentence: string
  blank_position?: number
  options: GrammarOption[]
  explanation_es: string
  explanation_ru: string
}

export type Region = 'espana' | 'latam'
export type Language = 'es' | 'ru'
