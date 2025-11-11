"use client";
import { FC, useState, useEffect } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import NarrativesProgressBar from "./NarrativesProgressBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import NarrativesContext from "./NarrativesContext";
import { useLanguage } from "@/utils/i18n/useLanguage";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";
import PageFooter from "../PageFooter";

const archivo = Archivo({ subsets: ["latin"] });

const NarrativesLayout: FC<{
  narrationPaths: NarrationPath[];
  availableLanguageLabels: string[];
  initialNarrativeId?: string;
}> = ({
  narrationPaths,
  availableLanguageLabels,
  initialNarrativeId,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(() => {
    if (initialNarrativeId) {
      return narrationPaths.find((n) => n.id === initialNarrativeId) || null;
    }
    return null;
  });
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);

  // Access the global TranslationContext
  const globalTranslation = useTranslation();

  // Convert available language labels to CDLanguages format
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

  // Handle language changes from navigation
  const handleLanguageChange = (newLang: string | undefined) => {
    if (!newLang) return;
    
    const normalizedLang = newLang.toLowerCase() as CDLanguages;
    setLanguage(normalizedLang);
    
    // Update global translation context if valid
    if (globalTranslation.availableLanguages.includes(normalizedLang as any)) {
      globalTranslation.setLanguage(normalizedLang as any);
    }
  };

  return (
    <NarrativesContext.Provider
      value={{
        showSidePanel,
        setShowSidePanel,
        currentPath,
        setCurrentPath,
        narrationPaths,
        isPlaying,
        setIsPlaying,
        currentIndex,
        setCurrentIndex,
        selectedLanguage: language.toUpperCase(),
        setSelectedLanguage: handleLanguageChange,
      }}
    >
      <div className={`${archivo.className} relative max-h-screen`}>
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          selectedLanguage={language}
          availableLanguages={hookLanguages}
          onLanguageChange={handleLanguageChange}
        />
        <div
          className={`transition-height z-20 mx-auto ${
            currentPath ? "overflow-visible" : "overflow-auto"
          } rounded-3xl bg-black_bg duration-1000 ease-linear md:w-[90vw] ${
            sectionPadding.x
          } h-[calc(90vh-55px)]`}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div
          className={`sticky bottom-0 -z-[5] flex h-[15vh] items-center justify-center bg-yellow_secondary px-[14vw] transition-all duration-1000 ease-linear`}
        ></div>
        {!currentPath && (
          <div className="sticky bottom-0">
            <PageFooter theme="light" />
          </div>
        )}

        {currentPath && (
          <div className="fixed bottom-[3vh] z-30 h-auto w-full px-[14vw] transition-all duration-1000 ease-linear">
            <div className="bg-yellow h-full">
              <NarrativesProgressBar />
            </div>
          </div>
        )}
      </div>
    </NarrativesContext.Provider>
  );
};

export default NarrativesLayout;
