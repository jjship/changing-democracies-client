import { FC } from "react";
import CloseButton from "../../components/films/CloseButton";
import { useFilmsContext } from "./FilmsContext";

export const FilmPlayer: FC = () => {
  const { nowPlaying, fragments } = useFilmsContext();

  // Find the current fragment by its ID
  const currentFragment = fragments?.find(
    (fragment) => fragment.id === nowPlaying,
  );

  // Use the playerUrl from the fragment, or fall back to the old method if not available
  const src =
    currentFragment?.playerUrl ||
    (nowPlaying
      ? `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`
      : "");

  return (
    nowPlaying && (
      <div
        id="player-container"
        className="absolute left-0 top-0 z-50 h-full w-full bg-black_bg"
      >
        <CloseButton />
        <iframe
          src={src}
          className="absolute left-0 top-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        ></iframe>
      </div>
    )
  );
};
