"use client";

import { FC, useEffect } from "react";
import { Navigation, NavigationProps } from "./Navigation";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";

const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";

export const NavigationContainer: FC<NavigationProps> = (props) => {
  const { language, setLanguage, availableLanguages } = useTranslation();

  // Ensure the current language is saved to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && language) {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
    }
  }, [language]);

  const handleLanguageChange = (newLang: string) => {
    if (!availableLanguages.includes(newLang as CDLanguages)) {
      return;
    }

    // Save to localStorage before navigating
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, newLang);
    }

    setLanguage(newLang as CDLanguages);
  };

  return (
    <Navigation
      {...props}
      onLanguageChange={handleLanguageChange}
      availableLanguages={availableLanguages}
      selectedLanguage={language}
    />
  );
};
