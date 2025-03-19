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
import {
  LANGUAGE_PREFERENCE_KEY,
  normalizeLanguage,
  storeLanguage,
} from "@/utils/i18n/constants";

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

  // Synchronize URL language with localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLang = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    const normalizedStoredLang = storedLang
      ? normalizeLanguage(storedLang)
      : null;

    // If there's a stored language and it's different from the URL language, redirect
    if (
      normalizedStoredLang &&
      normalizedStoredLang !== currentLang &&
      availableLanguages.includes(normalizedStoredLang)
    ) {
      const newPath = window.location.pathname.replace(
        `/${currentLang}`,
        `/${normalizedStoredLang}`,
      );
      router.push(newPath);
    } else {
      // Always ensure localStorage is in sync with the URL
      storeLanguage(currentLang);
    }
  }, [currentLang, router, availableLanguages]);

  const setLanguage = (newLang: CDLanguages) => {
    if (newLang === currentLang) return;

    // Normalize and store the language
    const normalizedLang = normalizeLanguage(newLang);
    storeLanguage(normalizedLang);

    // Navigate to the new language path
    const newPath = window.location.pathname.replace(
      `/${currentLang}`,
      `/${normalizedLang}`,
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
