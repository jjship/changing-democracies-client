import { useState, useEffect } from "react";

// Constant for localStorage key to maintain consistency across the app
export const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";

interface UseLanguageSelectionProps {
  initialLanguageLabel: string;
  availableLanguageLabels: string[];
}

export function useLanguageSelection({
  initialLanguageLabel,
  availableLanguageLabels,
}: UseLanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    initialLanguageLabel,
  );

  // Effect to initialize the language selection with priority:
  // 1. localStorage preference (if available and valid)
  // 2. initialLanguageLabel from props (if available and valid)
  // 3. default "EN"
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Try to get language from localStorage first
    const storedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);

    if (storedLanguage && availableLanguageLabels.includes(storedLanguage)) {
      // If stored language is valid for this content, use it
      setSelectedLanguage(storedLanguage);
    } else {
      // Otherwise fall back to the initialLabel or "EN"
      const initialLabel = availableLanguageLabels.includes(
        initialLanguageLabel,
      )
        ? initialLanguageLabel
        : "EN";
      setSelectedLanguage(initialLabel);
    }
  }, [initialLanguageLabel, availableLanguageLabels]);

  // Wrapper for setSelectedLanguage that also updates localStorage
  const handleSetSelectedLanguage = (language: string | undefined) => {
    if (!language) return;

    // Always store and use uppercase for consistency with subtitles
    const uppercaseLanguage = language.toUpperCase();
    setSelectedLanguage(uppercaseLanguage);

    // Save to localStorage whenever language changes
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, uppercaseLanguage);

      // Dispatch a custom event to notify other components
      const event = new CustomEvent("language-changed", {
        detail: { language: uppercaseLanguage },
      });
      window.dispatchEvent(event);
    }
  };

  return {
    selectedLanguage,
    availableLanguages: availableLanguageLabels,
    setSelectedLanguage: handleSetSelectedLanguage,
  };
}
