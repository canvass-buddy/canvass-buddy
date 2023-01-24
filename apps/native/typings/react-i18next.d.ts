import 'i18next';
import enUs from '../src/i18n/locales/enUs.json';

declare type Smorgle = 'hello' | 'world';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof enUs;
    };
  }
}
