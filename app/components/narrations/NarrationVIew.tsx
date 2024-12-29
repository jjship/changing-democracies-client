"use client";

import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import NarrationsButton from "@/ui/NarrationsContinueButton";
import React, { FC } from "react";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";
import { useNarrationContext } from "@/app/narratives/NarrationsContext";
import { NarrationPath } from "@/types/videosAndFilms";
import OverviewTag from "../OverviewButton";

const NarrationsView: FC<{ narrationPath: NarrationPath }> = ({
  narrationPath,
}) => {
  const {
    currentPath,
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
    setCurrentPath,
  } = useNarrationContext();

  const currentFragment = currentPath?.fragments[currentIndex];
  const nextFragment = currentPath?.fragments[currentIndex + 1];
  const isLastFragment =
    currentPath?.fragments && currentIndex === currentPath.fragments.length - 1;

  const handleStart = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setIsEnded(false);
  };

  const handleContinue = () => {
    if (!isLastFragment) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
      setIsEnded(false);
      setIsVisible(true);
    }
  };

  const dupa = () => {
    setCurrentPath(null);
  };

  const handleReopen = () => {
    setIsPlaying(true);
    setIsEnded(false);
    setIsVisible(true);
  };
  const backgroundStyle = () => ({
    overflow: "hidden",
    backgroundImage: `url(${
      isEnded && nextFragment
        ? nextFragment.thumbnailUrl
        : currentFragment?.thumbnailUrl
    })`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <Flex className="absolute left-[50%] top-[50%] h-[80%] w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center rounded-3xl bg-black_bg">
      <div className="h-[80%] w-[80%]">
        <Flex height="100%" align="center" justify="center" direction="column">
          <Flex style={backgroundStyle()}>
            <NarrationsContinueButton
              text="Overview"
              onClick={() => setCurrentPath(null)} // now we can use setter functions from context in lower components without passing them in props as in NarrationsFilmPlayer
              triangleColor="#8083ae"
              trianglePlacement="right"
            />

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
                {currentPath?.title || "Narration"}
              </h1>
            </Flex>
            {isVisible && <NarrationsFilmPlayer />}

            {!isVisible ? (
              <>
                <NarrationsContinueButton
                  text="Continue"
                  onClick={handleReopen} // now we can use setter functions from context in lower components without passing them in props as in NarrationsFilmPlayer
                  triangleColor="#8083ae"
                  trianglePlacement="left"
                />
              </>
            ) : (
              <>
                {!isPlaying && hasStarted && (
                  <>
                    {nextFragment && isEnded && (
                      <NarrationsContinueButton
                        text="Continue"
                        onClick={handleContinue} //  now we can use setter functions from context in lower components without passing them in props as in NarrationsFilmPlayer
                        triangleColor="#8083ae"
                        trianglePlacement="left"
                      />
                    )}
                    {isEnded && !isLastFragment && (
                      <CountDown onFinish={handleContinue} />
                    )}
                  </>
                )}

                {!hasStarted && (
                  <NarrationsButton
                    text="Start"
                    onClick={handleStart} // now we can use setter functions from context in lower components without passing them in props
                    triangleColor="#8083ae"
                    trianglePlacement="left"
                  />
                )}
              </>
            )}
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export { NarrationsView };
