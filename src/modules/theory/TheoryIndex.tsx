import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { theoryBlocks } from '../../data/theory'

export function TheoryIndex() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
          {t('theory.title')}
        </h1>
        <p className="mt-2 text-gray-500">{t('theory.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {theoryBlocks.map((block) => (
          <div
            key={block.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl">{block.emoji}</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {t('theory.block')} {block.id}
                </span>
                <h2 className="text-base font-semibold text-gray-900">{block.title}</h2>
              </div>
            </div>

            <ul className="space-y-1">
              {block.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/teoria/${block.id}/${lesson.id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-amber-50 hover:text-amber-800"
                  >
                    <span className="w-8 shrink-0 text-xs font-mono text-gray-400">{lesson.id}</span>
                    <span>{lesson.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-gray-50 pt-3">
              <span className="text-xs text-gray-400">
                {block.lessons.length} {t('theory.lessons')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
