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
import SequenceProgressBar from "./SequenceProgrwssBar";
import { NarrativesOverview } from "../NarrativesOverview";
import OverviewTag from "./NarrationOverviewButton";
import Title from "../Title";

const NarrationsView: FC = ({}) => {
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
    <Flex height="100%" align="center" justify="center" direction="column">
      <Flex align="center" justify="center" direction="row">
        <>
          <OverviewTag onClick={handleOverview} />
          {currentPath && (
            <Title
              text={`${currentPath?.title}`}
              theme="dark"
              color="yellow_secondary"
              alt={true}
            />
          )}
        </>
        {/* <Title text={`${currentPath?.title}`} theme={"light"}></Title>
        <h1 className="mx-auto text-white">
          {currentPath?.title || "Narration"}
        </h1> */}
      </Flex>

      <Flex style={backgroundStyle}>
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
              {isEnded &&
                currentPath &&
                currentIndex === currentPath?.fragments.length - 1 && (
                  <NarrationsContinueButton
                    text="Reopen"
                    onClick={handleReopen}
                    triangleColor="#8083ae"
                    trianglePlacement="left"
                  />
                )}
            </>
          )
        )}
      </Flex>
      {/* <SequenceProgressBar /> */}
    </Flex>
  );
};

export { NarrationsView };
//'DevTools: Open'
