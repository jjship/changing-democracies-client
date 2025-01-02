"use client";

import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { useNarrationContext } from "../../narratives/NarrationsContext";
import NarrationsCloseButton from "../narrations/NarrationsCloseButton";

const NarrationsFilmPlayer: FC = () => {
  const { currentPath, currentIndex, setIsEnded, setIsPlaying, setIsVisible } =
    useNarrationContext();
  const nowPlaying = currentPath?.fragments[currentIndex] ?? null;
  const onEnded = useCallback(() => {
    setIsEnded(true);
    setIsPlaying(false);
  }, [setIsEnded, setIsPlaying]);
  const onClose = useCallback(() => {
    setIsVisible(false);
    setIsPlaying(false);
    setIsEnded(false);
  }, [setIsVisible, setIsPlaying, setIsEnded]);

  const src = nowPlaying
    ? `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying.guid}?autoplay=true&captions=EN`
    : "";
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    onClose();
    exitFullscreen();
  };

  useEffect(() => {
    if (!isClient || !iframeRef.current || !onEnded) return;

    import("player.js").then(({ Player }) => {
      if (iframeRef.current) {
        const player = new Player(iframeRef.current);
        player.on("ready", () => {
          player.on("ended", () => {
            console.log("FilmPlayer: Video ended, calling onEnded");
            onEnded();
            exitFullscreen();
          });
        });
      }
    });
  }, [isClient, iframeRef, onEnded]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  return (
    <div
      id="player-container"
      className="flex h-full w-full items-center justify-center bg-black_bg"
    >
      <NarrationsCloseButton onClose={handleClose} />
      <iframe
        ref={src}
        src={`${src}&autoplay=true&letterbox=false`}
        className="h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      />
    </div>
  );

  // return (
  //   nowPlaying && (
  //     <div
  //       id="player-container"
  //       className="absolute left-0 top-0 z-50 h-full w-full bg-black_bg"
  //     >
  //       <NarrationsCloseButton onClose={} />
  //       <iframe
  //         src={src}
  //         className="absolute left-0 top-0 h-full w-full"
  //         allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  //       ></iframe>
  //     </div>
  //   )
  // );
};

export { NarrationsFilmPlayer };
