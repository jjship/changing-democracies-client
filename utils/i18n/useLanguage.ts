import { useState, useEffect } from "react";
import { CDLanguages } from "./languages";
import { LanguageService } from "./languageService";

interface UseLanguageOptions {
  /**
   * Available languages for this component/context
   * If not provided, uses all available languages
   */
  availableLanguages?: CDLanguages[];

  /**
   * Whether to sync with the global TranslationContext
   * Default: true
   */
  syncWithGlobal?: boolean;
}

interface UseLanguageReturn {
  /**
   * Current language
   */
  language: CDLanguages;

  /**
   * Available languages for this context
   */
  availableLanguages: CDLanguages[];

  /**
   * Set the language
   */
  setLanguage: (language: CDLanguages) => void;

  /**
   * Language in display format (uppercase)
   */
  displayLanguage: string;

  /**
   * Set language from display format
   */
  setLanguageFromDisplay: (displayFormat: string) => void;

  /**
   * Check if a language is available
   */
  isLanguageAvailable: (language: CDLanguages) => boolean;
}

/**
 * Simplified language hook that uses only cookies
 * Removes localStorage complexity and provides consistent language management
 */
export function useLanguage(
  options: UseLanguageOptions = {},
): UseLanguageReturn {
  const { availableLanguages = [], syncWithGlobal = true } = options;

  // Get initial language from the simplified service
  const { language: initialLanguage } = LanguageService.getCurrentLanguage();

  const [language, setLanguageState] = useState<CDLanguages>(initialLanguage);

  // Update language when URL params change
  useEffect(() => {
    const { language: currentLanguage } = LanguageService.getCurrentLanguage();
    setLanguageState(currentLanguage);
  }, []);

  // Set language with validation
  const setLanguage = (newLanguage: CDLanguages) => {
    // Validate the language is available
    if (
      availableLanguages.length > 0 &&
      !availableLanguages.includes(newLanguage)
    ) {
      console.warn(`Language ${newLanguage} is not available in this context`);
      return;
    }

    // Update state
    setLanguageState(newLanguage);

    // Note: Cookie persistence is handled by the middleware when routes change
  };

  // Set language from display format (uppercase)
  const setLanguageFromDisplay = (displayFormat: string) => {
    const normalizedLanguage = LanguageService.fromDisplayFormat(displayFormat);
    setLanguage(normalizedLanguage);
  };

  // Check if a language is available
  const isLanguageAvailable = (lang: CDLanguages): boolean => {
    return availableLanguages.length === 0 || availableLanguages.includes(lang);
  };

  return {
    language,
    availableLanguages,
    setLanguage,
    displayLanguage: LanguageService.toDisplayFormat(language),
    setLanguageFromDisplay,
    isLanguageAvailable,
  };
}

/**
 * Hook for components that need to work with display format languages (uppercase)
 * Useful for components that expect "EN", "FR" format
 */
export function useDisplayLanguage(options: UseLanguageOptions = {}): {
  selectedLanguage: string;
  availableLanguages: string[];
  setSelectedLanguage: (language: string) => void;
} {
  const {
    language,
    availableLanguages,
    setLanguageFromDisplay,
    isLanguageAvailable,
  } = useLanguage(options);

  const setSelectedLanguage = (displayLanguage: string) => {
    const normalizedLanguage =
      LanguageService.fromDisplayFormat(displayLanguage);
    if (isLanguageAvailable(normalizedLanguage)) {
      setLanguageFromDisplay(displayLanguage);
    }
  };

  return {
    selectedLanguage: LanguageService.toDisplayFormat(language),
    availableLanguages: availableLanguages.map(LanguageService.toDisplayFormat),
    setSelectedLanguage,
  };
}
