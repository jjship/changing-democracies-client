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
import { useLanguageSelection } from "../scrollDocumentary/useLanguageSelection";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
const archivo = Archivo({ subsets: ["latin"] });
import { LANGUAGE_PREFERENCE_KEY } from "@/components/scrollDocumentary/useLanguageSelection";
import PageFooter from "../PageFooter";
const NarrativesLayout: FC<{
  narrationPaths: NarrationPath[];
  availableLanguageLabels: string[];
  initialLanguageLabel: string;
}> = ({ narrationPaths, availableLanguageLabels, initialLanguageLabel }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [switchPath, setSwitchPath] = useState<boolean>(false);
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);

  // Access the global TranslationContext
  const globalTranslation = useTranslation();

  const overflow = currentPath ? "overflow-visible" : "overflow-auto";

  // First prioritize localStorage, then fall back to initialLanguageLabel
  const getInitialLanguage = (): string => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage
        .getItem(LANGUAGE_PREFERENCE_KEY)
        ?.toUpperCase();
      if (storedLanguage && availableLanguageLabels.includes(storedLanguage)) {
        return storedLanguage;
      }
    }
    return initialLanguageLabel;
  };

  const { selectedLanguage, availableLanguages, setSelectedLanguage } =
    useLanguageSelection({
      initialLanguageLabel: getInitialLanguage(),
      availableLanguageLabels,
    });

  // Sync with global TranslationContext language changes
  useEffect(() => {
    if (globalTranslation.language) {
      const upperLang = globalTranslation.language.toUpperCase();

      // Only update if the language is different and available
      if (
        upperLang !== selectedLanguage &&
        availableLanguageLabels.includes(upperLang)
      ) {
        setSelectedLanguage(upperLang);
      }
    }
  }, [
    globalTranslation.language,
    availableLanguageLabels,
    selectedLanguage,
    setSelectedLanguage,
  ]);

  // Sync navigation language changes back to global context
  const handleLanguageChange = (newLang: string | undefined) => {
    // Update our local state
    setSelectedLanguage(newLang);

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

  // Ensure language changes are saved to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && selectedLanguage) {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, selectedLanguage);
    }
  }, [selectedLanguage]);

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
        selectedLanguage,
        setSelectedLanguage: handleLanguageChange,
      }}
    >
      <div className={`${archivo.className} relative max-h-screen`}>
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          selectedLanguage={selectedLanguage}
          availableLanguages={availableLanguages}
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
