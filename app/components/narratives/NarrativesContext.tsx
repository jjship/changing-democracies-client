"use client";

import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useLanguage } from "@/utils/i18n/useLanguage";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";

type NarrativesContextType = {
  currentPath: NarrationPath | null;
  setCurrentPath: (narrationPath: NarrationPath | null) => void;
  narrationPaths: NarrationPath[] | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  showSidePanel: boolean;
  setShowSidePanel: (showSidePanel: boolean) => void;
  selectedLanguage: string | undefined;
  setSelectedLanguage: (selectedLanguage: string | undefined) => void;
  /** The current language in CDLanguages format (lowercase), for Navigation */
  language: CDLanguages;
  /** Available languages in CDLanguages format, for Navigation */
  availableLanguages: CDLanguages[];
};

const NarrativesContext = createContext<NarrativesContextType | null>(null);

export function useNarrativesContext() {
  const context = useContext(NarrativesContext);
  if (!context) {
    throw new Error(
      "useNarrativesContext must be used within a NarrativesProvider",
    );
  }
  return context;
}

interface NarrativesProviderProps {
  children: ReactNode;
  narrationPaths: NarrationPath[];
  availableLanguageLabels: string[];
  initialNarrativeId?: string;
}

export const NarrativesProvider: FC<NarrativesProviderProps> = ({
  children,
  narrationPaths,
  availableLanguageLabels,
  initialNarrativeId,
}) => {
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(() => {
    if (initialNarrativeId) {
      return narrationPaths.find((n) => n.id === initialNarrativeId) || null;
    }
    return null;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const globalTranslation = useTranslation();

  const availableLanguages: CDLanguages[] = availableLanguageLabels
    .map((label) => label.toLowerCase() as CDLanguages)
    .filter((lang): lang is CDLanguages => lang !== undefined);

  const {
    language,
    availableLanguages: hookLanguages,
    setLanguage,
  } = useLanguage({
    availableLanguages,
  });

  // Sync with global TranslationContext language changes
  useEffect(() => {
    if (
      globalTranslation.language &&
      globalTranslation.language.toUpperCase() !== language.toUpperCase() &&
      availableLanguageLabels.includes(
        globalTranslation.language.toUpperCase(),
      )
    ) {
      setLanguage(globalTranslation.language);
    }
  }, [globalTranslation.language, availableLanguageLabels, language, setLanguage]);

  const handleLanguageChange = (newLang: string | undefined) => {
    if (!newLang) return;

    const normalizedLang = newLang.toLowerCase() as CDLanguages;
    setLanguage(normalizedLang);

    if (globalTranslation.availableLanguages.includes(normalizedLang)) {
      globalTranslation.setLanguage(normalizedLang);
    }
  };

  const value: NarrativesContextType = {
    currentPath,
    setCurrentPath,
    narrationPaths,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    showSidePanel,
    setShowSidePanel,
    selectedLanguage: language.toUpperCase(),
    setSelectedLanguage: handleLanguageChange,
    language,
    availableLanguages: hookLanguages,
  };

  return (
    <NarrativesContext.Provider value={value}>
      {children}
    </NarrativesContext.Provider>
  );
};
