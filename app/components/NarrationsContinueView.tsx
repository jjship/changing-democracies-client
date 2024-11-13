"use client";

import { Path } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import Countdown from "@/ui/countDown";
import { useEffect, useState } from "react";
import { FilmPlayer } from "@/components/films/FilmPlayer";
import { FilmsContext } from "@/components/films/FilmsContext";

export default function NarrationsContinueView(props: { path: Path }) {
  const { path } = props;
  const [isCounting, setIsCounting] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);

  const sortedFragments = [...path.fragments].sort(
    (a, b) => a.sequence - b.sequence,
  );

  const currentFragment = sortedFragments[currentFragmentIndex];

  useEffect(() => {
    if (currentFragment) {
      setNowPlaying(currentFragment.guid);
    }
  }, [currentFragment]);

  const handleNextFragment = () => {
    if (currentFragmentIndex < sortedFragments.length - 1) {
      setCurrentFragmentIndex((prevIndex) => prevIndex + 1);
      setIsCounting(false);
    }
  };

  const handleCountdownFinish = () => {
    handleNextFragment();
  };
  return (
    <>
      {path && currentFragment && (
        <Flex
          height={"100%"}
          align={"center"}
          justify={"center"}
          direction={"column"}
        >
          <Flex
            style={{
              justifyContent: "end",
              color: "#8695c0",
            }}
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
              backgroundImage: `url(${currentFragment.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NarrationsContinueButton></NarrationsContinueButton>
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
              <FilmPlayer />
            </FilmsContext.Provider>

            {/*{isCounting && (*/}
            {/*  <Countdown*/}
            {/*    isCounting={setIsCounting}*/}
            {/*    onFinish={handleNextFragment}*/}
            {/*  />*/}
            {/*)}*/}

            {isCounting && (
              <Countdown
                isCounting={setIsCounting}
                onFinish={handleCountdownFinish}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
