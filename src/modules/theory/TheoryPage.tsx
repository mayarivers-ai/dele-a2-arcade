import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLessonById, getAdjacentLessons, theoryBlocks } from '../../data/theory'

export function TheoryPage() {
  const { bloque, leccion } = useParams<{ bloque: string; leccion: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const lesson = leccion ? getLessonById(leccion) : undefined
  const block = lesson ? theoryBlocks.find((b) => b.id === lesson.bloque) : undefined
  const { prev, next } = leccion ? getAdjacentLessons(leccion) : {}

  if (!lesson || !block) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-gray-500">Lección no encontrada.</p>
        <Link to="/teoria" className="mt-4 inline-block text-amber-700 underline">
          {t('theory.back_to_index')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link to="/teoria" className="hover:text-amber-700 transition-colors">
          {t('theory.title')}
        </Link>
        <span>›</span>
        <Link to="/teoria" className="hover:text-amber-700 transition-colors">
          {block.emoji} {block.title}
        </Link>
        <span>›</span>
        <span className="text-gray-600">{lesson.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t('theory.lesson')} {lesson.id}
        </span>
        <h1 className="mt-1 font-['Playfair_Display'] text-2xl font-bold text-gray-900">
          {lesson.title}
        </h1>
      </div>

      {/* Explanation */}
      <p className="mb-8 text-gray-600 leading-relaxed">{lesson.content.explanation}</p>

      {/* Rule */}
      <div className="mb-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
          {t('theory.rule')}
        </h2>
        <p className="text-gray-800 leading-relaxed">{lesson.content.rule}</p>
      </div>

      {/* Examples */}
      <div className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t('theory.examples')}
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-2 text-left font-medium">Español</th>
                <th className="px-4 py-2 text-left font-medium">Русский</th>
              </tr>
            </thead>
            <tbody>
              {lesson.content.examples.map((ex, i) => (
                <tr
                  key={i}
                  className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-4 py-3 text-gray-800">{ex.es}</td>
                  <td className="px-4 py-3 text-gray-500">{ex.ru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note for Russian speakers */}
      {lesson.content.note && (
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
            <span>🇷🇺</span> {t('theory.note_for_russian')}
          </h2>
          <p className="text-gray-700 leading-relaxed">{lesson.content.note}</p>
        </div>
      )}

      {/* Exercise link */}
      {lesson.exerciseLink && (
        <div className="mb-8">
          <button
            onClick={() => navigate(lesson.exerciseLink!)}
            className="rounded-full bg-[#C0392B] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t('theory.go_to_exercise')} →
          </button>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-6">
        {prev ? (
          <Link
            to={`/teoria/${prev.bloque}/${prev.id}`}
            className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:border-amber-200 hover:text-amber-800"
          >
            ← <span>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/teoria/${next.bloque}/${next.id}`}
            className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:border-amber-200 hover:text-amber-800"
          >
            <span>{next.title}</span> →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
