"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FilmsContext } from "@/components/films/FilmsContext";
import React, { FC, useCallback, useMemo, useState } from "react";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";
import NarrationsButton from "@/ui/NarrationsContinueButton";

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
      <Flex
        direction="column"
        className={"m-auto h-[80%] w-[80%] border-8 border-amber-100"}
      >
        <Flex justify={"end"} className={" border-8 border-red-900"}>
          {/*<NarrationsButton*/}
          {/*  text="Overview"*/}
          {/*  onClick={() => {}}*/}
          {/*  triangleColor="#808881"*/}
          {/*  trianglePlacement="right"*/}
          {/*  style={{*/}
          {/*    transform: "scale(0.4)",*/}
          {/*    transformOrigin: "left center",*/}
          {/*  }}*/}
          {/*/>*/}
          <Flex
            style={{
              height: "8vh",
              width: "auto",
              backgroundColor: "#8083ae",
              color: "white",
              marginRight: "4vw",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px 5px 0 0",
            }}
          >
            <p style={{ padding: "4vw" }}>{narrationPath.title}</p>
          </Flex>
        </Flex>
        <Flex
          style={{
            ...backgroundStyle,
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {!playerState.isVisible ? (
            <>
              <NarrationsButton
                text="Continue"
                onClick={handleContinue}
                triangleColor="#8695c0"
                trianglePlacement="left"
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
                <NarrationsButton
                  text="Start"
                  onClick={handleStart}
                  triangleColor="#8695c0"
                  trianglePlacement="left"
                />
              )}

              {playerState.isPlaying &&
                playerState.hasStarted &&
                currentFragment && (
                  <div
                    style={{
                      // position: "absolute",
                      // top: 0,
                      // left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <NarrationsFilmPlayer
                      onEnded={handleVideoEnd}
                      key={currentFragment.guid}
                      onClose={() => handleVisibilityToggle(false)}
                      nowPlaying={null}
                    />
                  </div>
                )}

              {!playerState.isPlaying && playerState.hasStarted && (
                <>
                  {nextFragment && playerState.isEnded && (
                    <NarrationsButton
                      text="Continue"
                      onClick={handleContinue}
                      triangleColor="#8695c0"
                      trianglePlacement="left"
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
