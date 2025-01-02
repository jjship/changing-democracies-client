"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { FilmData, NarrationPath } from "@/types/videosAndFilms";
import { Box, Flex } from "@radix-ui/themes";
import { NarrationContext } from "@/app/narratives/NarrationsContext";
import { NarrativesOverview } from "../NarrativesOverview";
import { sectionPadding } from "../Section";
import SequenceProgressBar from "./SequenceProgrwssBar";

const NarrationsLayout: React.FC<{ narrationPaths: NarrationPath[] }> = ({
  narrationPaths,
}) => {
  if (!narrationPaths) {
    throw new Error("No narrative paths found");
  }

  const [isPlaying, setIsPlaying] = useState<boolean | null>(false);
  const [isEnded, setIsEnded] = useState<boolean | null>(false);
  const [hasStarted, setHasStarted] = useState<boolean | null>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [currentFilmId, setCurrentFilmId] = useState<string | null>(null);

  return (
    <NarrationContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        narrationPaths,
        films,
        setFilms,
        isPlaying,
        setIsPlaying,
        isEnded,
        setIsEnded,
        hasStarted,
        setHasStarted,
        currentIndex,
        setCurrentIndex,
        isVisible,
        setIsVisible,
        currentFilmId,
        setCurrentFilmId,
      }}
    >
      <div className="relative h-[100vh] ">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] overflow-auto rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  h-[calc(90vh-40px)] `}
        >
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div className="sticky bottom-0 -z-10 flex h-[15vh] items-center justify-center bg-yellow_secondary"></div>
        <div className="fixed bottom-5 w-[100%] md:mx-10">
          {currentPath && <SequenceProgressBar />}
        </div>
      </div>
    </NarrationContext.Provider>
  );
};

export default NarrationsLayout;
