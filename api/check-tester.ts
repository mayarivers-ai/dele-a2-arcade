import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const testerEmails = process.env.TESTER_EMAILS ?? ''
  if (!testerEmails) return res.status(200).json({ isTester: false })

  const authHeader = req.headers.authorization ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return res.status(200).json({ isTester: false })

  const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_ANON_KEY ?? '',
  )
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user?.email) return res.status(200).json({ isTester: false })

  const allowed = testerEmails.split(',').map(e => e.trim().toLowerCase())
  const isTester = allowed.includes(user.email.toLowerCase())

  return res.status(200).json({ isTester })
}
