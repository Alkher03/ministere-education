'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../i18n'

export default function ProgrammesProjets() {
  const { t, i18n } = useTranslation(['common', 'programmes'])
  const [activeFilter, setActiveFilter] = useState('tous')

  const isRTL = i18n.language === 'ar'
  const isFrench = i18n.language === 'fr'

  const programmes = [
    {
      id: 1,
      titre: t('program1Title', { ns: 'programmes' }),
      description: t('program1Desc', { ns: 'programmes' }),
      statut: "En cours",
    },
    {
      id: 2,
      titre: t('program2Title', { ns: 'programmes' }),
      description: t('program2Desc', { ns: 'programmes' }),
      statut: "En cours",
    },
    {
      id: 3,
      titre: t('program3Title', { ns: 'programmes' }),
      description: t('program3Desc', { ns: 'programmes' }),
      statut: "En cours",
    },
    {
      id: 4,
      titre: t('program4Title', { ns: 'programmes' }),
      description: t('program4Desc', { ns: 'programmes' }),
      statut: "Planifié",
    },
    {
      id: 5,
      titre: t('program5Title', { ns: 'programmes' }),
      description: t('program5Desc', { ns: 'programmes' }),
      statut: "En cours",
    },
    {
      id: 6,
      titre: t('program6Title', { ns: 'programmes' }),
      description: t('program6Desc', { ns: 'programmes' }),
      statut: "En cours",
    },
    {
      id: 7,
      titre: t('program7Title', { ns: 'programmes' }),
      description: t('program7Desc', { ns: 'programmes' }),
      statut: "Planifié",
    },
  ]

  const stats = [
    { valeur: "500+", label: t('statsSchools', { ns: 'programmes' }) },
    { valeur: "10 000+", label: t('statsTeachers', { ns: 'programmes' }) },
    { valeur: "200 000+", label: t('statsStudents', { ns: 'programmes' }) },
    { valeur: "95%", label: t('statsCompletion', { ns: 'programmes' }) },
  ]

  const domains = [
    { numero: "01", nom: t('domain1Name', { ns: 'programmes' }), desc: t('domain1Desc', { ns: 'programmes' }) },
    { numero: "02", nom: t('domain2Name', { ns: 'programmes' }), desc: t('domain2Desc', { ns: 'programmes' }) },
    { numero: "03", nom: t('domain3Name', { ns: 'programmes' }), desc: t('domain3Desc', { ns: 'programmes' }) },
    { numero: "04", nom: t('domain4Name', { ns: 'programmes' }), desc: t('domain4Desc', { ns: 'programmes' }) },
  ]

  const partenaires = ["UNESCO", "UNICEF", "Banque Mondiale", "PAM", "Coopération Française", "Union Européenne"]

  const filteredProgrammes = activeFilter === 'tous'
    ? programmes
    : programmes.filter(p => p.statut.toLowerCase() === activeFilter)

  return (
    <div className={`min-h-screen bg-white font-sans ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero - Centré */}
      <div className="px-8 pt-12 pb-8 border-b  border-gray-200 text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
          {t('ministry', { ns: 'common' })}
        </p>
        <h1
          className="text-4xl font-semibold text-gray-900 leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t('programmesTitle', { ns: 'programmes' })}
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          {t('programmesSubtitle', { ns: 'programmes' })}
        </p>
        <div className="w-10 h-0.5 bg-blue-700 mt-6 mx-auto" />
      </div>

      {/* Stats - Centrées */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-6 text-center border-r border-gray-200 last:border-r-0"
            >
              <div
                className="text-2xl font-semibold text-blue-700"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {stat.valeur}
              </div>
              <div className="text-xs text-gray-400 mt-1.5 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres - Centrés */}
      <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: t('filterAll', { ns: 'programmes' }), value: "tous" },
            { label: t('filterOngoing', { ns: 'programmes' }), value: "en cours" },
            { label: t('filterPlanned', { ns: 'programmes' }), value: "planifié" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition ${
                activeFilter === f.value
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-transparent text-gray-500 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des programmes - Centrée */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProgrammes.map((programme) => (
              <div
                key={programme.id}
                className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3
                    className="text-base font-semibold text-gray-900 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {programme.titre}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${
                      programme.statut === 'En cours'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {programme.statut === 'En cours' 
                      ? t('ongoing', { ns: 'programmes' }) 
                      : t('planned', { ns: 'programmes' })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{programme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domaines - Centrés */}
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="px-8">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-xl font-semibold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('projectsByDomain', { ns: 'programmes' })}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {domains.map((d) => (
                <div key={d.numero} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-xs tracking-widest uppercase font-semibold text-blue-700 mb-1">
                    {t('domain', { ns: 'programmes' })} {d.numero}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{d.nom}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partenaires - Centrés */}
      <div className="px-8 py-5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-xs tracking-widest uppercase text-gray-400">{t('partners', { ns: 'programmes' })}</span>
            {partenaires.map((p) => (
              <span key={p} className="text-sm font-medium text-gray-400">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA - Centré */}
      <div className="px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t('contributeTitle', { ns: 'programmes' })}
              </h3>
              <p className="text-sm text-gray-400">
                {t('contributeText', { ns: 'programmes' })}
              </p>
            </div>
            <Link
              href="/contact"
              className="text-sm font-medium bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition whitespace-nowrap"
            >
              {t('contactUs', { ns: 'common' })}
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}