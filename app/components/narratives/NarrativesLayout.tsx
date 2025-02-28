"use client";
import { FC, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import NarrativesProgressBar from "./NarrativesProgressBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import NarrativesContext from "./NarrativesContext";
import { Box } from "@radix-ui/themes/dist/esm/components/box.js";
import { useLanguageSelection } from "../scrollDocumentary/useLanguageSelection";
const archivo = Archivo({ subsets: ["latin"] });

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
  const { selectedLanguage, availableLanguages, setSelectedLanguage } =
    useLanguageSelection({
      initialLanguageLabel,
      availableLanguageLabels,
    });

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
        setSelectedLanguage,
      }}
    >
      <div
        className={`${archivo.className} max-screen relative max-h-screen overflow-hidden`}
      >
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          selectedLanguage={selectedLanguage}
          availableLanguages={availableLanguages}
          onLanguageChange={setSelectedLanguage}
        />
        <div
          className={` transition-height z-20 mx-auto w-[90vw] overflow-auto rounded-3xl bg-black_bg duration-1000 ease-linear ${
            sectionPadding.x
          } ${switchPath ? "h-[calc(65vh-40px)]" : "h-[calc(90vh-40px)]"}`}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div
          className={`-z-[5] flex items-center justify-center bg-yellow_secondary px-[14vw] transition-all duration-1000 ease-linear ${
            switchPath ? "sticky bottom-0 h-[40vh]" : "sticky bottom-0 h-[15vh]"
          }`}
        ></div>

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
