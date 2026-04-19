// Career content — Free tier: 3 levels, each with a pool of 3 variants per sub-phase + 1 fixed exam.
// Level 1 is fully populated (fase 1). Levels 2 and 3 are stubs for fase 2.

export type QuestionType = 'mc' | 'fill'

export interface Question {
  /** Prompt (the sentence with blank, or the question text). For reading, the question about the passage. */
  prompt: string
  /** For 'mc': the list of options. For 'fill': omitted (free input). */
  options?: string[]
  /** The correct answer. For 'mc': the option string (exact match). For 'fill': canonical form (compared case-insensitively, trim). */
  answer: string
  /** Optional explanation shown in review mode. */
  explain?: string
}

export interface ReadingVariant {
  title: string
  passage: string
  questions: Question[] // always 4
}

export interface QuestionSet {
  questions: Question[] // always 5
}

export interface ExamLevel {
  questions: Question[] // always 10
}

export interface LevelContent {
  id: number
  label: string
  /** 3 reading variants */
  reading: ReadingVariant[]
  /** 3 vocab question sets */
  vocab: QuestionSet[]
  /** 3 grammar question sets */
  grammar: QuestionSet[]
  /** 1 fixed exam */
  exam: ExamLevel
}

// ───────────────────────── LEVEL 1 — Básico (presente, rutinas, saludos) ─────────────────────────

