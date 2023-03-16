import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '../data/en';
import { ua } from '../data/ua';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en
      },
      ua: {
        translation: ua
      },
    }
  });

export default i18n;