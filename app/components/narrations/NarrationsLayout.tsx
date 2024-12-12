"use client";

import React, { useMemo, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { FilmsContext } from "@/components/films/FilmsContext";
import { NarrationPath } from "@/types/videosAndFilms";
import { Box, Flex } from "@radix-ui/themes";
import SequenceProgressBar from "@/components/SequenceProgrwssBar";

type PlayerState = {
  currentIndex: number;
  isPlaying: boolean;
  hasStarted: boolean;
  isEnded: boolean;
};

const NarrationsLayout: React.FC<{
  children: React.ReactNode;
  narrationPath: NarrationPath;
}> = ({ children, narrationPath }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentIndex: 0,
    isPlaying: false,
    hasStarted: false,
    isEnded: false,
  });

  const filmsContextValue = useMemo(() => {
    const currentFragment = narrationPath.fragments[playerState.currentIndex];
    return {
      setFilms: () => {},
      filmCollection: null,
      films: narrationPath.fragments,
      nowPlaying: playerState.isPlaying ? currentFragment?.guid : null,
      setNowPlaying: (filmId: string | null) => {
        if (!filmId) return;
        const newIndex = narrationPath.fragments.findIndex(
          (fragment) => fragment.guid === filmId,
        );
        if (newIndex !== -1) {
          setPlayerState((prev) => ({
            ...prev,
            currentIndex: newIndex,
            isPlaying: true,
          }));
        }
      },
    };
  }, [narrationPath.fragments, playerState]);

  const handleFragmentSelect = (index: number) => {
    setPlayerState({
      currentIndex: index,
      isPlaying: true,
      hasStarted: true,
      isEnded: false,
    });
  };

  return (
    <FilmsContext.Provider value={filmsContextValue}>
      <Flex direction="column" className="h-screen w-screen bg-black_bg">
        <Flex direction="column" className="h-[85vh] w-full">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <Box className="flex-1">{children}</Box>
        </Flex>
        <Box className="h-[15vh] bg-yellow_secondary">
          <SequenceProgressBar
            currentFragmentIndex={playerState.currentIndex}
            totalFragments={narrationPath.fragments.length}
            onFragmentSelect={handleFragmentSelect}
          />
        </Box>
      </Flex>
    </FilmsContext.Provider>
  );
};

export default NarrationsLayout;
