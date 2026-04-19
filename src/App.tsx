import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useUserStore } from './stores/userStore'
import { useSettingsStore } from './stores/settingsStore'
import { useTranslation } from 'react-i18next'

import { Header } from './components/Header'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { VocabularyPage } from './modules/vocabulary/VocabularyPage'
import { ArcadeGame } from './modules/arcade/ArcadeGame'
import { CareerHub } from './modules/career/CareerHub'
import { PhaseRunner } from './modules/career/PhaseRunner'
import { PracticaPage } from './pages/PracticaPage'
import { TheoryIndex } from './modules/theory/TheoryIndex'
import { TheoryPage } from './modules/theory/TheoryPage'

async function checkTester(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch('/api/check-tester', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const data = await res.json()
    return data.isTester === true
  } catch {
    return false
  }
}

function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/', { replace: true }), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-[80svh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-4xl">🔐</div>
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    </div>
  )
}

function AppInner() {
  const { setUser, setSession, setLoading, setIsTester } = useUserStore()
  const { language } = useSettingsStore()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.access_token) {
        const tester = await checkTester(session.access_token)
        setIsTester(tester)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.access_token) {
        const tester = await checkTester(session.access_token)
        setIsTester(tester)
      } else {
        setIsTester(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [setSession, setUser, setLoading, setIsTester])

  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/play" element={<CareerHub />} />
          <Route path="/play/:phase" element={<PhaseRunner />} />
          <Route path="/arcade" element={<ArcadeGame />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/practica" element={<PracticaPage />} />
          <Route path="/teoria" element={<TheoryIndex />} />
          <Route path="/teoria/:bloque/:leccion" element={<TheoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default function App() {
  return <AppInner />
}
