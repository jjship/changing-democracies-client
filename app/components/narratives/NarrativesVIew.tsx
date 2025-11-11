import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FC, useCallback, useMemo, useRef } from "react";
import OverviewTag from "./NarrativesOverviewButton";
import { NarrativesFilmPlayer } from "@/components/narratives/NarrativesFilmPlayer";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrativesBioSidePanel } from "@/components/narratives/NarrativesBioSidePanel";
import { useNarrativeNavigation } from "./utils/narrativeNavigation";
import { VideoControls } from "./VideoControls";
import { useSyncWidths } from "./hooks/useSyncWidths";

const NarrativesView: FC = ({}) => {
  const {
    currentPath,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    setCurrentPath,
    showSidePanel,
    setShowSidePanel,
    selectedLanguage,
  } = useNarrativesContext();

  const { navigateToOverview } = useNarrativeNavigation();

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  // Sync title container width with video container width
  useSyncWidths(videoContainerRef, titleContainerRef);

  const handleStart = () => {
    setIsPlaying(true);
    setShowSidePanel(false);
  };

  const handleContinue = useCallback(() => {
    if (currentPath && currentIndex !== currentPath.fragments.length) {
      setIsPlaying(true);
      setShowSidePanel(false);
    }
  }, [currentIndex, currentPath, setIsPlaying, setShowSidePanel]);

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
    navigateToOverview();
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
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: "0.5s",
              }}
            >
              {getTitleInLanguage(currentPath.titles)}
            </h1>
          </div>

          <Flex
            ref={videoContainerRef}
            className="relative flex w-full min-w-0 max-w-full flex-1 items-center justify-center overflow-hidden rounded-bl-2xl rounded-br-2xl border-4 border-red-500 px-2 sm:px-4 md:rounded-bl-3xl md:rounded-br-3xl"
            style={{ minHeight: 0 }}
          >
            <NarrativesFilmPlayer />
            <VideoControls
              isPlaying={isPlaying}
              currentIndex={currentIndex}
              totalFragments={currentPath.fragments.length}
              showSidePanel={showSidePanel}
              onStart={handleStart}
              onContinue={handleContinue}
            />
          </Flex>
        </Flex>
        <NarrativesBioSidePanel />
      </div>
    )
  );
};

export { NarrativesView };
