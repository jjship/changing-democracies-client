"use client";

import { FC, useEffect } from "react";
import CloseButton from "./CloseButton";
import { useFilmsContext } from "./FilmsContext";

export { NarrationsFilmPlayer };

const NarrationsFilmPlayer: FC<{
  onEnded?: () => void;
  onClose: () => void;
}> = ({ onEnded, onClose }) => {
  const { nowPlaying } = useFilmsContext();
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://iframe.mediadelivery.net") return;
      if (event.data.event === "videoEnded") {
        console.log("FilmPlayer: Video ended, calling onEnded");
        if (onEnded) {
          onEnded();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onEnded]);

  return (
    nowPlaying && (
      <div
        id="player-container"
        className="relative left-0 top-0 h-full w-full bg-black_bg"
        style={{ width: "100%", height: "100%" }}
      >
        <CloseButton onClose={onClose} />
        <iframe
          src={src}
          className="relative left-0 top-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          onEnded={onEnded}
        ></iframe>
      </div>
    )
  );
};
