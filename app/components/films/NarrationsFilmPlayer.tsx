"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNarrationContext } from "../../narratives/NarrationsContext";
import NarrationsCloseButton from "../narrations/NarrationsCloseButton";

const NarrationsFilmPlayer: FC = () => {
  const {
    currentPath,
    currentIndex,
    isPlaying,
    setIsPlaying,
    setCurrentIndex,
  } = useNarrationContext();

  const nowPlaying = currentPath?.fragments[currentIndex] ?? null;
  const onEnded = useCallback(() => {
    if (currentPath && currentIndex < currentPath.fragments.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false);
    } else {
      setCurrentIndex(0);
      setIsPlaying(false);
    }
  }, [currentIndex, currentPath, setCurrentIndex, setIsPlaying]);

  const onClose = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

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
            onEnded();
            exitFullscreen();
          });
        });
      }
    });
  }, [isClient, iframeRef, onEnded, isPlaying]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  return (
    isPlaying && (
      <div
        ref={containerRef}
        className="relative flex h-[100%] w-[95%] items-center justify-center bg-black_bg "
      >
        <iframe
          ref={iframeRef}
          src={`${src}&autoplay=true&letterbox=false`}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media;"
        />
        <NarrationsCloseButton onClose={handleClose} />
      </div>
    )
  );
};

export { NarrationsFilmPlayer };