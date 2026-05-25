// NE PAS importer supabase en haut du fichier
// Supprime cette ligne : import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // IMPORT DYNAMIQUE
    const { supabase } = await import('@/lib/supabase')
    
    const { data, error } = await supabase
      .from('admins')
      .select('*')

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ 
      success: true, 
      admins: data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Erreur:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}