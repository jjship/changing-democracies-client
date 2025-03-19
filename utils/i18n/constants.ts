import { CDLanguages } from "./languages";

export const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";

// Helper to normalize language format for internal storage (always lowercase)
export const normalizeLanguage = (lang: string): CDLanguages => {
  return lang.toLowerCase() as CDLanguages;
};

// Helper to get uppercase language code for subtitles/captions
export const getUppercaseLanguage = (lang: string): string => {
  return lang.toUpperCase();
};

// Helper to store language in localStorage
export const storeLanguage = (lang: string): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, normalizeLanguage(lang));
};
