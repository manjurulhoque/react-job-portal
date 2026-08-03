import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import common_bn from "./translations/bn/common.json";
import common_en from "./translations/en/common.json";

import employee_bn from "./translations/bn/employee.json";
import employee_en from "./translations/en/employee.json";

const Languages = ["en", "bn"];
const resources = {
	en: {
		common: common_en,
		employee: employee_en,
	},
	bn: {
		common: common_bn,
		employee: employee_bn,
	},
};

const toSupportedLanguage = (lng = "") => {
	const base = String(lng).toLowerCase().split("-")[0];
	return Languages.includes(base) ? base : "en";
};

export default i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: false,
		supportedLngs: Languages,
		nonExplicitSupportedLngs: true,
		load: "languageOnly",
		interpolation: {
			escapeValue: false,
		},
		ns: ["common", "employee"],
		defaultNS: "common",
		resources,
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
			convertDetectedLanguage: toSupportedLanguage,
		},
		react: {
			useSuspense: false,
		},
	});
