import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  // Function to sync the widths
  const syncContainerWidths = useCallback(() => {
    if (videoContainerRef.current && titleContainerRef.current) {
      const videoWidth = videoContainerRef.current.offsetWidth;
      titleContainerRef.current.style.width = `${videoWidth}px`;
    }
  }, []);

  // Set up the resize observer
  useEffect(() => {
    // Initial sync
    syncContainerWidths();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(syncContainerWidths);
    });

    // Observe the video container
    if (videoContainerRef.current) {
      resizeObserver.observe(videoContainerRef.current);
    }

    // Also observe window resize as a fallback
    window.addEventListener("resize", syncContainerWidths);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncContainerWidths);
    };
  }, [syncContainerWidths]);

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
      <div className="h-full w-full ">
        <Flex
          justify={"center"}
          className={`flex h-full w-full flex-col items-center   `}
        >
          <div
            ref={titleContainerRef}
            className={`flex min-h-[60px] flex-shrink-0 flex-row items-start justify-between `}
          >
            <div className={"relative right-10 top-2 z-10"}>
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

          <Flex
            ref={videoContainerRef}
            className=" relative flex aspect-video flex-1 items-center overflow-hidden "
          >
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
