import { FC } from "react";
import { useFilmsContext } from "./FilmsContext";
import FilmBioSidePanel from "./FilmBioSidePanel";
import { useParams } from "next/navigation";
import { UnifiedVideoPlayer } from "@/components/shared/UnifiedVideoPlayer";

export const FilmPlayer: FC = () => {
  const {
    nowPlaying,
    fragments,
    setShowSidePanel,
    showSidePanel,
    setNowPlaying,
  } = useFilmsContext();

  const params = useParams();
  const languageCode =
    typeof params.lang === "string"
      ? params.lang.toLowerCase().substring(0, 2)
      : "en";

  const currentFragment = fragments.find(
    (fragment) => fragment.id === nowPlaying,
  );

  if (!nowPlaying || !currentFragment) return null;

  return (
    <div
      id="player-container"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black_bg"
    >
      <FilmBioSidePanel />
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center justify-center px-4 mobile:flex-col mobile:px-0 mobile:landscape:flex-row">
        <div
          className="group/video relative w-full overflow-hidden mobile:landscape:w-[70%]"
          style={{ aspectRatio: "16/9", maxHeight: "90vh" }}
        >
          <UnifiedVideoPlayer
            videoSource={currentFragment}
            personName={currentFragment.person?.name}
            countryName={currentFragment.person?.country?.name}
            languageCode={languageCode}
            isPlaying={!showSidePanel}
            showSidePanel={showSidePanel}
            onShowSidePanel={() => setShowSidePanel(true)}
            onClose={() => {
              setNowPlaying(null);
              setShowSidePanel(false);
            }}
            showCloseButton={true}
          />
        </div>
        <div className="hidden w-full px-9 pt-7 mobile:block mobile:landscape:w-[30%] mobile:landscape:px-5 mobile:landscape:pt-0">
          <button
            onClick={() => setShowSidePanel(true)}
            className="border-[3px] border-turquoise px-4 py-3 text-left text-[0.7rem] font-bold leading-tight text-turquoise"
          >
            {currentFragment.person?.name}
            {currentFragment.person?.country?.name
              ? `, ${currentFragment.person.country.name}`
              : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
