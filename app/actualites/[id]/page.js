'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function ActualiteDetail({ params }) {
  const [actualiteId, setActualiteId] = useState(null)
  const { i18n } = useTranslation('common')
  const [actu, setActu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const currentLang = i18n.language

  useEffect(() => {
    async function getId() {
      const resolved = await params
      setActualiteId(resolved.id)
    }
    getId()
  }, [params])

  useEffect(() => {
    if (actualiteId) {
      fetchActualite()
    }
  }, [actualiteId, currentLang])

  async function fetchActualite() {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .eq('id', actualiteId)
      .single()

    if (error || !data) {
      setError(true)
      setLoading(false)
      return
    }

    // ✅ La clé : choisir la bonne langue
    if (currentLang === 'ar') {
      setActu({
        ...data,
        titre: data.titre_ar || data.titre,
        contenu: data.contenu_ar || data.contenu,
        categorie: data.categorie_ar || data.categorie,
      })
    } else {
      setActu(data)
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">⏳ Chargement...</div>
      </div>
    )
  }

  if (error || !actu) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {currentLang === 'ar' ? 'المقال غير موجود' : 'Article non trouvé'}
          </h1>
          <Link href="/actualites">
            {currentLang === 'ar' ? 'العودة إلى الأخبار' : 'Retour aux actualités'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/actualites" className="text-blue-600 hover:underline mb-6 inline-block">
          ← {currentLang === 'ar' ? 'العودة إلى الأخبار' : 'Retour aux actualités'}
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {actu.image_url && (
            <div className="relative w-full h-96 bg-gray-100">
              <img 
                src={actu.image_url} 
                alt={actu.titre}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {actu.categorie}
              </span>
              <span className="text-gray-500 text-sm">
                📅 {new Date(actu.date_publication).toLocaleDateString(currentLang === 'ar' ? 'ar' : 'fr-FR')}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {actu.titre}
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {actu.contenu}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}