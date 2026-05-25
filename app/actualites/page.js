'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function ActualitesPage() {
  const { i18n, t } = useTranslation(['common', 'actualites'])
  const [actualites, setActualites] = useState([])
  const [filteredActualites, setFilteredActualites] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [loading, setLoading] = useState(true)

  const isRTL = i18n.language === 'ar'
  const currentLang = i18n.language

  useEffect(() => {
    fetchActualites()
  }, [])

  useEffect(() => {
    filterActualites()
  }, [selectedCategory, actualites, currentLang])

  async function fetchActualites() {
    const { data } = await supabase
      .from('actualites')
      .select('*')
      .order('date_publication', { ascending: false })

    setActualites(data || [])
    setLoading(false)
  }

  function filterActualites() {
    let filtered = [...actualites]
    
    // ✅ Appliquer la langue
    if (currentLang === 'ar') {
      filtered = filtered.map(actu => ({
        ...actu,
        titre: actu.titre_ar || actu.titre,
        contenu: actu.contenu_ar || actu.contenu,
        categorie: actu.categorie_ar || actu.categorie,
      }))
    }
    
    if (selectedCategory !== 'Toutes') {
      filtered = filtered.filter(a => a.categorie === selectedCategory)
    }
    
    setFilteredActualites(filtered)
  }

  const categories = ['Toutes', ...new Set(actualites.map(a => 
    currentLang === 'ar' ? (a.categorie_ar || a.categorie) : a.categorie
  ).filter(Boolean) || [])]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">{t('loading')}</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-8 pt-12 pb-8 border-b border-gray-200 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight mb-3">
          {t('pageTitle', { ns: 'actualites' })}
        </h1>
        <div className="w-10 h-0.5 bg-blue-700 mt-6 mx-auto" />
      </div>

      <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat === 'Toutes' ? t('all', { ns: 'actualites' }) : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des actualités */}
      <div className="px-8 py-12">
        {filteredActualites.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActualites.map((actu) => (
                <Link href={`/actualites/${actu.id}`} key={actu.id}>
                  <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition h-full flex flex-col">
                    {actu.image_url && (
                      <div className="h-48 overflow-hidden bg-gray-100">
                        <img 
                          src={actu.image_url} 
                          alt={actu.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400">{actu.date_publication}</span>
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                          {actu.categorie}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[40px]">
                        {actu.titre}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-3 flex-1 mt-1">
                        {actu.contenu}
                      </p>
                      <span className="inline-block mt-3 text-xs text-blue-600 font-medium group-hover:text-blue-800">
                        {t('readMore')} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 max-w-2xl mx-auto">
            <p className="text-gray-400">{t('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  )
}