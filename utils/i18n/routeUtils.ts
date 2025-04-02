import { DEFAULT_CD_LANG, type CDLanguages } from "./languages";
import { LANGUAGE_PREFERENCE_KEY } from "@/components/scrollDocumentary/useLanguageSelection";

/**
 * Get the current language from various sources with priority:
 * 1. URL params
 * 2. localStorage
 * 3. default language
 */
export function getCurrentLanguage(params?: { lang?: string }): CDLanguages {
  // Try to get from params first
  if (params?.lang && typeof params.lang === "string") {
    return params.lang as CDLanguages;
  }

  // Otherwise try localStorage (client-side only)
  if (typeof window !== "undefined") {
    const storedLang = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    if (storedLang) {
      return storedLang as CDLanguages;
    }
  }

  // Default fallback
  return DEFAULT_CD_LANG;
}

/**
 * Creates a localized route path by adding the language prefix
 */
export function getLocalizedRoute(path: string, language: CDLanguages): string {
  // Ensure path starts with a slash if not empty
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Handle root path special case
  if (normalizedPath === "/") {
    return `/${language}`;
  }

  return `/${language}${normalizedPath}`;
}

/**
 * Update an existing route with a new language
 */
export function updateRouteLanguage(
  currentPath: string,
  currentLang: CDLanguages,
  newLang: CDLanguages,
): string {
  return currentPath.replace(`/${currentLang}`, `/${newLang}`);
}

/**
 * Get language from browser settings (used as fallback)
 */
export function getBrowserLanguage(): CDLanguages | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const browserLang = navigator.language
      .split("-")[0]
      .toLowerCase() as CDLanguages;
    return browserLang;
  } catch (error) {
    console.error("Error getting browser language:", error);
    return null;
  }
}
