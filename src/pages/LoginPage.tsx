import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

export function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[80svh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {sent ? (
          <div className="text-center">
            <div className="mb-4 text-5xl">📬</div>
            <h2 className="mb-2 font-['Playfair_Display'] text-2xl font-bold">
              {t('auth.check_email')}
            </h2>
            <p className="text-gray-500">
              {t('auth.check_email_desc', { email })}
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-700"
            >
              {t('auth.back')}
            </button>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-center font-['Playfair_Display'] text-3xl font-bold">
              {t('auth.login_title')}
            </h1>
            <p className="mb-8 text-center text-gray-500">{t('auth.login_desc')}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email_placeholder')}
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B]"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gray-900 py-3 font-semibold text-white hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('auth.send_link')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
