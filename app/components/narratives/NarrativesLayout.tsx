"use client";
import { FC } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import NarrativesProgressBar from "./NarrativesProgressBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import { NarrativesProvider, useNarrativesContext } from "./NarrativesContext";
import PageFooter from "../PageFooter";

const archivo = Archivo({ subsets: ["latin"] });

const NarrativesLayoutInner: FC = () => {
  const {
    currentPath,
    narrationPaths,
    language,
    availableLanguages,
    setSelectedLanguage,
  } = useNarrativesContext();

  return (
    <div className={`${archivo.className} relative max-h-screen`}>
      <Navigation
        bgColor="black_bg"
        fontColor="yellow_secondary"
        selectedLanguage={language}
        availableLanguages={availableLanguages}
        onLanguageChange={setSelectedLanguage}
      />
      <div
        className={`transition-height z-20 mx-auto ${
          currentPath ? "overflow-visible" : "overflow-auto"
        } rounded-3xl bg-black_bg duration-1000 ease-linear md:w-[90vw] ${
          sectionPadding.x
        } h-[calc(90vh-55px)]`}
      >
        <NarrativesOverview narrativesCollection={narrationPaths!} />
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
  );
};

const NarrativesLayout: FC<{
  narrationPaths: NarrationPath[];
  availableLanguageLabels: string[];
  initialNarrativeId?: string;
}> = ({
  narrationPaths,
  availableLanguageLabels,
  initialNarrativeId,
}) => {
  return (
    <NarrativesProvider
      narrationPaths={narrationPaths}
      availableLanguageLabels={availableLanguageLabels}
      initialNarrativeId={initialNarrativeId}
    >
      <NarrativesLayoutInner />
    </NarrativesProvider>
  );
};

export default NarrativesLayout;
