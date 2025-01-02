"use client";

import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import React, { FC } from "react";
import { CountDown } from "./CountDown";
import { NarrationsFilmPlayer } from "@/components/films/NarrationsFilmPlayer";
import { useNarrationContext } from "@/app/narratives/NarrationsContext";
import OverviewTag from "./NarrationOverviewButton";

const NarrationsView: FC = ({}) => {
  const {
    currentPath,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    setCurrentPath,
  } = useNarrationContext();

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleContinue = () => {
    if (currentPath && currentIndex !== currentPath.fragments.length) {
      setIsPlaying(true);
    }
  };

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const backgroundStyle = {
    overflow: "hidden",
    backgroundImage: `url(${
      (!isPlaying &&
        currentIndex === 0 &&
        currentPath?.fragments[0]?.thumbnailUrl) ||
      currentPath?.fragments[currentIndex]?.thumbnailUrl ||
      currentPath?.fragments[0]?.thumbnailUrl
    })`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "80%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    currentPath && (
      <Flex
        overflow="clip"
        height="100%"
        align="center"
        justify="center"
        direction="column"
      >
        <div className={"flex w-[80%] flex-row justify-between self-start"}>
          <>
            <div className={"w-fit"}></div>
            <OverviewTag onClick={handleOverview} />
            <h1 className="flex h-14 items-center bg-[#8083ae] text-white">
              {currentPath?.title || "Narration"}
            </h1>
          </>
        </div>

        <Flex style={backgroundStyle}>
          {<NarrationsFilmPlayer />}

          {!isPlaying && currentIndex === 0 && (
            <NarrationsContinueButton
              text="Start"
              onClick={handleStart}
              triangleColor="#8083ae"
              trianglePlacement="left"
            />
          )}
          {!isPlaying &&
            currentIndex > 0 &&
            currentIndex <= currentPath.fragments.length && (
              <>
                <NarrationsContinueButton
                  text="Continue"
                  onClick={handleContinue}
                  triangleColor="#8083ae"
                  trianglePlacement="left"
                />
                <CountDown onFinish={handleContinue} />
              </>
            )}
        </Flex>
      </Flex>
    )
  );
};

export { NarrationsView };