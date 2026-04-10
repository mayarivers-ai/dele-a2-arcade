import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Region, Language } from '../types'

interface SettingsState {
  language: Language
  region: Region
  timerDuration: 60 | 90 | 120
  gameLevel: 'A1' | 'A2'
  setLanguage: (lang: Language) => void
  setRegion: (region: Region) => void
  setTimerDuration: (duration: 60 | 90 | 120) => void
  setGameLevel: (level: 'A1' | 'A2') => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'ru',
      region: 'espana',
      timerDuration: 90,
      gameLevel: 'A2',
      setLanguage: (language) => set({ language }),
      setRegion: (region) => set({ region }),
      setTimerDuration: (timerDuration) => set({ timerDuration }),
      setGameLevel: (gameLevel) => set({ gameLevel }),
    }),
    { name: 'dele-settings' }
  )
)
