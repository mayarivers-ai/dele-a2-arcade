import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import readingData from '../../data/reading.json'
import grammarData from '../../data/grammar.json'
import type { ReadingExercise, GrammarExercise } from '../../types'
import { useTimer } from '../../hooks/useTimer'

const EXAM_DURATION = 20 * 60 // 20 minutes in seconds
const readingExercises = readingData as ReadingExercise[]
const grammarExercises = grammarData as GrammarExercise[]

type Phase = 'intro' | 'exam' | 'results'
type Section = 'reading' | 'grammar'

interface ExamAnswers {
  reading: Record<string, Record<string, number>> // exerciseId -> questionId -> selectedIdx
  grammar: Record<string, number | null>          // exerciseId -> selectedIdx
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function ExamPage() {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language === 'ru'

  const [phase, setPhase] = useState<Phase>('intro')
  const [section, setSection] = useState<Section>('reading')
  const [readingIdx, setReadingIdx] = useState(0)
  const [grammarIdx, setGrammarIdx] = useState(0)
  const [answers, setAnswers] = useState<ExamAnswers>({ reading: {}, grammar: {} })
  const [lockedReading, setLockedReading] = useState<Set<string>>(new Set()) // locked question ids
  const [lockedGrammar, setLockedGrammar] = useState<Set<string>>(new Set())

  const handleExpire = useCallback(() => {
    setPhase('results')
  }, [])

  const { timeLeft, restart } = useTimer(EXAM_DURATION, handleExpire)

  function startExam() {
    setPhase('exam')
    setSection('reading')
    setReadingIdx(0)
    setGrammarIdx(0)
    setAnswers({ reading: {}, grammar: {} })
    setLockedReading(new Set())
    setLockedGrammar(new Set())
    restart(EXAM_DURATION)
  }

  function selectReadingAnswer(exId: string, qId: string, idx: number) {
    if (lockedReading.has(qId)) return
    setAnswers((prev) => ({
      ...prev,
      reading: {
        ...prev.reading,
        [exId]: { ...(prev.reading[exId] ?? {}), [qId]: idx },
      },
    }))
  }

  function selectGrammarAnswer(exId: string, idx: number) {
    if (lockedGrammar.has(exId)) return
    setAnswers((prev) => ({ ...prev, grammar: { ...prev.grammar, [exId]: idx } }))
  }

  function advanceReading() {
    const ex = readingExercises[readingIdx]
    // Lock all questions of this exercise
    setLockedReading((prev) => {
      const next = new Set(prev)
      ex.questions.forEach((q) => next.add(q.id))
      return next
    })
    if (readingIdx + 1 < readingExercises.length) {
      setReadingIdx((i) => i + 1)
    } else {
      setSection('grammar')
      setGrammarIdx(0)
    }
  }

  function advanceGrammar() {
    const ex = grammarExercises[grammarIdx]
    setLockedGrammar((prev) => new Set([...prev, ex.id]))
    if (grammarIdx + 1 < grammarExercises.length) {
      setGrammarIdx((i) => i + 1)
    } else {
      setPhase('results')
    }
  }

  // ── Score calculation ──────────────────────────────────────────
  function calcScores() {
    let readingCorrect = 0
    readingExercises.forEach((ex) => {
      ex.questions.forEach((q) => {
        if (answers.reading[ex.id]?.[q.id] === q.correct) readingCorrect++
      })
    })
    const readingTotal = readingExercises.reduce((acc, ex) => acc + ex.questions.length, 0)

    let grammarCorrect = 0
    grammarExercises.forEach((ex) => {
      const correctIdx = ex.options.findIndex((o) => o.correct)
      if (answers.grammar[ex.id] === correctIdx) grammarCorrect++
    })
    const grammarTotal = grammarExercises.length

    return { readingCorrect, readingTotal, grammarCorrect, grammarTotal }
  }

  // ── Timer banner ──────────────────────────────────────────────
  const timerWarning = timeLeft < 120
  const timerClass = timerWarning
    ? 'text-red-400 font-bold animate-pulse'
    : 'text-white font-semibold'

  // ══════════════════════════════════════════════════════════════
  // INTRO
  // ══════════════════════════════════════════════════════════════
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full">
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">
              {t('exam.title')}
            </h1>
            <p className="text-gray-500">{t('exam.subtitle')}</p>
          </div>

          <div className="rounded-2xl bg-white/80 border border-amber-100 shadow-md p-6 mb-8 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-widest text-amber-700">
              {t('exam.format')}
            </h2>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>📖 {t('exam.section_reading')}</span>
                <span className="font-semibold">{readingExercises.length} {t('exam.exercises')}</span>
              </div>
              <div className="flex justify-between">
                <span>✏️ {t('exam.section_grammar')}</span>
                <span className="font-semibold">{grammarExercises.length} {t('exam.exercises')}</span>
              </div>
              <div className="border-t border-amber-100 pt-3 flex justify-between font-semibold">
                <span>⏱ {t('exam.total_time')}</span>
                <span className="text-amber-700">20 {t('exam.minutes')}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-8">
            ⚠️ {t('exam.warning')}
          </div>

          <button
            onClick={startExam}
            className="w-full rounded-xl bg-gray-900 py-4 font-semibold text-white hover:bg-gray-700 transition-colors text-lg"
          >
            {t('exam.start')} →
          </button>

          <Link to="/" className="block text-center mt-4 text-sm text-gray-400 hover:text-gray-600">
            ← {t('common.back_home')}
          </Link>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════
  // RESULTS
  // ══════════════════════════════════════════════════════════════
  if (phase === 'results') {
    const { readingCorrect, readingTotal, grammarCorrect, grammarTotal } = calcScores()
    const totalCorrect = readingCorrect + grammarCorrect
    const totalQuestions = readingTotal + grammarTotal
    const pct = Math.round((totalCorrect / totalQuestions) * 100)
    const passed = pct >= 60

    return (
      <div className="min-h-screen bg-[#F0EDE8] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{passed ? '🎓' : '📚'}</div>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">
              {passed ? t('exam.result_pass') : t('exam.result_fail')}
            </h1>
          </div>

          {/* Certificate-style card */}
          <div className="rounded-2xl bg-white border-2 border-amber-200 shadow-xl p-8 mb-6">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold text-center mb-6">
              {t('exam.your_results')}
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">📖 {t('exam.section_reading')}</span>
                <span className="font-bold text-gray-900">{readingCorrect}/{readingTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">✏️ {t('exam.section_grammar')}</span>
                <span className="font-bold text-gray-900">{grammarCorrect}/{grammarTotal}</span>
              </div>
              <div className="border-t border-amber-100 pt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-900">{t('exam.total')}</span>
                <span className={`text-2xl font-bold ${passed ? 'text-green-700' : 'text-red-600'}`}>
                  {pct}%
                </span>
              </div>
            </div>

            <div className={`rounded-xl p-3 text-center text-sm font-semibold ${
              passed ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
            }`}>
              {passed ? t('exam.pass_message') : t('exam.fail_message')}
              {' '}({t('exam.threshold')}: 60%)
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={startExam}
              className="w-full rounded-xl bg-gray-900 py-3 font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              {t('exam.retry')}
            </button>
            <Link
              to="/"
              className="block text-center rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              {t('common.back_home')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════
  // EXAM — Reading section
  // ══════════════════════════════════════════════════════════════
  if (section === 'reading') {
    const ex = readingExercises[readingIdx]
    const exAnswers = answers.reading[ex.id] ?? {}
    const allAnswered = ex.questions.every((q) => exAnswers[q.id] !== undefined)

    return (
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Exam banner */}
        <div className="sticky top-0 z-40 bg-[#1C2B3A] px-4 py-3 flex items-center justify-between shadow-lg">
          <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
            📝 DELE A2 — {t('exam.section_reading')}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">⏱</span>
            <span className={`font-mono text-base ${timerClass}`}>{formatTime(timeLeft)}</span>
          </div>
          <span className="text-white/50 text-sm">
            {readingIdx + 1}/{readingExercises.length}
          </span>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-4 inline-block rounded-full bg-[#C0392B]/10 px-3 py-1 text-sm font-semibold text-[#C0392B]">
            {t('reading.task', { n: readingIdx + 1 })}
          </div>

          <div className="mb-8 whitespace-pre-line rounded-xl border border-amber-100 bg-white/80 p-6 text-gray-800 leading-relaxed shadow-md">
            {ex.text}
          </div>

          <div className="flex flex-col gap-6">
            {ex.questions.map((q) => (
              <div key={q.id}>
                <p className="mb-3 font-['Playfair_Display'] font-semibold text-gray-900">{q.text}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, i) => {
                    const isSelected = exAnswers[q.id] === i
                    const locked = lockedReading.has(q.id)
                    let style = 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50/60 cursor-pointer'
                    if (isSelected) style = 'border-gray-900 bg-gray-50 text-gray-900'
                    if (locked) style = isSelected
                      ? 'border-gray-700 bg-gray-100 text-gray-700 cursor-default'
                      : 'border-gray-100 text-gray-400 cursor-default'
                    return (
                      <button
                        key={i}
                        onClick={() => selectReadingAnswer(ex.id, q.id, i)}
                        disabled={locked}
                        className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={advanceReading}
              disabled={!allAnswered}
              className="rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              {readingIdx + 1 < readingExercises.length
                ? `${t('common.continue')} →`
                : `${t('exam.to_grammar')} →`}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════
  // EXAM — Grammar section
  // ══════════════════════════════════════════════════════════════
  const ex = grammarExercises[grammarIdx]
  const selectedGrammar = answers.grammar[ex.id] ?? null
  const isLockedGrammar = lockedGrammar.has(ex.id)

  const TOPIC_COLORS: Record<string, string> = {
    ser_estar: 'bg-blue-100 text-blue-700',
    indefinido: 'bg-purple-100 text-purple-700',
    imperfecto: 'bg-indigo-100 text-indigo-700',
    por_para: 'bg-orange-100 text-orange-700',
  }

  const parts = ex.sentence.split('____')

  return (
    <div className="min-h-screen bg-[#F0EDE8]">
      {/* Exam banner */}
      <div className="sticky top-0 z-40 bg-[#1C2B3A] px-4 py-3 flex items-center justify-between shadow-lg">
        <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
          📝 DELE A2 — {t('exam.section_grammar')}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">⏱</span>
          <span className={`font-mono text-base ${timerClass}`}>{formatTime(timeLeft)}</span>
        </div>
        <span className="text-white/50 text-sm">
          {grammarIdx + 1}/{grammarExercises.length}
        </span>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <div
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            TOPIC_COLORS[ex.topic] ?? 'bg-gray-100 text-gray-600'
          }`}
        >
          {ex.topic.replace('_', ' / ')}
        </div>

        <p className="mb-6 text-gray-600">
          {isRu ? ex.instruction_ru : ex.instruction_es}
        </p>

        <div className="mb-8 rounded-xl bg-white/80 border border-amber-100 p-6 shadow-md text-center text-xl text-gray-900 leading-loose font-['Playfair_Display']">
          {parts[0]}
          <span
            className={`mx-1 inline-block min-w-[100px] rounded border-b-2 px-2 font-bold ${
              selectedGrammar !== null
                ? 'border-amber-600 text-gray-900'
                : 'border-gray-300 text-gray-300'
            }`}
          >
            {selectedGrammar !== null ? ex.options[selectedGrammar].text : '______'}
          </span>
          {parts[1] ?? ''}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ex.options.map((opt, i) => {
            let style = 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50/60'
            if (isLockedGrammar) {
              style = selectedGrammar === i
                ? 'border-gray-700 bg-gray-100 text-gray-700 cursor-default'
                : 'border-gray-100 text-gray-400 cursor-default'
            } else if (selectedGrammar === i) {
              style = 'border-amber-600 bg-amber-50 text-gray-900'
            }
            return (
              <button
                key={i}
                onClick={() => selectGrammarAnswer(ex.id, i)}
                disabled={isLockedGrammar}
                className={`rounded-xl border-2 px-4 py-3 font-semibold transition-all ${style}`}
              >
                {opt.text}
              </button>
            )
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={advanceGrammar}
            disabled={selectedGrammar === null}
            className="rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
          >
            {grammarIdx + 1 < grammarExercises.length
              ? `${t('common.continue')} →`
              : `${t('exam.finish')} ✓`}
          </button>
        </div>
      </div>
    </div>
  )
}
