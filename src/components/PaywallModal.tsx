import { useTranslation } from 'react-i18next'

interface PaywallModalProps {
  module: 'reading' | 'grammar'
  onClose: () => void
}

export function PaywallModal({ module, onClose }: PaywallModalProps) {
  const { t } = useTranslation()

  const moduleIcon = module === 'reading' ? '📖' : '✏️'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in-up">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top accent */}
        <div className="relative bg-gradient-to-br from-[#1A1108] to-[#2a1d10] px-8 pb-8 pt-10 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(57,255,20,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative">
            <div className="mb-3 text-5xl">{moduleIcon}</div>
            <div
              className="mb-2 font-['Press_Start_2P'] text-[10px] uppercase tracking-widest"
              style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}
            >
              ▸ lvl up
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
              {t(`${module}.paywall_title`)}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-6">
          <p className="mb-6 text-center text-gray-600 leading-relaxed">
            {t(`${module}.paywall_desc`)}
          </p>

          {/* Plan chip */}
          <div className="mb-6 rounded-2xl border-2 border-[#C0392B]/20 bg-[#C0392B]/[0.03] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-[#C0392B]">
                  Pro
                </div>
                <div className="font-['Playfair_Display'] text-2xl font-bold text-gray-900">
                  9,90€ <span className="text-sm font-normal text-gray-400">/ mes</span>
                </div>
              </div>
              <div className="rounded-full bg-[#C0392B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C0392B]">
                Cancela cuando quieras
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#C0392B]">✓</span>
                <span>Ejercicios infinitos generados por IA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#C0392B]">✓</span>
                <span>Adaptados a tus fallos y nivel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#C0392B]">✓</span>
                <span>Lectura y gramática en un solo plan</span>
              </li>
            </ul>
          </div>

          <button className="w-full rounded-xl bg-[#C0392B] py-3.5 font-semibold text-white shadow-lg shadow-red-200/40 transition-colors hover:bg-[#a93226]">
            {t(`${module}.upgrade`)} →
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full py-2 text-sm text-gray-400 hover:text-gray-600"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  )
}
