import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const FEATURES = [
  { icon: '🕹', key: 'arcade', route: '/arcade', free: true },
  { icon: '📖', key: 'reading', route: '/reading', free: false },
  { icon: '✏️', key: 'grammar', route: '/grammar', free: false },
  { icon: '🗂', key: 'vocab', route: '/vocabulary', free: false },
]

export function LandingPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#C0392B]/10 px-4 py-1.5 text-sm font-semibold text-[#C0392B]">
          <span className="font-['Press_Start_2P'] text-[10px]">DELE A2</span>
          <span>·</span>
          <span>Instituto Cervantes</span>
        </div>

        <h1 className="max-w-2xl font-['Playfair_Display'] text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
          {t('landing.hero_title')}
        </h1>

        <p className="max-w-lg text-lg text-gray-500 leading-relaxed">
          {t('landing.hero_subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/arcade"
            className="rounded-full bg-gray-900 px-8 py-3.5 font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            {t('landing.cta_free')} →
          </Link>
          <a
            href="#pricing"
            className="rounded-full border border-gray-200 px-8 py-3.5 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('landing.cta_premium')}
          </a>
        </div>

        {/* Arcade preview mini */}
        <div className="mt-4 w-full max-w-xs rounded-2xl border border-[#39FF14]/20 bg-[#1A1108] p-6 text-center shadow-[0_0_40px_rgba(57,255,20,0.08)]">
          <div className="mb-2 font-['Press_Start_2P'] text-[10px] text-white/30 uppercase tracking-widest">
            Presente · yo
          </div>
          <div className="mb-1 font-['Press_Start_2P'] text-2xl" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>
            yo
          </div>
          <div className="font-['Playfair_Display'] text-xl italic text-white/80 mb-4">
            hablar
          </div>
          <div className="h-10 w-full rounded border-2 border-[#39FF14]/40 bg-transparent" />
          <div className="mt-3 flex justify-between font-['Press_Start_2P'] text-[9px]">
            <span className="text-white/30">❤️❤️❤️</span>
            <span style={{ color: '#39FF14' }}>90s</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-['Playfair_Display'] text-3xl font-bold text-gray-900">
            Todo lo que necesitas para el DELE A2
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Link
                key={f.key}
                to={f.route}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-200"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-3xl">{f.icon}</span>
                  {f.free ? (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      {t('common.free_badge')}
                    </span>
                  ) : (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">
                      {t('common.premium_badge')}
                    </span>
                  )}
                </div>
                <h3 className="mb-1 font-['Playfair_Display'] text-xl font-bold text-gray-900">
                  {t(`landing.feature_${f.key}_title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`landing.feature_${f.key}_desc`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-gray-100 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center font-['Playfair_Display'] text-3xl font-bold text-gray-900">
            {t('landing.pricing_title')}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-1 text-lg font-bold text-gray-900">{t('landing.plan_free')}</div>
              <div className="mb-4 text-sm text-gray-400">{t('landing.plan_free_desc')}</div>
              <div className="mb-6 font-['Playfair_Display'] text-4xl font-bold text-gray-900">
                0€
              </div>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                {(t('landing.plan_free_features', { returnObjects: true }) as string[]).map(
                  (f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  )
                )}
              </ul>
              <Link
                to="/arcade"
                className="block w-full rounded-xl border border-gray-900 py-2.5 text-center font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                {t('landing.cta_free')}
              </Link>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border-2 border-[#C0392B] bg-white p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C0392B] px-4 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                Recomendado
              </div>
              <div className="mb-1 text-lg font-bold text-gray-900">{t('landing.plan_premium')}</div>
              <div className="mb-4 text-sm text-gray-400">{t('landing.plan_premium_desc')}</div>
              <div className="mb-6 font-['Playfair_Display'] text-4xl font-bold text-gray-900">
                9.99€
              </div>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                {(t('landing.plan_premium_features', { returnObjects: true }) as string[]).map(
                  (f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  )
                )}
              </ul>
              <button className="w-full rounded-xl bg-[#C0392B] py-2.5 font-semibold text-white hover:bg-[#a93226] transition-colors">
                {t('landing.cta_premium')} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-8 text-center text-sm text-gray-400">
        <p>© 2026 DELE A2 Arcade · Preparación para el examen DELE A2 del Instituto Cervantes</p>
      </footer>
    </div>
  )
}
