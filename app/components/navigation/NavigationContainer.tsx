"use client";

import { FC } from "react";
import { Navigation, NavigationProps } from "./Navigation";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";

export const NavigationContainer: FC<NavigationProps> = (props) => {
  const { language, setLanguage, availableLanguages } = useTranslation();

  const handleLanguageChange = (newLang: string) => {
    if (!availableLanguages.includes(newLang as CDLanguages)) {
      return;
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
