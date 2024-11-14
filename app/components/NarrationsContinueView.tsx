"use client";

import { Path } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import Countdown from "@/ui/countDown";
import { useEffect, useState } from "react";
import FilmPlayer from "@/components/films/FilmPlayer";
import { FilmsContext } from "@/components/films/FilmsContext";

export default function NarrationsContinueView(props: { path?: Path }) {
  const { path } = props;
  const [isCounting, setIsCounting] = useState(true); // Start with counting
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (path && path.fragments && path.fragments.length > 0) {
      const sortedFragments = [...path.fragments].sort(
        (a, b) => a.sequence - b.sequence,
      );
      const currentFragment = sortedFragments[currentFragmentIndex];
      if (currentFragment) {
        setNowPlaying(currentFragment.guid);
        setShowControls(false);
        setIsVideoEnded(false);
      }
    }
  }, [path, currentFragmentIndex]);

  if (!path || !path.fragments) {
    return <div>Loading... or No path data available.</div>;
  }

  const sortedFragments = [...path.fragments].sort(
    (a, b) => a.sequence - b.sequence,
  );

  const currentFragment = sortedFragments[currentFragmentIndex];
  const nextFragment = sortedFragments[currentFragmentIndex + 1];

  const handleNextFragment = () => {
    if (currentFragmentIndex < sortedFragments.length - 1) {
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
          zIndex: 100,
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
        {isCounting ? (
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
        ) : (
          <FilmsContext.Provider
            value={{
              films: sortedFragments,
              setFilms: () => {},
              filmsCollection: {
                films: sortedFragments,
                tags: [],
                countries: [],
                people: [],
              },
              nowPlaying,
              setNowPlaying,
            }}
          >
            {!isVideoEnded && <FilmPlayer onEnded={handleVideoEnd} />}
          </FilmsContext.Provider>
        )}
        {showControls && (
          <NarrationsContinueButton path={path} onClick={handleContinueClick} />
        )}
      </Flex>
    </Flex>
  );
}
