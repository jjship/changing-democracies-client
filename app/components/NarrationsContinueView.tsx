"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import Countdown from "@/ui/countDown";
import { useEffect, useState } from "react";
import NarrationsFilmPlayer from "@/components/films/NarrationsFilmPlayer";
import { FilmsContext } from "@/components/films/FilmsContext";
import SequenceProgressBar from "@/components/SequenceProgrwssBar";

export default function NarrationsContinueView(props: {
  narrationPath: NarrationPath;
}) {
  const { narrationPath } = props; // lets remember to make sure the path has sorted path.fragments - sorting is slow
  const [isCounting, setIsCounting] = useState(false); // we have to start with a user interaction so chrome allows for unmuted playback
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (
      narrationPath &&
      narrationPath.fragments &&
      narrationPath.fragments.length > 0
    ) {
      const currentFragment = narrationPath.fragments[currentFragmentIndex];
      if (currentFragment) {
        if (!isFirstInteraction) {
          setNowPlaying(currentFragment.guid);
          setShowControls(false);
          setIsVideoEnded(false);
        }
      }
    }
  }, [narrationPath, currentFragmentIndex]);

  if (!narrationPath || !narrationPath.fragments) {
    return <div>Loading... or No narrationPath data available.</div>;
  }

  const currentFragment = narrationPath.fragments[currentFragmentIndex];
  const nextFragment = narrationPath.fragments[currentFragmentIndex + 1];

  const handleNextFragment = () => {
    if (isFirstInteraction) {
      setNowPlaying(currentFragment.guid);
      setShowControls(false);
      setIsVideoEnded(false);
      setIsFirstInteraction(false);
    } else if (currentFragmentIndex < narrationPath.fragments.length - 1) {
      setCurrentFragmentIndex((prevIndex) => prevIndex + 1);
      setIsCounting(true); // Reset counting for next fragment
      setShowControls(false);
      setIsVideoEnded(false);
    } else {
      console.log("All fragments completed");
    }
  };

  const handleCountdownFinish = () => {
    setIsCounting(false);
    handleNextFragment();
  };

  const handleContinueClick = () => {
    handleNextFragment();
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowControls(true);
    setIsCounting(true);
  };

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
        nowPlaying,
        setNowPlaying,
      }}
    >
      <Flex
        height={"100%"}
        align={"center"}
        justify={"center"}
        direction={"column"}
      >
        <Flex
          style={{ justifyContent: "end", color: "#8695c0" }}
          className={"w-full"}
        >
          <Flex
            style={{ justifyContent: "center" }}
            className={
              "grow-2 relative right-5 top-1/4 box-border h-[10vh] min-w-[40%] items-center rounded-[3px] bg-[#8695c0] px-10"
            }
          >
            <Text
              className={
                "text-center text-white sm:text-[0.5rem] md:text-[1.5vw] lg:text-[1vw]"
              }
            >
              {narrationPath.title}
            </Text>
          </Flex>
        </Flex>
        <Flex
          style={{
            // zIndex: 100,
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
          {/* <SequenceProgressBar
          currentFragmentIndex={currentFragmentIndex}
          totalFragments={narrationPath.fragments.length}
        /> */}
          {/* {isCounting && (
          <Flex
            align="center"
            justify="center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              zIndex: 200,
            }}
          >
            <Countdown
              isCounting={setIsCounting}
              onFinish={handleCountdownFinish}
            />
          </Flex>
        )} */}
          {isFirstInteraction
            ? showControls && (
                <>
                  <NarrationsContinueButton
                    text={isFirstInteraction ? "start" : "continue"}
                    onClick={handleContinueClick}
                  />
                </>
              )
            : showControls && (
                <>
                  <NarrationsContinueButton
                    text={isFirstInteraction ? "start" : "continue"}
                    onClick={handleContinueClick}
                  />
                  <Countdown
                    isCounting={setIsCounting}
                    onFinish={handleCountdownFinish}
                  />
                </>
              )}
        </Flex>
        {!isCounting && !isVideoEnded && !!nowPlaying && (
          <NarrationsFilmPlayer onEnded={handleVideoEnd} />
        )}
      </Flex>
    </FilmsContext.Provider>
  );
}
