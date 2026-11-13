"use client";
import { FC } from "react";
import { getLocalizedField } from "@/utils/i18n/getLocalizedField";
import { NarrativesFilmPlayer } from "@/components/narratives/NarrativesFilmPlayer";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrativesBioSidePanel } from "@/components/narratives/NarrativesBioSidePanel";
import { useNarrativeNavigation } from "./utils/narrativeNavigation";

const SkipIcon: FC<{ direction: "prev" | "next" }> = ({ direction }) => (
  <svg
    viewBox="0 0 64 80"
    className={`h-full w-full ${direction === "next" ? "-scale-x-100" : ""}`}
    aria-hidden
  >
    <rect x="0" y="2" width="8" height="76" rx="4" fill="currentColor" />
    <polygon points="6,40 64,6 64,74" fill="currentColor" />
  </svg>
);

export const NarrativesViewMobile: FC = () => {
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

  if (!currentPath) return null;

  const fragment = currentPath.fragments[currentIndex];
  const lastIndex = currentPath.fragments.length - 1;
  const countryName = fragment
    ? getLocalizedField(fragment.country.names, selectedLanguage, "name")
    : undefined;

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

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

  const skipButtonClass =
    "h-20 w-16 text-purple_mains transition-opacity disabled:opacity-30 landscape:h-16 landscape:w-14";

  return (
    <div className="flex h-full w-full flex-col landscape:flex-row">
      <div className="flex min-h-0 flex-col pt-[6vh] landscape:h-full landscape:w-[63%] landscape:pt-0">
        <h1 className="mx-9 flex min-h-[2.75rem] flex-shrink-0 items-center justify-center rounded-t-md bg-purple_mains px-3 py-2 text-center text-[0.7rem] font-bold lowercase leading-tight text-white landscape:ml-auto landscape:mr-0 landscape:min-h-[2rem] landscape:w-[56%] landscape:py-1">
          {getLocalizedField(currentPath.titles, selectedLanguage, "title") ??
            "Narrative"}
        </h1>
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden landscape:aspect-auto landscape:min-h-0 landscape:flex-1">
          <NarrativesFilmPlayer />
          {!isPlaying && currentIndex === 0 && (
            <button
              onClick={handleStart}
              className="absolute z-[60] flex items-center"
            >
              <span className="rounded-full bg-red_mains py-2 pl-7 pr-10 text-lg font-bold text-white">
                Start
              </span>
              <span
                className="-ml-7 h-16 w-12 bg-purple_mains"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
              />
            </button>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-9 pb-[5vh] pt-7 landscape:px-10 landscape:pb-4 landscape:pt-2">
        <button
          onClick={() => setShowSidePanel(true)}
          className="self-start border-[3px] border-turquoise px-4 py-3 text-left text-[0.7rem] font-bold leading-tight text-turquoise landscape:py-2"
        >
          {fragment?.person}, {countryName}
        </button>

        <div className="mt-8 flex items-center justify-between landscape:mt-4">
          <button
            aria-label="Previous video"
            disabled={currentIndex === 0}
            onClick={() => goTo(currentIndex - 1)}
            className={skipButtonClass}
          >
            <SkipIcon direction="prev" />
          </button>
          <button
            aria-label="Next video"
            disabled={currentIndex >= lastIndex}
            onClick={() => goTo(currentIndex + 1)}
            className={skipButtonClass}
          >
            <SkipIcon direction="next" />
          </button>
        </div>

        <button
          onClick={handleOverview}
          className="mx-auto mt-auto flex items-center landscape:ml-0"
        >
          <span
            className="h-[4.5rem] w-16 bg-gray_light_secondary landscape:h-14 landscape:w-12"
            style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
          />
          <span className="-ml-px rounded-r-full bg-red_mains py-2.5 pl-4 pr-7 text-lg font-bold text-white landscape:py-1.5">
            overview
          </span>
        </button>
      </div>
      <NarrativesBioSidePanel />
    </div>
  );
};
