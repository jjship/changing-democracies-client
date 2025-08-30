import { CDLanguages, DEFAULT_CD_LANG, locales } from "./languages";

// Types
export interface LanguageDetectionResult {
  language: CDLanguages;
  source: "url" | "cookie" | "browser" | "default";
}

/**
 * Simplified language service that uses only cookies
 * Works in both client and server contexts
 */
export class LanguageService {
  /**
   * Get the current language from available sources with priority:
   * 1. URL params (highest priority)
   * 2. NEXT_LOCALE cookie (client-side only)
   * 3. Browser language (client-side only)
   * 4. Default language
   */
  static getCurrentLanguage(params?: {
    lang?: string;
  }): LanguageDetectionResult {
    // 1. URL params (highest priority)
    if (params?.lang && typeof params.lang === "string") {
      const urlLang = params.lang.toLowerCase() as CDLanguages;
      if (locales.includes(urlLang)) {
        return { language: urlLang, source: "url" };
      }
    }

    // 2. NEXT_LOCALE cookie (client-side only)
    if (typeof window !== "undefined") {
      const cookieLanguage = this.getCookieLanguage();
      if (cookieLanguage) {
        return { language: cookieLanguage, source: "cookie" };
      }
    }

    // 3. Browser language (client-side only)
    if (typeof window !== "undefined") {
      const browserLanguage = this.getBrowserLanguage();
      if (browserLanguage) {
        return { language: browserLanguage, source: "browser" };
      }
    }

    // 4. Default fallback
    return { language: DEFAULT_CD_LANG, source: "default" };
  }

  /**
   * Get language from NEXT_LOCALE cookie (client-side only)
   */
  static getCookieLanguage(): CDLanguages | null {
    if (typeof window === "undefined") {
      return null;
    }

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (cookieValue) {
      const normalized = cookieValue.toLowerCase() as CDLanguages;
      return locales.includes(normalized) ? normalized : null;
    }

    return null;
  }

  /**
   * Get language from browser settings
   */
  static getBrowserLanguage(): CDLanguages | null {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const browserLang = navigator.language
        .split("-")[0]
        .toLowerCase() as CDLanguages;
      return locales.includes(browserLang) ? browserLang : null;
    } catch (error) {
      console.error("Error getting browser language:", error);
      return null;
    }
  }

  /**
   * Normalize language code to ensure consistency
   */
  static normalizeLanguage(language: string): CDLanguages {
    const normalized = language.toLowerCase() as CDLanguages;
    return locales.includes(normalized) ? normalized : DEFAULT_CD_LANG;
  }

  /**
   * Convert language to display format (uppercase)
   */
  static toDisplayFormat(language: CDLanguages): string {
    return language.toUpperCase();
  }

  /**
   * Convert display format back to language code
   */
  static fromDisplayFormat(displayFormat: string): CDLanguages {
    return this.normalizeLanguage(displayFormat);
  }

  /**
   * Check if a language is valid
   */
  static isValidLanguage(language: string): language is CDLanguages {
    return locales.includes(language.toLowerCase() as CDLanguages);
  }

  /**
   * Creates a localized route path by adding the language prefix
   */
  static getLocalizedRoute(path: string, language: CDLanguages): string {
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
  static updateRouteLanguage(
    currentPath: string,
    currentLang: CDLanguages,
    newLang: CDLanguages,
  ): string {
    return currentPath.replace(`/${currentLang}`, `/${newLang}`);
  }
}

// Export convenience functions for backward compatibility
export const getCurrentLanguage = LanguageService.getCurrentLanguage;
export const getBrowserLanguage = LanguageService.getBrowserLanguage;
export const getCookieLanguage = LanguageService.getCookieLanguage;
export const normalizeLanguage = LanguageService.normalizeLanguage;
export const toDisplayFormat = LanguageService.toDisplayFormat;
export const fromDisplayFormat = LanguageService.fromDisplayFormat;
export const isValidLanguage = LanguageService.isValidLanguage;
export const getLocalizedRoute = LanguageService.getLocalizedRoute;
export const updateRouteLanguage = LanguageService.updateRouteLanguage;
