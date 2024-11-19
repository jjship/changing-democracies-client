"use client";

import { useEffect, useRef, useState } from "react";
import { Player } from "player.js";
import CloseButton from "./CloseButton";
import { useFilmsContext } from "./FilmsContext";

interface NarrationsFilmPlayerProps {
  onEnded?: () => void;
  onClose: () => void;
}

const NarrationsFilmPlayer = ({
  onEnded,
  onClose,
}: NarrationsFilmPlayerProps): JSX.Element => {
  const { nowPlaying } = useFilmsContext();
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && iframeRef.current && onEnded) {
      import("player.js").then(({ Player }) => {
        if (iframeRef.current) {
          const player = new Player(iframeRef.current);

          player.on("ready", () => {
            player.on("ended", () => {
              onEnded();
            });

            player.play();
          });
        }
      });
    }
  }, [isClient, onEnded]);

  const handleClose = () => {
    if (iframeRef.current) {
      import("player.js").then(({ Player }) => {
        const player = new Player(iframeRef.current!);
        player.on("ready", () => {
          player.pause();
        });
      });
    }
    onClose();
  };

  if (!isClient || !nowPlaying) {
    return <></>; // Return empty fragment instead of null
  }

  return (
    <div
      id="player-container"
      className="absolute left-0 top-0 z-50 h-full w-full bg-black_bg"
    >
      <CloseButton onClose={handleClose} />
      <iframe
        ref={iframeRef}
        src={src}
        className="absolute left-0 top-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        onEnded={onEnded}
      ></iframe>
    </div>
  );
};

export default NarrationsFilmPlayer;
