import { supabase } from './supabase'
import type { ReadingExercise, GrammarExercise } from '../types'

async function getAuthHeader(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return {}
  return { Authorization: `Bearer ${session.access_token}` }
}

export async function fetchAIReading(): Promise<ReadingExercise> {
  const authHeader = await getAuthHeader()
  const res = await fetch('/api/generate-exercise', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader },
    body: JSON.stringify({ type: 'reading' }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchAIGrammar(): Promise<GrammarExercise> {
  const authHeader = await getAuthHeader()
  const res = await fetch('/api/generate-exercise', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader },
    body: JSON.stringify({ type: 'grammar' }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
