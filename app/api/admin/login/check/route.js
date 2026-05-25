import { supabase } from '@/lib/supabase'

export async function GET() {
  // Récupérer tous les admins
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
}