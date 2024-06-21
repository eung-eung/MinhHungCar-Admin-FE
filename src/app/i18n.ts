import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'mapping', // Default language

        resources: {
            mapping: {
                common: require('./locales/common.json'),
                carStatus: require('./locales/carStatus.json')
            },
        },
    });

export default i18n
