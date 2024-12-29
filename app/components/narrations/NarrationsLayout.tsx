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

  useEffect(() => {
    // setSelectedPath(narrationPathOne);
    // setFilms(narrationPathOne.fragments);
    // setCurrentFilmId(narrationPathOne.fragments[0].guid);
  }, []);
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
      {/* className={`${archivo.className} bg-black_bg antialiased`} */}
      {/* <Flex direction="column" className="h-screen w-screen bg-black_bg">
        <Flex direction="column" className="h-[85vh] w-full">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <Box className="flex-1"> */}

      {/* <main className={`${archivo.className} bg-black_bg antialiased`}> */}
      <main>
        <div className="relative h-[100vh] overflow-clip">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <div
            className={`z-10 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[85vh] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
          >
            <NarrativesOverview
              narrativesCollection={narrationPaths}
            ></NarrativesOverview>
            <SequenceProgressBar
            // currentFragmentIndex={currentIndex}
            // onFragmentSelect={function (index: number): void {
            //   throw new Error("Function not implemented.");
            // }}
            // narrationFragments={currentPath?.fragments ?? null}
            // totalFragments={currentPath?.fragments.length ?? 0}
            />
          </div>
          <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
        </div>
      </main>
    </NarrationContext.Provider>
  );
};

export default NarrationsLayout;
