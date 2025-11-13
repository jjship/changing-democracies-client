import { FC } from "react";
import { useFilmsContext } from "@/components/films/FilmsContext";
import { UnifiedVideoPlayer } from "@/components/shared/UnifiedVideoPlayer";

export const StoriesFilmPlayer: FC = () => {
  const {
    nowPlaying,
    fragments,
    setShowSidePanel,
    showSidePanel,
    setNowPlaying,
  } = useFilmsContext();

  const currentFragment = fragments?.find(
    (fragment) => fragment.id === nowPlaying,
  );

  if (!nowPlaying || !currentFragment) return null;

  return (
    <div
      id="player-container"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black_bg"
    >
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center justify-center px-4">
        <div
          className="group/video relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "90vh" }}
        >
          <UnifiedVideoPlayer
            videoSource={currentFragment}
            personName={currentFragment.person?.name}
            countryName={currentFragment.person?.country?.name}
            languageCode="en"
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
      </div>
    </div>
  );
};
