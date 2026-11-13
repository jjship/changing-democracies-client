import "@radix-ui/themes/styles.css";
import { Flex } from "@radix-ui/themes";
import { FC } from "react";
import { getLocalizedField } from "@/utils/i18n/getLocalizedField";
import OverviewTag from "./NarrativesOverviewButton";
import { NarrativesFilmPlayer } from "@/components/narratives/NarrativesFilmPlayer";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrativesBioSidePanel } from "@/components/narratives/NarrativesBioSidePanel";
import { useNarrativeNavigation } from "./utils/narrativeNavigation";
import { VideoControls } from "./VideoControls";

export const NarrativesView: FC = ({}) => {
  const {
    currentPath,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    setCurrentPath,
    setShowSidePanel,
    selectedLanguage,
  } = useNarrativesContext();

  const { navigateToOverview } = useNarrativeNavigation();

  const handleStart = () => {
    setIsPlaying(true);
    setShowSidePanel(false);
  };

  const handleOverview = () => {
    setCurrentPath(null);
    setCurrentIndex(0);
    setIsPlaying(false);
    navigateToOverview();
  };

  return (
    currentPath && (
      <div className="h-full w-full ">
        <Flex
          justify={"center"}
          className={`flex h-full w-full flex-col items-center   `}
        >
          <div className="flex min-h-[60px] w-full flex-shrink-0 flex-row items-start justify-between">
            <div className={"relative right-10 top-2 z-10"}>
              <OverviewTag onClick={handleOverview} />
            </div>
            <h1 className="mr-8 flex h-16 w-1/2 items-center justify-center rounded-t-sm bg-[#8083ae] py-6 font-bold text-white">
              {getLocalizedField(
                currentPath.titles,
                selectedLanguage,
                "title",
              ) ?? "Narrative"}
            </h1>
          </div>

          <Flex
            className="relative flex w-full min-w-0 max-w-full flex-1 items-center justify-center overflow-hidden rounded-bl-3xl rounded-br-3xl px-4"
            style={{ minHeight: 0 }}
          >
            <NarrativesFilmPlayer />
            <VideoControls
              isPlaying={isPlaying}
              currentIndex={currentIndex}
              onStart={handleStart}
            />
          </Flex>
        </Flex>
        <NarrativesBioSidePanel />
      </div>
    )
  );
};
