import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUs from './locales/enUs.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUs,
    },
  },
  lng: 'en',
});
