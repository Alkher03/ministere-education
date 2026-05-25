'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { i18n, t } = useTranslation('common')
  const [currentLang, setCurrentLang] = useState('fr')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'fr'
    setCurrentLang(savedLang)
    i18n.changeLanguage(savedLang)
    
    // Appliquer la direction RTL/LTR
    if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'fr'
    }
  }, [i18n])

  const switchLanguage = (locale) => {
    setCurrentLang(locale)
    localStorage.setItem('language', locale)
    i18n.changeLanguage(locale)
    
    // Changer la direction pour l'arabe
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'fr'
    }
    
    // NE PAS recharger la page, laisser i18n mettre à jour
    // window.location.reload()  ← Supprime cette ligne !!!
    
    // Forcer la mise à jour du routeur
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('fr')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
          currentLang === 'fr'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
          currentLang === 'ar'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        عربي
      </button>
    </div>
  )
}