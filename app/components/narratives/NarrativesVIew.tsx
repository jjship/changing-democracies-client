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
          {<NarrativesFilmPlayer />}

          {!isPlaying && currentIndex === 0 && (
            <NarrativesViewButton
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
                <NarrativesViewButton
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

export { NarrativesView };
