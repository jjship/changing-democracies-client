import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FC } from "react";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";
import OverviewTag from "./NarrativesOverviewButton";
import CountDown from "@/components/narratives/CountDown";
import { NarrativesFilmPlayer } from "@/components/narratives/NarrativesFilmPlayer";
import NarrativesViewButton from "@/components/narratives/NarrativesViewButton";

const NarrativesView: FC = ({}) => {
  const {
    currentPath,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    setCurrentPath,
    showCountDown,
    setShowCountDown,
  } = useNarrativesContext();

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
        // flexGrow={'1'}
        // flexBasis={'1'}
        width={"100%"}
        align="center"
        justify={"center"}
        className={"mt-10"}
        direction={"column"}
      >
        <div
          className={
            "flex h-[10%] w-[85%] flex-row items-start justify-between"
          }
        >
          <>
            <div className={"relative right-16 top-2 z-10"}>
              <OverviewTag onClick={handleOverview} />
            </div>
            <h1 className="mr-8 flex h-16 w-1/2 items-center justify-center rounded-t-sm bg-[#8083ae] py-6 font-bold text-white">
              {currentPath?.title || "Narration"}
            </h1>
          </>
        </div>

        <Flex className="relative flex w-[85%] items-center justify-center">
          {<NarrativesFilmPlayer />}

          {!isPlaying && currentIndex === 0 && (
            <Flex
              direction={"column"}
              justify={"center"}
              align={"center"}
              className={"absolute w-full"}
            >
              <NarrativesViewButton
                text="Start"
                onClick={handleStart}
                triangleColor="#8083ae"
                trianglePlacement="left"
              />
            </Flex>
          )}
          {!isPlaying &&
            currentIndex > 0 &&
            currentIndex <= currentPath.fragments.length && (
              <Flex
                direction={"row"}
                justify={"center"}
                align={"center"}
                className={"absolute w-full"}
              >
                <NarrativesViewButton
                  text="Continue"
                  onClick={handleContinue}
                  triangleColor="#8083ae"
                  trianglePlacement="left"
                />
                {showCountDown && <CountDown onFinish={handleContinue} />}
              </Flex>
            )}
        </Flex>
      </Flex>
    )
  );
};

export { NarrativesView };
