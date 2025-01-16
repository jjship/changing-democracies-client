"use client";
import { FC, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import NarrativesContext from "@/app/narratives/NarrativesContext";

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
  const [switchPath, setSwitchPath] = useState<boolean>(false);

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
        switchPath,
        setSwitchPath,
      }}
    >
      <div
        className={`${archivo.className} max-screen relative max-h-screen overflow-hidden`}
      >
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto w-[90vw] overflow-auto rounded-3xl bg-black_bg ${sectionPadding.x} h-[calc(90vh-40px)]`}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div
          className={`sticky bottom-0 px-[14vw] -z-10 flex items-center justify-center bg-yellow_secondary transition-all duration-1000 ${switchPath ? "h-[50vh]" : " h-[15vh]"}`}></div>
        <div className="sticky bottom-[3vh] h-auto w-[100%] px-[14vw] z-50">
             {currentPath && <SequenceProgressBar />}
          </div>
        </div>
    </NarrativesContext.Provider>
);
};

export default NarrativesLayout;