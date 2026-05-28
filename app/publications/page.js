'use client'
import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function PublicationsPage() {
  const { t, i18n } = useTranslation(['common', 'publications'])
  const [publications, setPublications] = useState([])
  const [filteredPublications, setFilteredPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TOUTES CATEGORIES')

  const isRTL = i18n.language === 'ar'

  const categories = [
    'TOUTES CATEGORIES',
    'STATISTIQUES PUBLIQUES',
    'SCIENTIFIQUES',
    'RECHERCHES',
    'CONTRIBUTIONS',
    'PROJETS ET INITIATIVES',
    'LOIS & DÉCRETS'
  ]

  useEffect(() => {
    fetchPublications()
  }, [])

  useEffect(() => {
    filterPublications()
  }, [searchTerm, selectedCategory, publications])

  async function fetchPublications() {
      setLoading(true)
      const supabase = getSupabase()  // ← ajouter cette ligne
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('date_publication', { ascending: false })

    if (!error && data) {
      setPublications(data)
    }
    setLoading(false)
  }

  function filterPublications() {
    let filtered = [...publications]

    // Filtre par catégorie
    if (selectedCategory !== 'TOUTES CATEGORIES') {
      filtered = filtered.filter(pub => 
        pub.type_document?.toUpperCase() === selectedCategory.toUpperCase() ||
        pub.categorie?.toUpperCase() === selectedCategory.toUpperCase()
      )
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(pub =>
        pub.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.contenu?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPublications(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-4">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            {t('pageTitle', { ns: 'publications' })}
          </h1>
          <p className="text-center text-gray-500">
            {t('pageSubtitle', { ns: 'publications' })}
          </p>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-6"></div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder', { ns: 'publications' })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="container mx-auto px-4 py-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(cat, { ns: 'publications' })}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des publications */}
      <div className="container mx-auto px-4 py-12">
        {filteredPublications.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredPublications.map((pub) => (
              <div key={pub.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6">
                {/* Date et catégorie */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm text-gray-500">
                    {new Date(pub.date_publication).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm text-blue-600 font-medium">
                    {pub.type_document || t('publication', { ns: 'publications' })}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition">
                  <Link href={pub.fichier_url || '#'} target="_blank">
                    {pub.titre}
                  </Link>
                </h2>

                {/* Description */}
                {pub.contenu && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {pub.contenu}
                  </p>
                )}

                {/* Bouton lire la publication */}
                <a
                  href={pub.fichier_url}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  {t('readPublication', { ns: 'publications' })}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200 max-w-2xl mx-auto">
            <p className="text-gray-500">{t('noResults')}</p>
            <p className="text-sm text-gray-400 mt-2">{t('noResultsHint', { ns: 'publications' })}</p>
          </div>
        )}
      </div>

      {/* Section À LA UNE */}
      {filteredPublications.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {t('featured', { ns: 'publications' })}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                      {t('featured', { ns: 'publications' })}
                    </span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-sm text-gray-500">
                      {filteredPublications[0]?.date_publication}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {filteredPublications[0]?.titre}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {filteredPublications[0]?.contenu?.substring(0, 200)}...
                  </p>
                  <a
                    href={filteredPublications[0]?.fichier_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {t('readPublication', { ns: 'publications' })}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}