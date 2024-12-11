"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FilmsContext } from "@/components/films/FilmsContext";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import NarrationsButton from "@/ui/NarrationsContinueButton";
import React, { FC, useCallback, useMemo, useState } from "react";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";

type PlayerState = {
  currentIndex: number;
  isPlaying: boolean;
  isVisible: boolean;
  // hasStarted: boolean;
  // isEnded: boolean;
};

const NarrationsView: FC<{ narrationPath: NarrationPath }> = ({
  narrationPath,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentIndex: 0,
    isPlaying: false,
    isVisible: true,
    // hasStarted: false,
    // isEnded: false,
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
      // hasStarted: true,
      // isEnded: false,
    });
  }, [updatePlayerState]);

  const handleFragmentSelect = useCallback(
    (index: number) => {
      updatePlayerState({
        currentIndex: index,
        isPlaying: true,
        // hasStarted: true,
        isVisible: true,
        // isEnded: false,
      });
    },
    [updatePlayerState],
  );

  const handleVideoEnd = useCallback(() => {
    updatePlayerState({
      isPlaying: false,
      // isEnded: true,
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
        // isEnded: false,
      });
    },
    [updatePlayerState],
  );

  const handleReopen = useCallback(() => {
    updatePlayerState({
      isVisible: true,
      isPlaying: true,
      // isEnded: false,
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
      overflow: "hidden",
      backgroundImage: `url(${
        playerState.isEnded && nextFragment
          ? nextFragment.thumbnailUrl
          : currentFragment.thumbnailUrl
      })`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }),
    [playerState.isEnded, currentFragment, nextFragment],
  );

  return (
    <Flex className="absolute left-[50%] top-[50%] h-[80%] w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center rounded-3xl bg-black_bg">
      <div className="h-[80%] w-[80%]">
        <FilmsContext.Provider value={filmsContextValue}>
          <Flex
            height="100%"
            align="center"
            justify="center"
            direction="column"
          >
            <Flex style={backgroundStyle}>
              <Flex
                width="40%"
                position="absolute"
                right="15%"
                top="0"
                py="10px"
                style={{
                  borderRadius: "2px 2px 0px 0px",
                  backgroundColor: "#8083ae",
                  color: "white",
                }}
              >
                <h1 className="mx-auto text-white">
                  {narrationPath.title || "Narration"}
                </h1>
              </Flex>
              {playerState.isVisible && (
                <NarrationsFilmPlayer
                  nowPlaying={currentFragment?.guid ?? null}
                  onEnded={handleVideoEnd}
                  onClose={() => handleVisibilityToggle(false)}
                />
              )}

              {!playerState.isVisible ? (
                <>
                  <NarrationsContinueButton
                    text="Continue"
                    onClick={handleReopen}
                    triangleColor="#8083ae"
                    trianglePlacement="left"
                  />
                </>
              ) : (
                <>
                  {!playerState.isPlaying && playerState.hasStarted && (
                    <>
                      {nextFragment && playerState.isEnded && (
                        <NarrationsContinueButton
                          text="Continue"
                          onClick={handleContinue}
                          triangleColor="#8083ae"
                          trianglePlacement="left"
                        />
                      )}
                      {playerState.isEnded && !isLastFragment && (
                        <CountDown onFinish={handleContinue} />
                      )}
                    </>
                  )}

                  {!playerState.hasStarted && (
                    <NarrationsButton
                      text="Start"
                      onClick={handleStart}
                      triangleColor="#8083ae"
                      trianglePlacement="left"
                    />
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </FilmsContext.Provider>
      </div>
    </Flex>
  );
};

export { NarrationsView };
