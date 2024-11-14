"use client";

import { NarrationPath } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import Countdown from "@/ui/countDown";
import { useEffect, useState } from "react";
import FilmPlayer from "@/components/films/FilmPlayer";
import { FilmsContext } from "@/components/films/FilmsContext";
import SequenceProgressBar from "@/components/SequenceProgrwssBar";

export default function NarrationsContinueView(props: { path: NarrationPath }) {
  const { path } = props; // lets remember to make sure the path has sorted path.fragments - sorting is slow
  const [isCounting, setIsCounting] = useState(false); // we have to start with a user interaction so chrome allows for unmuted playback
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (path && path.fragments && path.fragments.length > 0) {
      const currentFragment = path.fragments[currentFragmentIndex];
      if (currentFragment) {
        if (!isFirstInteraction) {
          setNowPlaying(currentFragment.guid);
          setShowControls(false);
          setIsVideoEnded(false);
        }
      }
    }
  }, [path, currentFragmentIndex]);

  if (!path || !path.fragments) {
    return <div>Loading... or No path data available.</div>;
  }

  const currentFragment = path.fragments[currentFragmentIndex];
  const nextFragment = path.fragments[currentFragmentIndex + 1];

  const handleNextFragment = () => {
    if (isFirstInteraction) {
      setNowPlaying(currentFragment.guid);
      setShowControls(false);
      setIsVideoEnded(false);
      setIsFirstInteraction(false);
    } else if (currentFragmentIndex < path.fragments.length - 1) {
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
    setShowControls(true);
  };

  const handleContinueClick = () => {
    handleNextFragment();
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowControls(true);
  };

  return (
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
            {path.title}
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
          totalFragments={path.fragments.length}
        /> */}
        {isCounting && (
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
        )}
        {showControls && (
          <NarrationsContinueButton
            path={path}
            text={isFirstInteraction ? "start" : "continue"}
            onClick={handleContinueClick}
          />
        )}
      </Flex>
      {!isCounting && (
        <FilmsContext.Provider
          value={{
            films: path.fragments,
            setFilms: () => {},
            filmsCollection: {
              films: path.fragments,
              tags: [],
              countries: [],
              people: [],
            },
            nowPlaying,
            setNowPlaying,
          }}
        >
          {!isVideoEnded && !!nowPlaying && (
            <FilmPlayer onEnded={handleVideoEnd} />
          )}
        </FilmsContext.Provider>
      )}
    </Flex>
  );
}
