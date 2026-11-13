"use client";
import { FC } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import NarrativesProgressBar from "./NarrativesProgressBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import { NarrativesProvider, useNarrativesContext } from "./NarrativesContext";
import PageFooter from "@/components/public/PageFooter";

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
    <div className={`${archivo.className} relative desktop:max-h-screen`}>
      <Navigation
        bgColor="black_bg"
        fontColor="yellow_secondary"
        selectedLanguage={language}
        availableLanguages={availableLanguages}
        onLanguageChange={setSelectedLanguage}
      />
      <div
        className={`z-20 mx-auto bg-black_bg desktop:h-[calc(90vh-55px)] desktop:w-[90vw] desktop:rounded-3xl desktop:px-10 ${
          currentPath
            ? "h-[calc(100dvh-4rem)] overflow-hidden desktop:overflow-visible"
            : "px-5 desktop:overflow-auto"
        }`}
      >
        <NarrativesOverview narrativesCollection={narrationPaths!} />
      </div>
      <div
        className={`sticky bottom-0 -z-[5] hidden h-[15vh] items-center justify-center bg-yellow_secondary px-[14vw] transition-all duration-1000 ease-linear desktop:flex`}
      ></div>
      {!currentPath && (
        <div className="bg-yellow_secondary desktop:sticky desktop:bottom-0 desktop:bg-transparent">
          <PageFooter theme="light" />
        </div>
      )}

      {currentPath && (
        <div className="fixed bottom-[3vh] z-30 hidden h-auto w-full px-[14vw] transition-all duration-1000 ease-linear desktop:block">
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
}> = ({ narrationPaths, availableLanguageLabels, initialNarrativeId }) => {
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
