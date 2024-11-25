"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FilmsContext } from "@/components/films/FilmsContext";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import React, { FC, useCallback, useMemo, useState } from "react";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";

type PlayerState = {
  currentIndex: number;
  isPlaying: boolean;
  isVisible: boolean;
  hasStarted: boolean;
  isEnded: boolean;
};

export { NarrationsView };
const NarrationsView: FC<{ narrationPath: NarrationPath }> = ({
  narrationPath,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentIndex: 0,
    isPlaying: false,
    isVisible: true,
    hasStarted: false,
    isEnded: false,
  });

  const { currentFragment, nextFragment, isLastFragment } = useMemo(
    () => ({
      currentFragment: narrationPath.fragments[playerState.currentIndex],
      nextFragment: narrationPath.fragments[playerState.currentIndex + 1],
      isLastFragment:
        playerState.currentIndex === narrationPath.fragments.length - 1,
    }),
    [narrationPath.fragments, playerState.currentIndex],
  );

  const updatePlayerState = useCallback((updates: Partial<PlayerState>) => {
    setPlayerState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleStart = useCallback(() => {
    updatePlayerState({
      isPlaying: true,
      hasStarted: true,
      isEnded: false,
    });
  }, [updatePlayerState]);

  const handleFragmentSelect = useCallback(
    (index: number) => {
      updatePlayerState({
        currentIndex: index,
        isPlaying: true,
        hasStarted: true,
        isVisible: true,
        isEnded: false,
      });
    },
    [updatePlayerState],
  );

  const handleVideoEnd = useCallback(() => {
    updatePlayerState({
      isPlaying: false,
      isEnded: true,
    });
  }, [updatePlayerState]);

  const handleContinue = useCallback(() => {
    if (!isLastFragment) {
      updatePlayerState({
        currentIndex: playerState.currentIndex + 1,
        isPlaying: true,
        isVisible: true,
        isEnded: false,
      });
    }
  }, [isLastFragment, playerState.currentIndex, updatePlayerState]);

  const handleVisibilityToggle = useCallback(
    (isVisible: boolean) => {
      updatePlayerState({
        isVisible,
        isPlaying: false,
        isEnded: false,
      });
    },
    [updatePlayerState],
  );

  const handleReopen = useCallback(() => {
    updatePlayerState({
      isVisible: true,
      isPlaying: true,
      isEnded: false,
    });
  }, [updatePlayerState]);

  const filmsContextValue = useMemo(
    () => ({
      films: narrationPath.fragments,
      setFilms: () => {},
      filmsCollection: {
        films: narrationPath.fragments,
        tags: [],
        countries: [],
        people: [],
      },
      nowPlaying: playerState.isPlaying ? currentFragment?.guid : null,
      setNowPlaying: (filmId: string | null) => {
        if (filmId) {
          const newIndex = narrationPath.fragments.findIndex(
            (f) => f.guid === filmId,
          );
          if (newIndex !== -1) {
            handleFragmentSelect(newIndex);
          }
        }
      },
    }),
    [
      narrationPath.fragments,
      playerState.isPlaying,
      currentFragment,
      handleFragmentSelect,
    ],
  );

  const backgroundStyle = useMemo(
    () => ({
      overflow: "hidden" as const,
      backgroundImage: `url(${
        playerState.isEnded && nextFragment
          ? nextFragment.thumbnailUrl
          : currentFragment.thumbnailUrl
      })`,
      backgroundSize: "cover" as const,
      backgroundPosition: "center" as const,
      width: "100%",
      height: "100%",
      alignItems: "center" as const,
      justifyContent: "center" as const,
      position: "relative" as const,
    }),
    [playerState.isEnded, currentFragment, nextFragment],
  );

  return (
    <FilmsContext.Provider value={filmsContextValue}>
      <Flex height="100%" align="center" justify="center" direction="column">
        <Flex style={backgroundStyle}>
          {!playerState.isVisible ? (
            <>
              <NarrationsContinueButton
                text="Continue"
                onClick={handleReopen}
              />
              <SequenceProgressBar
                currentFragmentIndex={playerState.currentIndex}
                totalFragments={narrationPath.fragments.length}
                onFragmentSelect={handleFragmentSelect}
              />
            </>
          ) : (
            <>
              {!playerState.hasStarted && (
                <NarrationsContinueButton text="Start" onClick={handleStart} />
              )}

              {playerState.isPlaying &&
                playerState.hasStarted &&
                currentFragment && (
                  <NarrationsFilmPlayer
                    onEnded={handleVideoEnd}
                    key={currentFragment.guid}
                    onClose={() => handleVisibilityToggle(false)}
                  />
                )}

              {!playerState.isPlaying && playerState.hasStarted && (
                <>
                  {nextFragment && playerState.isEnded && (
                    <NarrationsContinueButton
                      text="Continue"
                      onClick={handleContinue}
                    />
                  )}
                  {playerState.isEnded && (
                    <CountDown
                      onFinish={handleContinue}
                      onCountingChange={() => {}}
                    />
                  )}
                </>
              )}

              <SequenceProgressBar
                currentFragmentIndex={playerState.currentIndex}
                totalFragments={narrationPath.fragments.length}
                onFragmentSelect={handleFragmentSelect}
              />
            </>
          )}
        </Flex>
      </Flex>
    </FilmsContext.Provider>
  );
};
