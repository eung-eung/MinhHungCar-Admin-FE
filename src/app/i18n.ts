import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi', // Default language

        resources: {
            vi: {
                common: require('./locales/common.json'),
                // fuel: require('./locales/fuel.json'),

            },
        },
    });

export default i18n
