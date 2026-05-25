'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function SystemeEducatif() {
  const { t, i18n } = useTranslation(['common', 'systeme'])
  const isRTL = i18n.language === 'ar'

  const niveaux = [
    {
      id: 1,
      titre: t('niveau1Title', { ns: 'systeme' }),
      description: t('niveau1Desc', { ns: 'systeme' }),
      duree: t('niveau1Duree', { ns: 'systeme' }),
      etablissements: t('niveau1Etablissements', { ns: 'systeme' })
    },
    {
      id: 2,
      titre: t('niveau2Title', { ns: 'systeme' }),
      description: t('niveau2Desc', { ns: 'systeme' }),
      duree: t('niveau2Duree', { ns: 'systeme' }),
      etablissements: t('niveau2Etablissements', { ns: 'systeme' })
    },
    {
      id: 3,
      titre: t('niveau3Title', { ns: 'systeme' }),
      description: t('niveau3Desc', { ns: 'systeme' }),
      duree: t('niveau3Duree', { ns: 'systeme' }),
      etablissements: t('niveau3Etablissements', { ns: 'systeme' })
    },
    {
      id: 4,
      titre: t('niveau4Title', { ns: 'systeme' }),
      description: t('niveau4Desc', { ns: 'systeme' }),
      duree: t('niveau4Duree', { ns: 'systeme' }),
      etablissements: t('niveau4Etablissements', { ns: 'systeme' })
    },
    {
      id: 5,
      titre: t('niveau5Title', { ns: 'systeme' }),
      description: t('niveau5Desc', { ns: 'systeme' }),
      duree: t('niveau5Duree', { ns: 'systeme' }),
      etablissements: t('niveau5Etablissements', { ns: 'systeme' })
    }
  ]

  const programmesSpeciaux = [
    {
      titre: t('program1Title', { ns: 'systeme' }),
      description: t('program1Desc', { ns: 'systeme' })
    },
    {
      titre: t('program2Title', { ns: 'systeme' }),
      description: t('program2Desc', { ns: 'systeme' })
    },
    {
      titre: t('program3Title', { ns: 'systeme' }),
      description: t('program3Desc', { ns: 'systeme' })
    }
  ]

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero - Centré */}
      <div className="px-8 pt-12 pb-8 border-b border-gray-200  text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
          {t('ministry', { ns: 'common' })}
        </p>
        <h1
          className="text-4xl  md:text-5xl font-semibold text-gray-900 leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t('pageTitle', { ns: 'systeme' })}
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          {t('pageSubtitle', { ns: 'systeme' })}
        </p>
        <div className="w-10 h-0.5 bg-blue-700 mt-6 mx-auto" />
      </div>

      {/* Introduction - Centrée */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <h2
              className="text-xl font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('introTitle', { ns: 'systeme' })}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('introText', { ns: 'systeme' })}
            </p>
          </div>
        </div>
      </div>

      {/* Niveaux d'enseignement - Centré */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-xl font-semibold text-gray-900 mb-6 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t('niveauxTitle', { ns: 'systeme' })}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {niveaux.map((niveau) => (
              <div key={niveau.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                <h3 className="text-md font-semibold text-gray-900 mb-2">{niveau.titre}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  <span className="font-medium text-gray-500">{t('duration', { ns: 'systeme' })} :</span> {niveau.duree}
                </p>
                <p className="text-sm text-gray-500 mb-2 leading-relaxed">{niveau.description}</p>
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-gray-500">{t('establishments', { ns: 'systeme' })} :</span> {niveau.etablissements}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programmes spécifiques - Centré */}
      <div className="bg-gray-50 border-t border-b border-gray-200 py-8">
        <div className="px-8">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-xl font-semibold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('programmesTitle', { ns: 'systeme' })}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {programmesSpeciaux.map((programme, index) => (
                <div key={index} className="bg-white border-l-4 border-blue-500 rounded-r-xl p-5 shadow-sm">
                  <h3 className="text-md font-semibold text-gray-900 mb-2">{programme.titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{programme.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Organisation pyramidale - Centré */}
      <div className="px-8 py-8 border-b border-gray-200">
        <h2
          className="text-xl font-semibold text-gray-900 mb-8 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t('pyramidTitle', { ns: 'systeme' })}
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-lg px-6 py-3">
                <h3 className="font-semibold text-gray-800 text-sm">{t('prescolaire', { ns: 'systeme' })}</h3>
                <p className="text-xs text-gray-400">{t('prescolaireSub', { ns: 'systeme' })}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gray-300"></div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-lg px-6 py-3">
                <h3 className="font-semibold text-gray-800 text-sm">{t('fondamental', { ns: 'systeme' })}</h3>
                <p className="text-xs text-gray-400">{t('fondamentalSub', { ns: 'systeme' })}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gray-300"></div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-lg px-6 py-3">
                <h3 className="font-semibold text-gray-800 text-sm">{t('secondaire', { ns: 'systeme' })}</h3>
                <p className="text-xs text-gray-400">{t('secondaireSub', { ns: 'systeme' })}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gray-300"></div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-lg px-6 py-3">
                <h3 className="font-semibold text-gray-800 text-sm">{t('superieur', { ns: 'systeme' })}</h3>
                <p className="text-xs text-gray-400">{t('superieurSub', { ns: 'systeme' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chiffres clés - Centré */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="px-8">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-xl font-semibold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('statsTitle', { ns: 'systeme' })}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-semibold text-blue-600">3M+</div>
                <div className="text-xs text-gray-400 mt-1">{t('statsStudents', { ns: 'systeme' })}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-semibold text-blue-600">30k+</div>
                <div className="text-xs text-gray-400 mt-1">{t('statsTeachers', { ns: 'systeme' })}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-semibold text-blue-600">0.5k+</div>
                <div className="text-xs text-gray-400 mt-1">{t('statsSchools', { ns: 'systeme' })}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-semibold text-blue-600">95%</div>
                <div className="text-xs text-gray-400 mt-1">{t('statsAccess', { ns: 'systeme' })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lien ressources - Centré */}
      <div className="px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <h3
              className="text-lg font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('resourcesTitle', { ns: 'systeme' })}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('resourcesText', { ns: 'systeme' })}
            </p>
            <Link
              href="/publications"
              className="inline-block bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t('seePublications', { ns: 'systeme' })}
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}