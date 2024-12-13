"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { FilmData, NarrationPath } from "@/types/videosAndFilms";
import { Box, Flex } from "@radix-ui/themes";
import SequenceProgressBar from "@/components/narrations/SequenceProgrwssBar";
import { NarrationContext } from "@/app/narratives/NarrationsContext";

const NarrationsLayout: React.FC<{
  children: React.ReactNode;
  narrationPath: NarrationPath;
}> = ({ children, narrationPath }) => {
  const [films, setFilms] = useState<FilmData[] | null>(
    narrationPath.fragments,
  );
  const [isPlaying, setIsPlaying] = useState<boolean | null>(false);
  const [isEnded, setIsEnded] = useState<boolean | null>(false);
  const [hasStarted, setHasStarted] = useState<boolean | null>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  //useMemo for optimization (if needed!)

  const handleFragmentSelect = (index: number) => {
    setCurrentIndex(index),
      setIsPlaying(true),
      setHasStarted(true),
      setIsEnded(false);
  };

  return (
    <NarrationContext.Provider
      value={{
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
      }}
    >
      <Flex direction="column" className="h-screen w-screen bg-black_bg">
        <Flex direction="column" className="h-[85vh] w-full">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <Box className="flex-1">{children}</Box>
        </Flex>
        z
        <Box className="h-[15vh] bg-yellow_secondary">
          <SequenceProgressBar
            currentFragmentIndex={currentIndex}
            totalFragments={narrationPath.fragments.length}
            onFragmentSelect={handleFragmentSelect}
          />
        </Box>
      </Flex>
    </NarrationContext.Provider>
  );
};

export default NarrationsLayout;
