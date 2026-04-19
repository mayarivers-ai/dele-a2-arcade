import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'

interface UserState {
  user: User | null
  session: Session | null
  isPremium: boolean
  isTester: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setIsPremium: (isPremium: boolean) => void
  setIsTester: (isTester: boolean) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  session: null,
  isPremium: false,
  isTester: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setIsPremium: (isPremium) => set({ isPremium }),
  setIsTester: (isTester) => set({ isTester }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, session: null, isPremium: false, isTester: false }),
}))
