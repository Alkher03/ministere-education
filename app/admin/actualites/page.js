'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

export default function AdminActualites() {
  const [actualites, setActualites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActualites()
  }, [])

  const fetchActualites = async () => {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .order('date_publication', { ascending: false })

    if (!error && data) {
      setActualites(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return

    const { error } = await supabase.from('actualites').delete().eq('id', id)
    if (!error) {
      fetchActualites()
    } else {
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) return <div className="text-center py-20">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">📰 Gestion des actualités</h1>
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
            ← Retour
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-right">
          <Link
            href="/admin/actualites/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nouvelle actualité
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {actualites.map((actu) => (
                <tr key={actu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{actu.titre}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {actu.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{actu.date_publication}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleDelete(actu.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️ Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}