const LEVEL_1: LevelContent = {
  id: 1,
  label: 'Básico',
  reading: [
    {
      title: 'La rutina de María',
      passage:
        'María vive en Madrid con su familia. Todos los días se levanta a las siete de la mañana. Desayuna café con leche y una tostada. Luego va al trabajo en metro. María es profesora de inglés en una escuela. Por la tarde, cuando vuelve a casa, lee un libro o ve una película. Los fines de semana sale con sus amigos o visita a sus padres en Toledo.',
      questions: [
        { prompt: '¿Dónde vive María?', options: ['En Toledo', 'En Madrid', 'En Barcelona', 'En Sevilla'], answer: 'En Madrid' },
        { prompt: '¿A qué hora se levanta?', options: ['A las 6:00', 'A las 7:00', 'A las 8:00', 'A las 9:00'], answer: 'A las 7:00' },
        { prompt: '¿Cuál es su profesión?', options: ['Médica', 'Estudiante', 'Profesora', 'Escritora'], answer: 'Profesora' },
        { prompt: '¿Qué hace los fines de semana?', options: ['Trabaja', 'Estudia', 'Sale con amigos o visita a sus padres', 'Ve la tele todo el día'], answer: 'Sale con amigos o visita a sus padres' },
      ],
    },
    {
      title: 'Un día en la oficina',
      passage:
        'Carlos trabaja en una oficina en el centro de la ciudad. Llega a las nueve y enciende el ordenador. Primero lee los correos electrónicos y responde a los más importantes. A las once bebe un café con sus compañeros. Come a las dos en un restaurante cerca del trabajo. Por la tarde tiene reuniones con clientes. Sale de la oficina a las seis y vuelve a casa en autobús.',
      questions: [
        { prompt: '¿Dónde está la oficina de Carlos?', options: ['Cerca de su casa', 'En el centro de la ciudad', 'En un pueblo', 'En otra ciudad'], answer: 'En el centro de la ciudad' },
        { prompt: '¿Qué hace primero al llegar?', options: ['Llama por teléfono', 'Lee los correos', 'Tiene una reunión', 'Toma café'], answer: 'Lee los correos' },
        { prompt: '¿A qué hora come?', options: ['A las 12:00', 'A la 1:00', 'A las 2:00', 'A las 3:00'], answer: 'A las 2:00' },
        { prompt: '¿Cómo vuelve a casa?', options: ['En coche', 'En metro', 'En autobús', 'Andando'], answer: 'En autobús' },
      ],
    },
    {
      title: 'La familia de Ana',
      passage:
        'Ana tiene una familia grande. Su padre se llama Pedro y es cocinero. Su madre, Luisa, trabaja en un hospital como enfermera. Ana tiene dos hermanos: Luis, el mayor, estudia medicina en la universidad, y Sofía, la pequeña, va al colegio. Los domingos toda la familia come junta en casa de los abuelos. Preparan paella y hablan mucho durante la comida.',
      questions: [
        { prompt: '¿Cuál es la profesión del padre de Ana?', options: ['Enfermero', 'Médico', 'Cocinero', 'Profesor'], answer: 'Cocinero' },
        { prompt: '¿Dónde trabaja la madre?', options: ['En un restaurante', 'En un hospital', 'En una escuela', 'En una oficina'], answer: 'En un hospital' },
        { prompt: '¿Qué estudia Luis?', options: ['Medicina', 'Derecho', 'Cocina', 'Inglés'], answer: 'Medicina' },
        { prompt: '¿Qué hacen los domingos?', options: ['Van al cine', 'Comen en casa de los abuelos', 'Van de viaje', 'Trabajan'], answer: 'Comen en casa de los abuelos' },
      ],
    },
  ],
  vocab: [
    {
      questions: [
        { prompt: 'El hermano de mi padre es mi ___.', options: ['tío', 'primo', 'abuelo', 'sobrino'], answer: 'tío' },
        { prompt: 'La habitación donde cocinamos es la ___.', options: ['cocina', 'sala', 'dormitorio', 'baño'], answer: 'cocina' },
        { prompt: 'Para dormir vamos al ___.', options: ['salón', 'dormitorio', 'garaje', 'jardín'], answer: 'dormitorio' },
        { prompt: 'La hija de mi hermana es mi ___.', options: ['prima', 'tía', 'sobrina', 'nieta'], answer: 'sobrina' },
        { prompt: 'Nos duchamos en el ___.', options: ['baño', 'salón', 'balcón', 'pasillo'], answer: 'baño' },
      ],
    },
    {
      questions: [
        { prompt: 'Cuando tengo hambre, ___.', options: ['bebo', 'como', 'duermo', 'leo'], answer: 'como' },
        { prompt: 'El color del cielo es normalmente ___.', options: ['rojo', 'verde', 'azul', 'amarillo'], answer: 'azul' },
        { prompt: 'Los días de la semana son: lunes, martes, ___, jueves...', options: ['domingo', 'miércoles', 'sábado', 'viernes'], answer: 'miércoles' },
        { prompt: 'Para escribir necesito un ___.', options: ['vaso', 'plato', 'bolígrafo', 'teléfono'], answer: 'bolígrafo' },
        { prompt: 'Después del desayuno viene la ___.', options: ['cena', 'merienda', 'comida', 'tarde'], answer: 'comida' },
      ],
    },
    {
      questions: [
        { prompt: 'El padre de mi madre es mi ___.', options: ['tío', 'abuelo', 'hermano', 'primo'], answer: 'abuelo' },
        { prompt: 'Para ver usamos los ___.', options: ['oídos', 'ojos', 'dedos', 'pies'], answer: 'ojos' },
        { prompt: 'En invierno hace ___.', options: ['calor', 'frío', 'sol', 'viento'], answer: 'frío' },
        { prompt: 'Compro el pan en la ___.', options: ['farmacia', 'panadería', 'librería', 'zapatería'], answer: 'panadería' },
        { prompt: 'Un animal que dice "miau" es un ___.', options: ['perro', 'gato', 'pájaro', 'caballo'], answer: 'gato' },
      ],
    },
  ],
  grammar: [
    {
      questions: [
        { prompt: 'Yo ___ estudiante de español. (ser)', options: ['soy', 'eres', 'es', 'somos'], answer: 'soy' },
        { prompt: 'Nosotros ___ en Madrid. (vivir)', options: ['vivo', 'vives', 'vive', 'vivimos'], answer: 'vivimos' },
        { prompt: '¿Tú ___ café? (beber)', options: ['bebo', 'bebes', 'bebe', 'beben'], answer: 'bebes' },
        { prompt: 'Ella ___ en un banco. (trabajar)', options: ['trabajo', 'trabajas', 'trabaja', 'trabajamos'], answer: 'trabaja' },
        { prompt: 'Vosotros ___ muy rápido. (hablar)', options: ['hablo', 'hablas', 'habla', 'habláis'], answer: 'habláis' },
      ],
    },
    {
      questions: [
        { prompt: 'Madrid ___ una ciudad grande. (ser)', options: ['soy', 'es', 'son', 'está'], answer: 'es' },
        { prompt: 'El libro ___ encima de la mesa. (estar)', options: ['es', 'está', 'hay', 'tiene'], answer: 'está' },
        { prompt: 'En la plaza ___ muchas personas. (haber)', options: ['es', 'están', 'hay', 'tienen'], answer: 'hay' },
        { prompt: 'Yo ___ hambre. (tener)', options: ['tengo', 'tienes', 'tiene', 'tenemos'], answer: 'tengo' },
        { prompt: 'Los niños ___ contentos hoy. (estar)', options: ['son', 'están', 'hay', 'tienen'], answer: 'están' },
      ],
    },
    {
      questions: [
        { prompt: 'Voy ___ la escuela todos los días.', options: ['a', 'en', 'de', 'por'], answer: 'a' },
        { prompt: 'Este libro es ___ mi hermana.', options: ['a', 'en', 'de', 'por'], answer: 'de' },
        { prompt: 'Estudio español ___ dos años.', options: ['desde', 'hace', 'por', 'para'], answer: 'desde' },
        { prompt: '¿___ dónde eres?', options: ['A', 'En', 'De', 'Por'], answer: 'De' },
        { prompt: 'Trabajo ___ una empresa grande.', options: ['a', 'en', 'de', 'por'], answer: 'en' },
      ],
    },
  ],
  exam: {
    questions: [
      // Reading-style (based on short passage embedded in prompt)
      { prompt: '"Pablo sale de casa a las 8 y llega al trabajo a las 8:30." ¿Cuánto tarda Pablo en llegar al trabajo?', options: ['15 minutos', '30 minutos', '45 minutos', '1 hora'], answer: '30 minutos' },
      { prompt: '"Elena prefiere el té al café." ¿Qué bebida le gusta más a Elena?', options: ['El café', 'El té', 'El agua', 'El zumo'], answer: 'El té' },
      { prompt: '"Los sábados voy al mercado a comprar fruta y verdura." ¿Qué día va la persona al mercado?', options: ['Lunes', 'Viernes', 'Sábado', 'Domingo'], answer: 'Sábado' },
      { prompt: '"Mi abuela vive en un pueblo pequeño cerca del mar." ¿Dónde vive la abuela?', options: ['En una gran ciudad', 'En un pueblo cerca del mar', 'En la montaña', 'En Madrid'], answer: 'En un pueblo cerca del mar' },
      // Vocab
      { prompt: 'La madre de mi madre es mi ___.', options: ['tía', 'abuela', 'hermana', 'prima'], answer: 'abuela' },
      { prompt: 'Para lavarnos las manos vamos al ___.', options: ['baño', 'garaje', 'balcón', 'salón'], answer: 'baño' },
      { prompt: 'El día después del lunes es el ___.', options: ['domingo', 'martes', 'viernes', 'sábado'], answer: 'martes' },
      // Grammar
      { prompt: 'Ellos ___ en una casa grande. (vivir)', options: ['vivo', 'vives', 'vivimos', 'viven'], answer: 'viven' },
      { prompt: 'Yo ___ muy cansada hoy. (estar)', options: ['soy', 'estoy', 'tengo', 'hay'], answer: 'estoy' },
      { prompt: 'Vamos ___ cine esta noche.', options: ['a el', 'al', 'del', 'en'], answer: 'al' },
    ],
  },
}

// ───────────────────────── Stubs for Levels 2 & 3 (fase 2) ─────────────────────────

const STUB_READING: ReadingVariant[] = [
  { title: 'Próximamente', passage: '(Contenido en preparación)', questions: [] },
  { title: 'Próximamente', passage: '(Contenido en preparación)', questions: [] },
  { title: 'Próximamente', passage: '(Contenido en preparación)', questions: [] },
]
const STUB_SET: QuestionSet[] = [{ questions: [] }, { questions: [] }, { questions: [] }]
const STUB_EXAM: ExamLevel = { questions: [] }

export const LEVELS: LevelContent[] = [
  LEVEL_1,
  { id: 2, label: 'Intermedio', reading: STUB_READING, vocab: STUB_SET, grammar: STUB_SET, exam: STUB_EXAM },
  { id: 3, label: 'A2 Real', reading: STUB_READING, vocab: STUB_SET, grammar: STUB_SET, exam: STUB_EXAM },
]

export const FREE_LEVELS = 3
export const POOL_SIZE = 3

export function getLevel(id: number): LevelContent | undefined {
  return LEVELS.find(l => l.id === id)
}
