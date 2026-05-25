import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validation avec message clair
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erreur de configuration Supabase:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Défini' : '✗ Manquant')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Défini' : '✗ Manquant')
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Configuration Supabase manquante. Vérifie les variables d\'environnement sur Vercel.')
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)