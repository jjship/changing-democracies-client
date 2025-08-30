import { LanguageService } from "./languageService";

/**
 * Route utilities for localization
 *
 * @deprecated This file is being phased out. Use LanguageService directly:
 * - LanguageService.getLocalizedRoute() instead of getLocalizedRoute()
 * - LanguageService.updateRouteLanguage() instead of updateRouteLanguage()
 * - LanguageService.getCurrentLanguage() instead of getCurrentLanguage()
 */

/**
 * Creates a localized route path by adding the language prefix
 * @deprecated Use LanguageService.getLocalizedRoute() instead
 */
export const getLocalizedRoute = LanguageService.getLocalizedRoute;

/**
 * Update an existing route with a new language
 * @deprecated Use LanguageService.updateRouteLanguage() instead
 */
export const updateRouteLanguage = LanguageService.updateRouteLanguage;

/**
 * Get the current language from various sources
 * @deprecated Use LanguageService.getCurrentLanguage() instead
 */
export const getCurrentLanguage = LanguageService.getCurrentLanguage;

/**
 * Get language from browser settings
 * @deprecated Use LanguageService.getBrowserLanguage() instead
 */
export const getBrowserLanguage = LanguageService.getBrowserLanguage;
