'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const { error } = await supabase.from('messages').insert([form])

    if (error) {
      setStatus({ type: 'error', message: '❌ Erreur lors de l\'envoi. Veuillez réessayer.' })
    } else {
      setStatus({ type: 'success', message: '✅ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.' })
      setForm({ nom: '', email: '', sujet: '', message: '' })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contactez-nous</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Nom complet *</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Sujet *</label>
              <input
                type="text"
                name="sujet"
                value={form.sujet}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
            
            {status && (
              <div className={`p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Coordonnées */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nos coordonnées</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">📍 Adresse</h3>
              <p className="text-gray-600">Ministère de l'Éducation<br/>N'djamena Tchad</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">📞 Téléphone</h3>
              <p className="text-gray-600">22 51 93 24</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">✉️ Email</h3>
              <p className="text-gray-600">tchadeducation@yahoo.fr</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">🕒 Horaires</h3>
              <p className="text-gray-600">Lundi au vendredi : 7h00 - 15h30</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Pour toute question relative aux examens, aux inscriptions ou aux programmes scolaires, 
              vous pouvez également contacter votre rectorat régional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}