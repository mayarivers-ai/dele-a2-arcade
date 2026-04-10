import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useUserStore } from './stores/userStore'
import { useSettingsStore } from './stores/settingsStore'
import { useTranslation } from 'react-i18next'

import { Header } from './components/Header'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { VocabularyPage } from './modules/vocabulary/VocabularyPage'
import { ArcadeGame } from './modules/arcade/ArcadeGame'
import { ReadingPage } from './modules/reading/ReadingPage'
import { GrammarPage } from './modules/grammar/GrammarPage'
import { ExamPage } from './modules/exam/ExamPage'

function AppInner() {
  const { setUser, setSession, setLoading } = useUserStore()
  const { language } = useSettingsStore()
  const { i18n } = useTranslation()

  // Sync language setting → i18n on mount
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  // Supabase auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [setSession, setUser, setLoading])

  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/arcade" element={<ArcadeGame />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/exam" element={<ExamPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default function App() {
  return <AppInner />
}
