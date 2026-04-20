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
    <div style={{ minHeight: '80svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
            <h2 className="dele-frau" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
              {t('auth.check_email')}
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>
              {t('auth.check_email_desc', { email })}
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ marginTop: 24, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('auth.back')}
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 className="dele-frau" style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
                {t('auth.login_title')}
              </h1>
              <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t('auth.login_desc')}</p>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--rule)', padding: '32px 28px', boxShadow: '0 4px 24px rgba(46,75,206,.07)' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email_placeholder')}
                  required
                  style={{
                    borderRadius: 12, border: '1.5px solid var(--rule)',
                    padding: '12px 16px', fontSize: 14, color: 'var(--ink)',
                    background: 'var(--bg)', outline: 'none',
                    fontFamily: 'inherit', transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--cobalt)'}
                  onBlur={e => e.target.style.borderColor = 'var(--rule)'}
                />
                {error && (
                  <p style={{ fontSize: 13, color: 'var(--coral-dark)', margin: 0 }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="dele-btn dele-btn-coral"
                  style={{ padding: '12px 24px', fontSize: 14, width: '100%', justifyContent: 'center', boxShadow: '0 3px 0 var(--coral-dark)', opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? t('common.loading') : t('auth.send_link')}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
