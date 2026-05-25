'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function Ministere() {
  const { t, i18n } = useTranslation(['common', 'ministere'])
  const isRTL = i18n.language === 'ar'

  const organigramme = {
    cabinets: [
      t('cabinet1', { ns: 'ministere' }),
      t('cabinet2', { ns: 'ministere' }),
      t('cabinet3', { ns: 'ministere' }),
      t('cabinet4', { ns: 'ministere' }),
      t('cabinet5', { ns: 'ministere' })
    ],
    secretariatGeneral: [
      t('sg1', { ns: 'ministere' }),
      t('sg2', { ns: 'ministere' }),
      t('sg3', { ns: 'ministere' }),
      t('sg4', { ns: 'ministere' }),
      t('sg5', { ns: 'ministere' }),
      t('sg6', { ns: 'ministere' })
    ],
    directions: [
      t('dir1', { ns: 'ministere' }),
      t('dir2', { ns: 'ministere' }),
      t('dir3', { ns: 'ministere' }),
      t('dir4', { ns: 'ministere' }),
      t('dir5', { ns: 'ministere' }),
      t('dir6', { ns: 'ministere' }),
      t('dir7', { ns: 'ministere' }),
      t('dir8', { ns: 'ministere' }),
      t('dir9', { ns: 'ministere' }),
      t('dir10', { ns: 'ministere' })
    ]
  }

  const servicesDetaches = [
    {
      titre: t('services1Title', { ns: 'ministere' }),
      description: t('services1Desc', { ns: 'ministere' })
    },
    {
      titre: t('services2Title', { ns: 'ministere' }),
      description: t('services2Desc', { ns: 'ministere' })
    },
    {
      titre: t('services3Title', { ns: 'ministere' }),
      description: t('services3Desc', { ns: 'ministere' })
    }
  ]

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero avec image de fond */}
      <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/building.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-3xl">
              <span className="text-xs tracking-widest uppercase text-blue-300 mb-3 block">
                {t('authority', { ns: 'ministere' })}
              </span>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t('pageTitle', { ns: 'ministere' })}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
                {t('heroQuestion', { ns: 'ministere' })}
              </p>
              <div className="w-12 h-0.5 bg-blue-400 mb-6" />
              <p className="text-white/70 text-base leading-relaxed">
                {t('heroText', { ns: 'ministere' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organisation générale */}
      <div className="px-8 py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('organisationTitle', { ns: 'ministere' })}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('organisationSubtitle', { ns: 'ministere' })}
            </p>
            <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Cabinets */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('cabinetsTitle', { ns: 'ministere' })}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t('cabinetsSub', { ns: 'ministere' })}</p>
              </div>
              <ul className="p-5 space-y-2">
                {organigramme.cabinets.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-0.5">—</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secrétariat Général */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('secretariatTitle', { ns: 'ministere' })}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t('secretariatSub', { ns: 'ministere' })}</p>
              </div>
              <ul className="p-5 space-y-2">
                {organigramme.secretariatGeneral.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-0.5">—</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Directions */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('directionsTitle', { ns: 'ministere' })}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t('directionsSub', { ns: 'ministere' })}</p>
              </div>
              <ul className="p-5 space-y-2 max-h-64 overflow-y-auto">
                {organigramme.directions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-0.5">—</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Services détachés */}
      <div className="bg-gray-50 border-t border-b border-gray-200 py-16">
        <div className="px-8 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 
              className="text-2xl font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('servicesTitle', { ns: 'ministere' })}
            </h2>
            <p className="text-gray-500 text-sm">{t('servicesSubtitle', { ns: 'ministere' })}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {servicesDetaches.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">
                <h3 className="text-md font-semibold text-gray-900 mb-2">{service.titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organigramme visuel simplifié */}
      <div className="px-8 py-16 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 
            className="text-2xl font-semibold text-gray-900 text-center mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t('organigrammeTitle', { ns: 'ministere' })}
          </h2>
          
          <div className="text-center mb-6">
            <div className="inline-block bg-gray-900 text-white rounded-lg px-6 py-3">
              <h3 className="text-md font-semibold">{t('minister', { ns: 'ministere' })}</h3>
              <p className="text-xs text-gray-300">{t('ministerTitle', { ns: 'ministere' })}</p>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-px h-6 bg-gray-300"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 text-sm">{t('cabinetsShort', { ns: 'ministere' })}</h4>
              <p className="text-xs text-gray-400 mt-1">{t('cabinetsCount', { ns: 'ministere' })}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 text-sm">{t('secretariatShort', { ns: 'ministere' })}</h4>
              <p className="text-xs text-gray-400 mt-1">{t('secretariatCount', { ns: 'ministere' })}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 text-sm">{t('directionsShort', { ns: 'ministere' })}</h4>
              <p className="text-xs text-gray-400 mt-1">{t('directionsCount', { ns: 'ministere' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Citation */}
      <div className="bg-gray-900 text-white py-16">
        <div className="px-8 max-w-3xl mx-auto text-center">
          <div className="text-5xl text-gray-500 mb-4">"</div>
          <p className="text-lg md:text-xl italic leading-relaxed mb-5">
            {t('quote', { ns: 'ministere' })}
          </p>
          <p className="text-sm text-gray-300">— {t('quoteAuthor', { ns: 'ministere' })}</p>
        </div>
      </div>

      {/* Liens */}
      <div className="px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/systeme-educatif" 
            className="text-sm bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t('discoverSystem', { ns: 'ministere' })}
          </Link>
          <Link 
            href="/publications" 
            className="text-sm border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:border-gray-400 transition"
          >
            {t('seePublications', { ns: 'ministere' })}
          </Link>
        </div>
      </div>

    </div>
  )
}