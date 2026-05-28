'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import './i18n'

export default function Home() {
  const { t, i18n } = useTranslation(['common', 'home'])
  const [actualites, setActualites] = useState([])
  const [publications, setPublications] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const isRTL = i18n.language === 'ar'
  const currentLang = i18n.language

  useEffect(() => {
    fetchData()
  }, [currentLang])

  const fetchData = async () => {
      setLoading(true)
      const supabase = getSupabase()  // ← ajouter cette ligne

    const { data: actus } = await supabase
      .from('actualites')
      .select('*')
      .order('date_publication', { ascending: false })
      .limit(5)

    const { data: pubs } = await supabase
      .from('publications')
      .select('*')
      .order('date_publication', { ascending: false })
      .limit(4)

    // Appliquer la traduction arabe si nécessaire
    let processedActus = actus || []
    if (currentLang === 'ar') {
      processedActus = processedActus.map(actu => ({
        ...actu,
        titre: actu.titre_ar || actu.titre,
        contenu: actu.contenu_ar || actu.contenu,
        categorie: actu.categorie_ar || actu.categorie,
      }))
    }

    setActualites(processedActus)
    setPublications(pubs || [])
    setLoading(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % actualites.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + actualites.length) % actualites.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-400">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero Section avec image de fond */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="relative z-10 flex items-center h-full px-6 md:px-12 max-w-6xl mx-auto">
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Image
              src="/logoTchad-1.png"
              alt="Blason du Tchad"
              width={200}
              height={200}
              className="object-contain"
            />
            <div className="text-black">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {t('ministry')}
              </h1>
              <p className="mt-2 text-sm md:text-lg text-black-200">
                {t('motto')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actualités */}
      <div className="px-8 py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('latestNews', { ns: 'home' })}
            </h2>
            <Link href="/actualites" className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-wider">
              {t('seeAll')} →
            </Link>
          </div>

          {actualites.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {actualites.map((actu) => (
                    <div key={actu.id} className="w-full flex-shrink-0">
                      <Link href={`/actualites/${actu.id}`}>
                        <div className="w-full h-[380px] overflow-hidden bg-gray-100">
                          <div className="flex flex-col md:flex-row">
                            {actu.image_url && (
                              <div className="md:w-2/5 h-56 md:h-auto bg-gray-50">
                                <img 
                                  src={actu.image_url} 
                                  alt={actu.titre}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className={`${actu.image_url ? 'md:w-3/5' : 'w-full'} p-5`}>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs text-gray-400">{actu.date_publication}</span>
                                <span className="text-xs text-blue-600 font-medium">{actu.categorie}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{actu.titre}</h3>
                              <p className="text-sm text-gray-500 line-clamp-2">{actu.contenu}</p>
                              <span className="inline-block mt-3 text-sm text-blue-700 font-medium">
                                {t('readMore')} →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {actualites.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-50 transition"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-50 transition"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <div className="flex justify-center gap-1.5 mt-4">
                {actualites.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {(!actualites || actualites.length === 0) && (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-400 text-sm">{t('noResults')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Discours du Ministre */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('ministerSpeech', { ns: 'home' })}
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-3" />
          </div>

          <div className={`flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Photo du ministre */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 h-full flex items-center justify-center p-6">
                <Image
                  src="/min.jpg"
                  alt="Dr Mahamat Ahmad Alhabo"
                  width={300}
                  height={300}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            </div>

            {/* Discours */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-5xl text-gray-300">"</div>
                <p className="text-sm text-blue-600 font-semibold">Dr Mahamat Ahmad Alhabo</p>
              </div>
              <p className="text-gray-700 leading-relaxed italic mb-4">
                {t('speechQuote', { ns: 'home' })}
              </p>
              <p className="text-gray-700 leading-relaxed italic">
                {t('speechText', { ns: 'home' })}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">— {t('ministerTitle', { ns: 'home' })}</p>
                <p className="text-xs text-gray-400">{t('takeOfficeDate', { ns: 'home' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="px-8 py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('officialPublications', { ns: 'home' })}
            </h2>
            <Link href="/publications" className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-wider">
              {t('seeAll')} →
            </Link>
          </div>

          {publications.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {publications.map((pub) => (
                <a
                  key={pub.id}
                  href={pub.fichier_url}
                  target="_blank"
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">📄</div>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{pub.titre}</h3>
                  <p className="text-xs text-gray-400">{pub.type_document} • {pub.date_publication}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-400 text-sm">{t('noResults')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="px-8 py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('keyFigures', { ns: 'home' })}
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-blue-700">12M+</div>
              <div className="text-xs text-gray-400 mt-1">{t('students', { ns: 'home' })}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-blue-700">800k+</div>
              <div className="text-xs text-gray-400 mt-1">{t('teachers', { ns: 'home' })}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-blue-700">60k+</div>
              <div className="text-xs text-gray-400 mt-1">{t('schools', { ns: 'home' })}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-blue-700">95%</div>
              <div className="text-xs text-gray-400 mt-1">{t('successRate', { ns: 'home' })}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accès rapides */}
      <div className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/programmes-projets" className="group block border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition text-center">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-medium text-gray-900 mb-1">{t('programs', { ns: 'home' })}</h3>
              <p className="text-xs text-gray-400">{t('discoverInitiatives', { ns: 'home' })}</p>
            </Link>
            <Link href="/contact" className="group block border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition text-center">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-medium text-gray-900 mb-1">{t('contactUs')}</h3>
              <p className="text-xs text-gray-400">{t('anyQuestion')}</p>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}