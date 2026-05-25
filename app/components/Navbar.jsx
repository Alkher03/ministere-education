'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import '../i18n'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation('navigation')

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/actualites', label: t('actualites') },
    { href: '/ministere', label: t('ministere') },
    { href: '/ministre', label: t('ministre') },
    { href: '/systeme-educatif', label: t('systemeEducatif') },
    { href: '/programmes-projets', label: t('programmesProjets') },
    { href: '/publications', label: t('publications') },
    { href: '/medias', label: t('medias') },
    { href: '/galeries', label: t('galeries') },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 lg:px-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Espace vide à gauche pour équilibrer */}
          <div className="w-10 lg:w-32"></div>

          {/* Liens desktop centrés */}
          <div className="hidden lg:flex items-center gap-1 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs font-medium tracking-wide px-3 py-1.5 rounded transition ${
                  pathname === link.href
                    ? 'text-blue-700'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-blue-700 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* LanguageSwitcher à droite */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Version mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
              className="flex flex-col justify-center gap-1.5 p-2 group"
            >
              <span className={`block h-px w-5 bg-gray-600 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-5 bg-gray-600 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-gray-600 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white pb-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-6 py-3 text-sm border-b border-gray-100 transition ${
                pathname === link.href
                  ? 'text-blue-700 font-medium bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="w-1 h-1 rounded-full bg-blue-700" />
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}