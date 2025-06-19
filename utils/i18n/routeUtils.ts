import { DEFAULT_CD_LANG, type CDLanguages } from "./languages";
import { LanguageService } from "./languageService";

/**
 * Get the current language from various sources with priority:
 * 1. URL params
 * 2. localStorage
 * 3. default language
 *
 * @deprecated Use LanguageService.getCurrentLanguage() instead
 */
export function getCurrentLanguage(params?: { lang?: string }): CDLanguages {
  const { language } = LanguageService.getCurrentLanguage(params);
  return language;
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
 *
 * @deprecated Use LanguageService.getBrowserLanguage() instead
 */
export function getBrowserLanguage(): CDLanguages | null {
  return LanguageService.getBrowserLanguage();
}
