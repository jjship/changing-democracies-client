"use client";

import { FC, useEffect, useRef, useState } from "react";
import CloseButton from "./CloseButton";
import { useFilmsContext } from "./FilmsContext";

const NarrationsFilmPlayer: FC<{
  nowPlaying: string | null;
  onEnded: () => void;
  onClose: () => void;
}> = ({ onEnded, onClose }) => {
  const { nowPlaying } = useFilmsContext();
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Removed enterFullscreen function

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleClose = () => {
    if (iframeRef.current) {
      import("player.js").then(({ Player }) => {
        if (iframeRef.current) {
          const player = new Player(iframeRef.current);
          player.on("ready", () => {
            player.pause();
          });
        }
      });
    }
    exitFullscreen();
    onClose();
  };

  useEffect(() => {
    if (!isClient || !iframeRef.current || !onEnded) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://iframe.mediadelivery.net") return;
      if (event.data.event === "videoEnded") {
        console.log("FilmPlayer: Video ended, calling onEnded");
        onEnded();
        exitFullscreen();
      }
    };

    import("player.js").then(({ Player }) => {
      if (iframeRef.current) {
        const player = new Player(iframeRef.current);
        player.on("ready", () => {
          player.on("ended", () => {
            onEnded();
            exitFullscreen();
          });
          player.play();
        });
      }
    });

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isClient, onEnded]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="player-container"
      className="m-auto h-full w-full bg-black_bg"
    >
      <CloseButton onClose={handleClose} />
      <iframe
        ref={iframeRef}
        src={src}
        className="absolute left-0 top-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      />
    </div>
  );
};

export { NarrationsFilmPlayer };
