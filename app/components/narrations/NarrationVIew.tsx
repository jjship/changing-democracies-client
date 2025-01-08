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
    showCountDown,
    setShowCountDown,
  } = useNarrationContext();

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleContinue = () => {
    if (currentPath && currentIndex !== currentPath.fragments.length) {
      !showCountDown && setShowCountDown(true);
      setIsPlaying(true);
    }
  };

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    currentPath && (
      <Flex
        height={"90%"}
        width={"100%"}
        align="center"
        // justify=""
        direction="column"
      >
        <div
          className={"flex h-[10%] w-[80%] flex-row justify-between self-start"}
        >
          <>
            <div className={"w-fit"}>
              <OverviewTag onClick={handleOverview} />
            </div>
            <h1 className="flex h-14 items-center bg-[#8083ae] px-2 text-white">
              {currentPath?.title || "Narration"}
            </h1>
          </>
        </div>

        <Flex className="relative flex w-[80%] items-center justify-center">
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
                {showCountDown && <CountDown onFinish={handleContinue} />}
              </>
            )}
        </Flex>
      </Flex>
    )
  );
};

export { NarrationsView };
