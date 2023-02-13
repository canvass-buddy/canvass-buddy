import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUs from './locales/enUs.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: enUs,
    },
  },
  lng: 'en',
});
