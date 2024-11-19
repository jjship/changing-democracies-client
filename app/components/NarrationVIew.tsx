"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import NarrationsFilmPlayer from "@/components/films/NarrationsFilmPlayer";
import { FilmsContext } from "@/components/films/FilmsContext";
import Countdown from "@/ui/countDown";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import { useEffect, useState } from "react";
import SequenceProgressBar from "./SequenceProgrwssBar";

export default function NarrationsContinueView({
  narrationPath,
}: {
  narrationPath: NarrationPath;
}) {
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const currentFragment = narrationPath.fragments?.[currentFragmentIndex];
  const nextFragment = narrationPath.fragments?.[currentFragmentIndex + 1];

  useEffect(() => {
    if (currentFragment && !isVideoEnded) {
      setNowPlaying(currentFragment.guid);
    }
  }, [currentFragment, isVideoEnded]);

  const handleCountdownFinish = () => {
    if (currentFragmentIndex < narrationPath.fragments.length - 1) {
      setCurrentFragmentIndex((prev) => prev + 1);
      setIsVideoEnded(false);
      setShowControls(false);
      setIsCounting(false);
    }
  };

  const handleContinueClick = () => {
    if (currentFragmentIndex < narrationPath.fragments.length - 1) {
      setCurrentFragmentIndex((prev) => prev + 1);
      setIsVideoEnded(false);
      setShowControls(false);
      setIsCounting(false);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowControls(true);
    setIsCounting(true);
  };

  const handleClose = () => {
    setIsPlayerVisible(false);
    setNowPlaying(null);
    setIsVideoEnded(false);
    setIsCounting(false);
  };

  if (!isPlayerVisible) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NarrationsContinueButton
          text="Continue"
          onClick={() => {
            setIsPlayerVisible(true);
            setNowPlaying(currentFragment?.guid || null);
          }}
        />
      </div>
    );
  }

  return (
    <FilmsContext.Provider
      value={{
        films: narrationPath.fragments,
        setFilms: () => {},
        filmsCollection: {
          films: narrationPath.fragments,
          tags: [],
          countries: [],
          people: [],
        },
        nowPlaying: currentFragment?.guid,
        setNowPlaying: (filmId: string | null) => {
          if (filmId) {
            const newIndex = narrationPath.fragments.findIndex(
              (f) => f.guid === filmId,
            );
            if (newIndex !== -1) {
              setCurrentFragmentIndex(newIndex);
            }
          }
        },
      }}
    >
      <Flex height="100%" align="center" justify="center" direction="column">
        {/* Video Container */}
        <Flex
          style={{
            overflow: "hidden",
            backgroundImage: `url(${
              isVideoEnded && nextFragment
                ? nextFragment.thumbnailUrl
                : currentFragment.thumbnailUrl
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {nowPlaying && !isVideoEnded && (
            <NarrationsFilmPlayer
              onEnded={handleVideoEnd}
              key={nowPlaying}
              onClose={handleClose}
            />
          )}

          {isVideoEnded && (
            <>
              {isCounting && (
                <Countdown
                  onFinish={handleCountdownFinish}
                  onCountingChange={setIsCounting}
                />
              )}
              {showControls && nextFragment && (
                <NarrationsContinueButton
                  text="Continue"
                  onClick={handleContinueClick}
                />
              )}
            </>
          )}

          <SequenceProgressBar
            currentFragmentIndex={currentFragmentIndex}
            totalFragments={narrationPath.fragments.length}
            setCurrentFragmentIndex={setCurrentFragmentIndex}
            setIsVideoEnded={setIsVideoEnded}
          />
        </Flex>
      </Flex>
    </FilmsContext.Provider>
  );
}
