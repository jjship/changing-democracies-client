"use client";

import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import React, { FC } from "react";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";
import { useNarrationContext } from "@/app/narratives/NarrationsContext";
import { NarrationPath } from "@/types/videosAndFilms";
import { handleClientScriptLoad } from "next/script";
import { set } from "date-fns";

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

  // const currentFragment = currentPath?.fragments[currentIndex];
  // const nextFragment = currentPath?.fragments[currentIndex + 1];

  const handleStart = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setIsEnded(false);
    setIsVisible(true);
  };

  const handleContinue = () => {
    if (
      !currentIndex &&
      currentPath &&
      currentIndex !== currentPath?.fragments.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
      setIsEnded(false);
      setIsVisible(true);
    }
  };
  console.log(currentIndex);
  const handleReopen = () => {
    setIsPlaying(true);
    setIsEnded(false);
    setIsVisible(true);
  };

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
    setIsEnded(false);
    setHasStarted(false);
    setIsVisible(false);
    setFilms(null);
  };

  const backgroundStyle = {
    overflow: "hidden",
    backgroundImage: `url(${
      isEnded && currentPath && currentPath.fragments[currentIndex]
        ? currentPath.fragments[currentIndex + 1]?.thumbnailUrl
        : currentPath?.fragments[currentIndex].thumbnailUrl
    })`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Flex className="absolute left-[50%] top-[50%] h-[80%] w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center rounded-3xl bg-black_bg">
      <div className="h-[80%] w-[80%]">
        <Flex height="100%" align="center" justify="center" direction="column">
          <Flex style={backgroundStyle}>
            <NarrationsContinueButton
              text="Overview"
              onClick={handleOverview}
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

            {!isVisible && currentIndex === 0 ? (
              <NarrationsContinueButton
                text="Start"
                onClick={handleStart}
                triangleColor="#8083ae"
                trianglePlacement="left"
              />
            ) : (
              !isPlaying && (
                <>
                  {isEnded &&
                    currentPath?.fragments &&
                    currentIndex !== currentPath.fragments.length - 1 && (
                      <CountDown onFinish={handleContinue} />
                    )}
                  {isEnded && currentIndex !== 0 && (
                    <NarrationsContinueButton
                      text="Continue"
                      onClick={handleContinue}
                      triangleColor="#8083ae"
                      trianglePlacement="left"
                    />
                  )}
                </>
              )
            )}
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export { NarrationsView };
