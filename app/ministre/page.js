'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function Ministre() {
  const { t, i18n } = useTranslation(['common', 'ministre'])
  const isRTL = i18n.language === 'ar'

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero avec image de fond */}
      <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/min.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-3xl">
              <span className="text-xs tracking-widest uppercase text-blue-300 mb-3 block">
                {t('authority', { ns: 'ministre' })}
              </span>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t('heroTitle', { ns: 'ministre' })}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
                {t('heroQuestion', { ns: 'ministre' })}
              </p>
              <div className="w-12 h-0.5 bg-blue-400 mb-6" />
              <p className="text-white/70 text-base leading-relaxed">
                {t('heroText', { ns: 'ministre' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message de bienvenue - Passation de service */}
      <div className="px-8 py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-blue-500 rounded-full" />
              <h2 
                className="text-2xl font-semibold text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t('passationTitle', { ns: 'ministre' })}
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('passationText1', { ns: 'ministre' })}
              <span className="font-semibold text-gray-900"> {t('ministerName', { ns: 'ministre' })}</span>
              {t('passationText2', { ns: 'ministre' })}
              <span className="font-semibold text-gray-900"> {t('secretaryName', { ns: 'ministre' })}</span>
              {t('passationText3', { ns: 'ministre' })}
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('passationCeremony1', { ns: 'ministre' })}
              <span className="font-semibold text-gray-900"> {t('ceremonyPresident', { ns: 'ministre' })}</span>
              {t('passationCeremony2', { ns: 'ministre' })}
              <span className="font-semibold text-gray-900"> {t('outgoingMinister', { ns: 'ministre' })}</span>
              {t('passationCeremony3', { ns: 'ministre' })}
            </p>
            
            {/* Citation du ministre */}
            <div className="bg-white border-l-4 border-blue-500 p-5 my-5 rounded-r-lg">
              <p className="text-gray-800 italic leading-relaxed">
                « <span className="font-semibold">{t('quote', { ns: 'ministre' })}</span> »
              </p>
              <p className="text-sm text-gray-500 mt-2">— {t('quoteAuthor', { ns: 'ministre' })}</p>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {t('quoteExplanation', { ns: 'ministre' })}
            </p>
          </div>
        </div>
      </div>

      {/* Biographie du ministre */}
      <div className="px-8 py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo du ministre */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src="/SGP_Mahamat_Alhabbo.jpg" 
                  alt="Dr Mahamat Ahmad Alhabo"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Biographie */}
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                <h2 
                  className="text-2xl font-semibold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {t('bioTitle', { ns: 'ministre' })}
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('ministerName', { ns: 'ministre' })}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {t('birthInfo', { ns: 'ministre' })}
              </p>
              
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-800">{t('ministerName', { ns: 'ministre' })}</span>
                  {t('bioIntro', { ns: 'ministre' })}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('educationTitle', { ns: 'ministre' })}</h4>
                  <p>{t('educationText', { ns: 'ministre' })}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('careerTitle', { ns: 'ministre' })}</h4>
                  <p>{t('careerText1', { ns: 'ministre' })}</p>
                  <p className="mt-2">{t('careerText2', { ns: 'ministre' })}</p>
                  <p className="mt-2">{t('careerText3', { ns: 'ministre' })}</p>
                  <p className="mt-2">{t('careerText4', { ns: 'ministre' })}</p>
                  <p className="mt-2">{t('careerText5', { ns: 'ministre' })}</p>
                  <p className="mt-2">{t('careerText6', { ns: 'ministre' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Citation finale */}
      <div className="bg-gray-900 text-white py-16">
        <div className="px-8 max-w-3xl mx-auto text-center">
          <div className="text-5xl text-gray-500 mb-4">"</div>
          <p className="text-lg md:text-xl italic leading-relaxed mb-5">
            {t('finalQuote', { ns: 'ministre' })}
          </p>
          <p className="text-sm text-gray-300">— {t('finalQuoteAuthor', { ns: 'ministre' })}</p>
        </div>
      </div>

      {/* Liens */}
      <div className="px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/systeme-educatif" 
            className="text-sm bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t('discoverSystem', { ns: 'ministre' })}
          </Link>
          <Link 
            href="/publications" 
            className="text-sm border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:border-gray-400 transition"
          >
            {t('seePublications', { ns: 'ministre' })}
          </Link>
        </div>
      </div>

    </div>
  )
}