import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./locales/en/transaltion.json"
import ru from "./locales/ru/transaltion.json"
import uz from "./locales/uz/transaltion.json"
import LanguageDetector from "i18next-browser-languagedetector"
i18next
.use(initReactI18next)
.use(LanguageDetector)
.init({
  resources:{
    ru:{
      translation:ru,
    },
    en:{
        translation: en,
    },
    uz:{
      translation: uz
    }
  },
  lng: window.localStorage.getItem('i18nextLng'),
  fallbackLng: 'ru',
  detection:{
    order:['htmlTag' , 'cookie', 'localStorage', 'path', 'subdomain'],
    caches:['cookie' , 'localStorage']
  }
})
export default i18next