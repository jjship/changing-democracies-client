"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Dictionary } from "../dictionaries";
import { CDLanguages, locales } from "@/utils/i18n/languages";
import { useRouter, useParams } from "next/navigation";
import { LanguageService } from "@/utils/i18n/languageService";
import { updateRouteLanguage } from "@/utils/i18n/routeUtils";

type TranslationContextType = {
  dictionary: Dictionary;
  language: CDLanguages;
  setLanguage: (lang: CDLanguages) => void;
  availableLanguages: CDLanguages[];
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  dictionary,
  children,
  availableLanguages = locales as CDLanguages[],
}: {
  dictionary: Dictionary;
  children: ReactNode;
  availableLanguages?: CDLanguages[];
}) {
  const params = useParams();
  const router = useRouter();

  // Use the simplified language service
  const { language: currentLang } = LanguageService.getCurrentLanguage(params);
  const [currentDictionary, setCurrentDictionary] =
    useState<Dictionary>(dictionary);

  // The middleware handles cookie setting automatically when routes change
  // No need for manual localStorage management

  const setLanguage = (newLang: CDLanguages) => {
    if (newLang === currentLang) return;

    // Navigate to the new language path - middleware will set the cookie
    const newPath = updateRouteLanguage(
      window.location.pathname,
      currentLang,
      newLang,
    );
    router.push(newPath);
  };

  const contextValue: TranslationContextType = {
    dictionary: currentDictionary,
    language: currentLang,
    setLanguage,
    availableLanguages,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
