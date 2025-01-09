"use client";
import { FC, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { NarrativesContext } from "@/app/narratives/NarrativesContext";
import { sectionPadding } from "../Section";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";

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
      <div className="max-screen relative max-h-screen overflow-hidden">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[85vw] overflow-auto rounded-3xl bg-black_bg md:max-w-[85vw] xl:max-w-[85rem] ${sectionPadding.x}  h-[calc(90vh-40px)] `}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div className="sticky bottom-0 -z-10 flex h-[20vh] items-center justify-center bg-yellow_secondary"></div>
        <div className="sticky bottom-5 h-auto w-[100%] px-[25vw] ">
          {currentPath && <SequenceProgressBar />}
        </div>
      </div>
    </NarrativesContext.Provider>
  );
};

export default NarrativesLayout;
