import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FC, useCallback, useMemo } from "react";
import OverviewTag from "./NarrativesOverviewButton";
import NarrativesCountDown from "@/components/narratives/NarrativesCountDown";
import { NarrativesFilmPlayer } from "@/components/narratives/NarrativesFilmPlayer";
import NarrativesViewButton from "@/components/narratives/NarrativesViewButton";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrativesBioSidePanel } from "@/components/narratives/NarrativesBioSidePanel";

const NarrativesView: FC = ({}) => {
  const {
    currentPath,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    setCurrentPath,
    switchPath,
    setSwitchPath,
    showSidePanel,
    setShowSidePanel,
    selectedLanguage,
  } = useNarrativesContext();

  const handleStart = () => {
    setIsPlaying(true);
    switchPath && setSwitchPath(false);
    setShowSidePanel(false);
  };

  const handleContinue = useCallback(() => {
    if (currentPath && currentIndex !== currentPath.fragments.length) {
      switchPath && setSwitchPath(false);
      setIsPlaying(true);
      setShowSidePanel(false);
    }
  }, [
    currentIndex,
    currentPath,
    setIsPlaying,
    setSwitchPath,
    switchPath,
    setShowSidePanel,
  ]);

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
    switchPath && setSwitchPath(false);
  };

  const getTitleInLanguage = useMemo(
    () => (titles: { languageCode: string; title: string }[]) => {
      return (
        (titles.find((title) => title.languageCode === selectedLanguage)
          ?.title ||
          titles.find((title) => title.languageCode === "EN")?.title) ??
        "Narrative"
      );
    },
    [selectedLanguage],
  );

  return (
    currentPath && (
      <div className="h-full w-full border-4 border-solid border-yellow-500">
        <Flex
          className={`flex h-full w-full flex-col items-center justify-start overflow-auto border-4 border-solid border-blue-500 pt-[4.5vh]`}
        >
          <div
            className={`flex min-h-[60px] w-[85%] flex-shrink-0 flex-row items-start justify-between border-4 border-solid border-green-500`}
          >
            <div className={"relative right-16 top-2 z-10"}>
              <OverviewTag onClick={handleOverview} />
            </div>
            <h1
              className="mr-8 flex h-16 w-1/2 items-center justify-center rounded-t-sm bg-[#8083ae] py-6 font-bold text-white"
              style={{
                opacity: switchPath ? 0 : 1,
                transform: switchPath ? "translateY(20px)" : "translateY(0)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: switchPath ? "0s" : "0.5s",
              }}
            >
              {getTitleInLanguage(currentPath.titles)}
            </h1>
          </div>

          <Flex className="border-white-500 relative flex min-h-0 w-[85%] flex-1 items-center overflow-hidden border-4 border-solid">
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
                  {!switchPath && !showSidePanel && (
                    <NarrativesCountDown onFinish={handleContinue} />
                  )}
                </Flex>
              )}
          </Flex>
        </Flex>
        <NarrativesBioSidePanel />
      </div>
    )
  );
};

export { NarrativesView };
