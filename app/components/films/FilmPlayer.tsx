import { FC } from "react";
import CloseButton from "../../components/films/CloseButton";
import { useFilmsContext } from "./FilmsContext";

export const FilmPlayer: FC = () => {
  const { nowPlaying } = useFilmsContext();

  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;

  return (
    nowPlaying && (
      <div
        id="player-container"
        className="absolute left-0 top-0 z-50 h-full w-full bg-black_bg"
      >
        {/* <div className="absolute flex min-h-screen w-full flex-col items-center bg-black"> */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <CloseButton />
          <iframe
            src={src}
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          ></iframe>
        </div>
      </div>
    )
  );
};
