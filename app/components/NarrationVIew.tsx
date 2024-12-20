"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FilmsContext } from "@/components/films/FilmsContext";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import NarrationsButton from "@/ui/NarrationsContinueButton";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";
import OverviewTag from "./OverviewButton";

type PlayerState = {
  currentIndex: number;
  isPlaying: boolean;
  isVisible: boolean;
  hasStarted: boolean;
  isEnded: boolean;
};

const NarrationsView: FC<{
  narrationPath: NarrationPath;
  onOverViewCLick?: Dispatch<SetStateAction<NarrationPath | null>>;
}> = ({ narrationPath, onOverViewCLick }) => {
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
      backgroundSize: "cover", // Changed back to "cover" to remove black bars
      backgroundPosition: "center" as const,
      backgroundRepeat: "no-repeat" as const,
      width: "100%",
      height: "100%",
      alignItems: "center" as const,
      justifyContent: "center" as const,
      position: "relative" as const,
    }),
    [playerState.isEnded, currentFragment, nextFragment],
  );

  return (
    <div className="relative top-[8vh] h-full w-full">
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "10%", // Adds margin right 10%
          width: "50%", // Half width
          height: "60px",
          backgroundColor: "#8083ae",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          color: "white",
          fontSize: "1.25rem",
          fontWeight: 500,
          marginRight: "1vw",
        }}
      >
        <h1 className="text-xl font-medium text-white">
          {narrationPath.title || "Narration"}
        </h1>
      </div>
      <div>
        <OverviewTag onClick={onOverViewCLick} />
      </div>

      {/* Main content area with proper top padding to account for title bar */}
      <div className="h-full w-full pt-[60px]">
        <FilmsContext.Provider value={filmsContextValue}>
          <Flex
            height="100%"
            align="center"
            justify="center"
            direction="column"
          >
            <Flex style={backgroundStyle}>
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
                        <CountDown
                          onFinish={handleContinue}
                          onCountingChange={() => {}}
                        />
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
          <SequenceProgressBar
            narrationFragments={narrationPath.fragments}
            currentFragmentIndex={playerState.currentIndex}
            totalFragments={narrationPath.fragments.length}
            onFragmentSelect={handleFragmentSelect}
          />
        </FilmsContext.Provider>
      </div>
    </div>
  );
};

export { NarrationsView };
