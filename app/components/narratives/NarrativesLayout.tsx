"use client";
import { FC, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { NarrativesContext } from "@/app/narratives/NarrativesContext";
import { sectionPadding } from "../Section";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

const NarrativesLayout: FC<{ narrationPaths: NarrationPath[] }> = ({
                                                                     narrationPaths,
                                                                   }) => {
  if (!narrationPaths) {
    throw new Error("No narrative paths found");
  }

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [showCountDown, setShowCountDown] = useState<boolean>(true);

  return (
    <NarrativesContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        narrationPaths,
        isPlaying,
        setIsPlaying,
        currentIndex,
        setCurrentIndex,
        showCountDown,
        setShowCountDown,
      }}
    >
      <div
        className={`${archivo.className} max-screen relative max-h-screen overflow-hidden`}
      >
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`black-div z-20 mx-auto w-[90vw] overflow-auto rounded-3xl bg-black_bg ${sectionPadding.x} h-[calc(90vh-40px)]`}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div className="sticky bottom-0 -z-10 flex h-[15vh] items-center justify-center bg-yellow_secondary"></div>
        <div className="fixed bottom-[3vh] left-0 right-0 z-50 px-[14vw]">
          {currentPath && <SequenceProgressBar />}
        </div>
      </div>
    </NarrativesContext.Provider>
  );
};

export default NarrativesLayout;