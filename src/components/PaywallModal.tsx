import { useTranslation } from 'react-i18next'

interface PaywallModalProps {
  module: 'reading' | 'grammar'
  onClose: () => void
}

export function PaywallModal({ module, onClose }: PaywallModalProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-2 text-center text-4xl">🔒</div>
        <h2 className="mb-2 text-center font-['Playfair_Display'] text-2xl font-bold text-gray-900">
          {t(`${module}.paywall_title`)}
        </h2>
        <p className="mb-6 text-center text-gray-500">
          {t(`${module}.paywall_desc`)}
        </p>

        <div className="mb-4 rounded-xl border-2 border-[#C0392B] bg-red-50 p-4">
          <div className="mb-1 text-center text-sm font-bold uppercase tracking-wide text-[#C0392B]">
            Premium — 9.99€/mes
          </div>
          <ul className="space-y-1 text-sm text-gray-700">
            {(t('landing.plan_premium_features', { returnObjects: true }) as string[]).map(
              (f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> {f}
                </li>
              )
            )}
          </ul>
        </div>

        <button className="w-full rounded-xl bg-[#C0392B] py-3 font-semibold text-white hover:bg-[#a93226] transition-colors">
          {t(`${module}.upgrade`)}
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full py-2 text-sm text-gray-400 hover:text-gray-600"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  )
}
