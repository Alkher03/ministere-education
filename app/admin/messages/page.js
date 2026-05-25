'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('date_envoi', { ascending: false })

    if (!error && data) {
      setMessages(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    await supabase.from('messages').delete().eq('id', id)
    fetchMessages()
  }

  const handleMarkAsRead = async (id, lu) => {
    await supabase.from('messages').update({ lu: !lu }).eq('id', id)
    fetchMessages()
  }

  if (loading) return <div className="text-center py-20">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">💬 Messages reçus</h1>
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
            ← Retour
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sujet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id} className={!msg.lu ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4">{msg.nom}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="px-6 py-4">{msg.sujet}</td>
                  <td className="px-6 py-4 text-sm">{new Date(msg.date_envoi).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleMarkAsRead(msg.id, msg.lu)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {msg.lu ? '📖' : '🔴'}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
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