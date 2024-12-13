"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { FilmData, NarrationPath } from "@/types/videosAndFilms";
import { Box, Flex } from "@radix-ui/themes";
import SequenceProgressBar from "@/components/narrations/SequenceProgrwssBar";
import { NarrationContext } from "@/app/narratives/NarrationsContext";
import { NarrationsView } from "./NarrationVIew";

const NarrationsLayout: React.FC<{ narrationPaths: NarrationPath[] }> = ({
  narrationPaths,
}) => {
  if (!narrationPaths.length) {
    throw new Error("No narrative paths found");
  }

  const firstPath = narrationPaths[0];

  const [currentPath, setCurrentPath] = useState<NarrationPath>(firstPath);
  const [films, setFilms] = useState<FilmData[] | null>(currentPath.fragments);
  const [isPlaying, setIsPlaying] = useState<boolean | null>(false);
  const [isEnded, setIsEnded] = useState<boolean | null>(false);
  const [hasStarted, setHasStarted] = useState<boolean | null>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentFilmId, setCurrentFilmId] = useState<string | null>(
    firstPath.fragments[0].guid,
  );
  //useMemo for optimization (if needed!)

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
      }} // here we define the starting values of the context that will be passed to the children of this provider instance
    >
      <Flex direction="column" className="h-screen w-screen bg-black_bg">
        <Flex direction="column" className="h-[85vh] w-full">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <Box className="flex-1">
            <NarrationsView />
          </Box>
        </Flex>
        z
        <Box className="h-[15vh] bg-yellow_secondary">
          <SequenceProgressBar />
        </Box>
      </Flex>
    </NarrationContext.Provider>
  );
};

export default NarrationsLayout;
