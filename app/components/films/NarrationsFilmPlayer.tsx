"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useNarrationContext } from "../../narratives/NarrationsContext";
import NarrationsCloseButton from "../narrations/NarrationsCloseButton";

const NarrationsFilmPlayer: FC = () => {
  const { currentPath, currentIndex, setIsEnded, setIsPlaying, setIsVisible } =
    useNarrationContext();
  const nowPlaying = currentPath.fragments[currentIndex] ?? null;
  const onEnded = () => {
    setIsEnded(true);
    setIsPlaying(false);
  };
  const onClose = () => {
    setIsVisible(false);
    setIsPlaying(false);
    setIsEnded(false);
  };

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
    // if (iframeRef.current) {
    //   import("player.js").then(({ Player }) => {
    //     if (iframeRef.current) {
    //       const player = new Player(iframeRef.current);
    //       player.on("ready", () => {
    //         player.pause();
    //       });
    //     }
    //   });
    // }
    exitFullscreen();
    onClose();
  };

  useEffect(() => {
    if (!isClient || !iframeRef.current || !onEnded) return;

    // const handleMessage = (event: MessageEvent) => {
    //   if (event.origin !== "https://iframe.mediadelivery.net") return;
    //   if (event.data.event === "videoEnded") {
    //     console.log("FilmPlayer: Video ended, calling onEnded");
    //     onEnded();
    //     exitFullscreen();
    //   }
    // };

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

    // window.addEventListener("message", handleMessage);
    // return () => window.removeEventListener("message", handleMessage);
    // TODO cleanup player
  }, [isClient, onEnded, onClose]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="player-container"
      className="flex h-full w-full items-center justify-center bg-black_bg"
    >
      <NarrationsCloseButton onClose={handleClose} />
      <iframe
        ref={iframeRef}
        src={`${src}&autoplay=true&letterbox=false`}
        className="h-full w-full"
        style={{
          border: "none",
          objectFit: "cover",
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      />
    </div>
  );
};

export { NarrationsFilmPlayer };
