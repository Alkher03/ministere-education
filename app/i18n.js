'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import des traductions
import frCommon from '../public/locales/fr/common.json'
import arCommon from '../public/locales/ar/common.json'
import frNav from '../public/locales/fr/navigation.json'
import arNav from '../public/locales/ar/navigation.json'
import frHome from '../public/locales/fr/home.json'
import arHome from '../public/locales/ar/home.json'
import frFooter from '../public/locales/fr/footer.json'
import arFooter from '../public/locales/ar/footer.json'
import frProgrammes from '../public/locales/fr/programmes.json'
import arProgrammes from '../public/locales/ar/programmes.json'
import frMinistere from '../public/locales/fr/ministere.json'
import arMinistere from '../public/locales/ar/ministere.json'
import frSysteme from '../public/locales/fr/systeme.json'
import arSysteme from '../public/locales/ar/systeme.json'
import frMinistre from '../public/locales/fr/ministre.json'
import arMinistre from '../public/locales/ar/ministre.json'
import frActualites from '../public/locales/fr/actualites.json'
import arActualites from '../public/locales/ar/actualites.json'
import frPublications from '../public/locales/fr/publications.json'
import arPublications from '../public/locales/ar/publications.json'
const resources = {
  fr: {
    common: frCommon,
    navigation: frNav,
    home: frHome,
    footer: frFooter,
    programmes: frProgrammes,
    ministere: frMinistere,
    systeme: frSysteme,
    ministre: frMinistre,
    actualites: frActualites,
    publications: frPublications,




  },
  ar: {
    common: arCommon,
    navigation: arNav,
    home: arHome,
    footer: arFooter,
    programmes: arProgrammes,
    ministere: arMinistere,
    systeme: arSysteme,
    ministre: arMinistre,
    actualites: arActualites,
    publications: arPublications,




  },
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'fr',
      fallbackLng: 'fr',
      interpolation: {
        escapeValue: false,
      },
      ns: ['common', 'navigation', 'home', 'footer', 'programmes', 'ministere', 'systeme', 'ministre', 'actualites', 'publications'],
      defaultNS: 'common',
    })
}

export default i18n