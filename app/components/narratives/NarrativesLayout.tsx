"use client";
import { FC, useState, useEffect } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import NarrativesProgressBar from "./NarrativesProgressBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import NarrativesContext from "./NarrativesContext";
import { Box } from "@radix-ui/themes/dist/esm/components/box.js";
import { useLanguage } from "@/utils/i18n/useLanguage";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";
import PageFooter from "../PageFooter";

const archivo = Archivo({ subsets: ["latin"] });

const NarrativesLayout: FC<{
  narrationPaths: NarrationPath[];
  availableLanguageLabels: string[];
  initialLanguageLabel: string;
  initialNarrativeId?: string;
}> = ({
  narrationPaths,
  availableLanguageLabels,
  initialLanguageLabel,
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
  const [switchPath, setSwitchPath] = useState<boolean>(false);
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);

  // Access the global TranslationContext
  const globalTranslation = useTranslation();

  const overflow = currentPath ? "overflow-visible" : "overflow-auto";

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
    if (globalTranslation.language) {
      const upperLang = globalTranslation.language.toUpperCase();

      // Only update if the language is different and available
      if (
        upperLang !== language.toUpperCase() &&
        availableLanguageLabels.includes(upperLang)
      ) {
        setLanguage(globalTranslation.language);
      }
    }
  }, [
    globalTranslation.language,
    availableLanguageLabels,
    language,
    setLanguage,
  ]);

  // Sync navigation language changes back to global context
  const handleLanguageChange = (newLang: string | undefined) => {
    // Update our local state
    if (newLang) {
      const normalizedLang = newLang.toLowerCase() as CDLanguages;
      setLanguage(normalizedLang);
    }

    // Also update global translation context if the language is valid
    if (
      newLang &&
      globalTranslation.availableLanguages.includes(
        newLang.toLowerCase() as any,
      )
    ) {
      globalTranslation.setLanguage(newLang.toLowerCase() as any);
    }
  };

  // Create a wrapper function specifically for the Navigation component which only accepts strings
  const handleNavigationLanguageChange = (newLang: string) => {
    handleLanguageChange(newLang);
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
        switchPath,
        setSwitchPath,
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
          onLanguageChange={handleNavigationLanguageChange}
        />
        <div
          className={`transition-height z-20 mx-auto ${overflow} rounded-3xl bg-black_bg duration-1000 ease-linear md:w-[90vw] ${
            sectionPadding.x
          } ${switchPath ? "h-[calc(65vh-40px)]" : "h-[calc(90vh-55px)]"}`}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div
          className={`-z-[5] flex items-center justify-center bg-yellow_secondary px-[14vw] transition-all duration-1000 ease-linear ${
            switchPath ? "sticky bottom-0 h-[40vh]" : "sticky bottom-0 h-[15vh]"
          }`}
        ></div>
        {!currentPath && (
          <div className="sticky bottom-0">
            <PageFooter theme="light" />
          </div>
        )}

        <div
          className={`fixed transition-all duration-1000 ease-linear  ${
            switchPath ? "bottom-[28vh]" : "bottom-[3vh]"
          }  z-30 h-auto w-[100%] px-[14vw]`}
        >
          {currentPath && (
            <Box className={"bg-yellow h-full"}>
              <NarrativesProgressBar />
            </Box>
          )}
        </div>
      </div>
    </NarrativesContext.Provider>
  );
};

export default NarrativesLayout;
