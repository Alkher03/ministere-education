import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const supabase = getSupabase()
    
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