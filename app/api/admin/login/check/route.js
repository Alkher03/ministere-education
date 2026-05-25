// NE PAS importer supabase en haut du fichier
// Supprime cette ligne si elle existe : import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    // IMPORT DYNAMIQUE - La clé pour que ça fonctionne sur Vercel
    const { supabase } = await import('@/lib/supabase')
    
    const { email, password } = await request.json()

    console.log('🔍 Recherche:', email)

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    console.log('📊 Résultat:', data)

    if (error) {
      console.log('Erreur Supabase:', error.message)
      return Response.json({ error: 'Erreur de base de données' }, { status: 500 })
    }

    if (!data) {
      console.log('Utilisateur non trouvé')
      return Response.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    if (data.password !== password) {
      console.log('Mot de passe incorrect')
      return Response.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    console.log('✅ Connexion réussie')
    return Response.json({ success: true, token })
  } catch (error) {
    console.error('Erreur:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}