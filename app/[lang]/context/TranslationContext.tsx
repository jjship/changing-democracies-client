"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Dictionary } from "../dictionaries";
import { CDLanguages, DEFAULT_LANGUAGE_LABEL } from "@/utils/i18n/languages";
import { useRouter, useParams } from "next/navigation";
import { LANGUAGE_PREFERENCE_KEY } from "@/components/scrollDocumentary/useLanguageSelection";

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
  availableLanguages = [
    "en",
    "es",
    "fr",
    "de",
    "ca",
    "hr",
    "cs",
    "nl",
    "lt",
    "pl",
    "pt",
    "ro",
    "el",
  ] as CDLanguages[],
}: {
  dictionary: Dictionary;
  children: ReactNode;
  availableLanguages?: CDLanguages[];
}) {
  const params = useParams();
  const router = useRouter();
  const currentLang = (params?.lang as CDLanguages) || DEFAULT_LANGUAGE_LABEL;
  const [currentDictionary, setCurrentDictionary] =
    useState<Dictionary>(dictionary);

  // Load saved language preference when the component mounts
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        LANGUAGE_PREFERENCE_KEY,
      ) as CDLanguages | null;

      // If there's a saved language and it's different from the current one, redirect
      if (
        savedLanguage &&
        savedLanguage !== currentLang &&
        availableLanguages.includes(savedLanguage)
      ) {
        const newPath = window.location.pathname.replace(
          `/${currentLang}`,
          `/${savedLanguage}`,
        );
        router.push(newPath);
      } else {
        // If no saved language or we're already on the correct language path, save the current language
        localStorage.setItem(LANGUAGE_PREFERENCE_KEY, currentLang);
      }
    }
  }, [currentLang, router, availableLanguages]);

  const setLanguage = (newLang: CDLanguages) => {
    if (newLang === currentLang) return;

    // Save the language preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, newLang);
    }

    // Navigate to the new language path
    const newPath = window.location.pathname.replace(
      `/${currentLang}`,
      `/${newLang}`,
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
