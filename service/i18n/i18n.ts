import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";
import es from "./locales/es/translation.json";
import fr from "./locales/fr/translation.json";
import de from "./locales/de/translation.json";
import it from "./locales/it/translation.json";
import ja from "./locales/ja/translation.json";
import zh from "./locales/zh/translation.json";
import ru from "./locales/ru/translation.json";
import ar from "./locales/ar/translation.json";

const deviceLanguage = Localization.getLocales()[0].languageCode || "en";

console.log("🌍 Idioma detectado:", deviceLanguage);

i18n.use(initReactI18next).init({
  lng: deviceLanguage,
  fallbackLng: "en",
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    it: { translation: it },
    ja: { translation: ja },
    zh: { translation: zh },
    ru: { translation: ru },
    ar: { translation: ar }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
