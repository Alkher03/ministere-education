'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

export default function NewPublication() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({
    titre: '',
    type_document: '',
    date_publication: new Date().toISOString().split('T')[0],
    fichier_url: ''
  })

  const typesDocument = [
    'Décret',
    'Arrêté',
    'Circulaire',
    'Rapport',
    'Statistique',
    'Brochure',
    'Loi',
    'Programme'
  ]

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Veuillez sélectionner un fichier PDF valide')
      setFile(null)
    }
  }

  const uploadFile = async () => {
    if (!file) return null

    setUploading(true)
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`

    const { error: uploadError } = await supabase.storage
      .from('publications')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Erreur upload:', uploadError)
      setUploading(false)
      return null
    }

    const { data: publicUrl } = supabase.storage
      .from('publications')
      .getPublicUrl(fileName)

    setUploading(false)
    return publicUrl.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Upload du fichier
    let fileUrl = ''
    if (file) {
      fileUrl = await uploadFile()
      if (!fileUrl) {
        setError('Erreur lors de l\'upload du fichier')
        setLoading(false)
        return
      }
    }

    // Insertion dans la base
    const { error: insertError } = await supabase
      .from('publications')
      .insert([{
        titre: form.titre,
        type_document: form.type_document,
        date_publication: form.date_publication,
        fichier_url: fileUrl
      }])

    if (insertError) {
      setError('Erreur: ' + insertError.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
              Administration
            </p>
            <h1
              className="text-2xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Nouvelle publication
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Ajouter un document officiel
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            ← Retour
          </Link>
        </div>
        <div className="w-10 h-0.5 bg-blue-700 mt-4" />
      </div>

      {/* Formulaire */}
      <div className="px-8 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre de la publication *
            </label>
            <input
              type="text"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm"
              placeholder="Ex: Rapport annuel 2024"
            />
          </div>

          {/* Type de document */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de document *
            </label>
            <select
              value={form.type_document}
              onChange={(e) => setForm({ ...form, type_document: e.target.value })}
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm"
            >
              <option value="">Sélectionner un type</option>
              {typesDocument.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de publication
            </label>
            <input
              type="date"
              value={form.date_publication}
              onChange={(e) => setForm({ ...form, date_publication: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>

          {/* Fichier PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fichier PDF *
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <p className="text-xs text-gray-400 mt-1">Format accepté : PDF uniquement</p>
          </div>

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {uploading ? 'Upload en cours...' : loading ? 'Publication...' : 'Publier'}
            </button>
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 text-gray-600 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>

      {/* Info */}
      <div className="px-8 py-6 border-t border-gray-100">
        <div className="bg-gray-50 rounded-lg p-4 max-w-2xl">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            À savoir
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Les publications apparaîtront automatiquement sur la page "Publications"</li>
            <li>• Les fichiers PDF sont stockés dans Supabase Storage</li>
            <li>• Vous pouvez gérer les publications existantes depuis le tableau de bord</li>
          </ul>
        </div>
      </div>

    </div>
  )
}