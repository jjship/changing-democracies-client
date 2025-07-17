import { FC } from "react";
import CloseButton from "@/components/films/CloseButton";
import { useFilmsContext } from "@/components/films/FilmsContext";

export const StoriesFilmPlayer: FC = () => {
  const { nowPlaying } = useFilmsContext();

  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN&muted=false`;

  return (
    nowPlaying && (
      <div
        id="player-container"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      >
        <CloseButton />
        <div className="flex w-full justify-center">
          <iframe
            src={src}
            className="aspect-video w-full  bg-black"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          ></iframe>
        </div>
      </div>
    )
  );
};
