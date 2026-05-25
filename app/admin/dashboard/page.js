'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    actualites: 0,
    publications: 0,
    messages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    try {
      const [actualites, publications, messages] = await Promise.all([
        fetch('/api/admin/stats?table=actualites').then(r => r.json()),
        fetch('/api/admin/stats?table=publications').then(r => r.json()),
        fetch('/api/admin/stats?table=messages').then(r => r.json())
      ])
      setStats({
        actualites: actualites.count || 0,
        publications: publications.count || 0,
        messages: messages.count || 0
      })
    } catch (error) {
      console.error('Erreur stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">📋 Administration</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">📰</div>
            <div className="text-3xl font-bold text-blue-600">{stats.actualites}</div>
            <div className="text-gray-600">Actualités</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">📄</div>
            <div className="text-3xl font-bold text-green-600">{stats.publications}</div>
            <div className="text-gray-600">Publications</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">✉️</div>
            <div className="text-3xl font-bold text-purple-600">{stats.messages}</div>
            <div className="text-gray-600">Messages</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/admin/actualites" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📰</div>
            <div className="font-semibold text-gray-800">Gérer les actualités</div>
            <p className="text-sm text-gray-500">Ajouter, modifier, supprimer</p>
          </Link>
          <Link href="/admin/messages" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-semibold text-gray-800">Messages reçus</div>
            <p className="text-sm text-gray-500">Consulter les demandes</p>
          </Link>
        </div>

        {/* Accès rapide */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Accès rapide</h2>
          <div className="flex gap-4 flex-wrap">
            <Link href="/admin/actualites/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              + Nouvelle actualité
            </Link>
            <Link href="/admin/publications/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              + Nouvelle publication
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}