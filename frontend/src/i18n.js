import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en/common.json';
import hu from './i18n/hu/common.json';
import de from './i18n/de/common.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hu: { translation: hu },
      de: { translation: de },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 