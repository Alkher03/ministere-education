'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getSupabase } from '@/lib/supabase'

export default function NewActualite() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  
  // Version française (obligatoire)
  const [formFr, setFormFr] = useState({
    titre: '',
    contenu: '',
    categorie: '',
    date_publication: new Date().toISOString().split('T')[0],
    image_url: ''
  })
  
  // Version arabe (optionnelle)
  const [hasArTranslation, setHasArTranslation] = useState(false)
  const [formAr, setFormAr] = useState({
    titre: '',
    contenu: '',
    categorie: ''
  })

  // État pour l'image
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Gérer la sélection de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Upload de l'image vers Supabase Storage
  const uploadImage = async () => {
    if (!imageFile) return null
    
    setUploading(true)
    const fileName = `${Date.now()}-${imageFile.name}`
    
    // Upload vers le bucket 'actualites-images'
    const { data, error } = await supabase.storage
      .from('actualites-images')
      .upload(fileName, imageFile)

    if (error) {
      console.error('Erreur upload:', error)
      setError("Erreur lors de l'upload de l'image: " + error.message)
      setUploading(false)
      return null
    }

    // Récupérer l'URL publique
    const { data: publicUrl } = supabase.storage
      .from('actualites-images')
      .getPublicUrl(fileName)

    setUploading(false)
    return publicUrl.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Upload de l'image si présente
    let imageUrl = ''
    if (imageFile) {
      imageUrl = await uploadImage()
      if (!imageUrl && imageFile) {
        setError("Erreur lors de l'upload de l'image")
        setLoading(false)
        return
      }
    }

    // 1. Insérer l'actualité en français
    const { data: actuData, error: actuError } = await supabase
      .from('actualites')
      .insert([{
        titre: formFr.titre,
        contenu: formFr.contenu,
        categorie: formFr.categorie,
        date_publication: formFr.date_publication,
        image_url: imageUrl,
        has_ar_translation: hasArTranslation
      }])
      .select()
      .single()

    if (actuError) {
      setError('Erreur: ' + actuError.message)
      setLoading(false)
      return
    }

    // 2. Si traduction arabe, l'insérer
    if (hasArTranslation && formAr.titre && formAr.contenu) {
      const { error: traductionError } = await supabase
        .from('actualites_traductions')
        .insert([{
          actualite_id: actuData.id,
          langue: 'ar',
          titre: formAr.titre,
          contenu: formAr.contenu,
          categorie: formAr.categorie
        }])

      if (traductionError) {
        console.error('Erreur traduction:', traductionError)
      }
    }

    router.push('/admin/actualites')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">➕ Nouvelle actualité</h1>
          <Link href="/admin/actualites" className="text-gray-600 hover:text-gray-800">
            ← Retour
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          
          {/* Version Française (obligatoire) */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">🇫🇷 Version Française (obligatoire)</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Titre *</label>
                <input
                  type="text"
                  value={formFr.titre}
                  onChange={(e) => setFormFr({...formFr, titre: e.target.value})}
                  required
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Catégorie *</label>
                <select
                  value={formFr.categorie}
                  onChange={(e) => setFormFr({...formFr, categorie: e.target.value})}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Sélectionner</option>
                  <option value="Annonce">Annonce</option>
                  <option value="Actualité">Actualité</option>
                  <option value="Programme">Programme</option>
                  <option value="Coopération internationale">Coopération internationale</option>
                  <option value="Événement">Événement</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Date</label>
                <input
                  type="date"
                  value={formFr.date_publication}
                  onChange={(e) => setFormFr({...formFr, date_publication: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Upload d'image */}
              <div>
                <label className="block font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="h-32 w-auto rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="text-red-600 text-sm mt-1 hover:underline"
                    >
                      Supprimer l'image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Contenu *</label>
                <textarea
                  value={formFr.contenu}
                  onChange={(e) => setFormFr({...formFr, contenu: e.target.value})}
                  required
                  rows="8"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Option traduction arabe */}
          <div className="border-b pb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasArTranslation}
                onChange={(e) => setHasArTranslation(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-semibold">🇸🇦 Ajouter une traduction en arabe (optionnel)</span>
            </label>
          </div>

          {/* Version Arabe (optionnelle) */}
          {hasArTranslation && (
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">🇸🇦 Version Arabe (optionnel)</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">العنوان (Titre)</label>
                  <input
                    type="text"
                    value={formAr.titre}
                    onChange={(e) => setFormAr({...formAr, titre: e.target.value})}
                    className="w-full p-2 border rounded"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">الفئة (Catégorie)</label>
                  <input
                    type="text"
                    value={formAr.categorie}
                    onChange={(e) => setFormAr({...formAr, categorie: e.target.value})}
                    className="w-full p-2 border rounded"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">المحتوى (Contenu)</label>
                  <textarea
                    value={formAr.contenu}
                    onChange={(e) => setFormAr({...formAr, contenu: e.target.value})}
                    rows="8"
                    className="w-full p-2 border rounded"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Upload image...' : loading ? 'Publication...' : 'Publier'}
            </button>
            <Link href="/admin/actualites" className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}