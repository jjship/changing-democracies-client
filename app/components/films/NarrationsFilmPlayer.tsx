import { FC, useEffect, useRef, useState } from "react";
import { Player } from "player.js";
import CloseButton from "./CloseButton";
import { useFilmsContext } from "./FilmsContext";

export const NarrationsFilmPlayer: FC<{
  onEnded?: () => void;
  onClose: () => void;
}> = ({ onEnded, onClose }) => {
  const { nowPlaying } = useFilmsContext();
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
              exitFullscreen();
            });

            player.play();
          });
        }
      });
    }
  }, [isClient, onEnded]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    if (containerRef.current && containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleClose = () => {
    if (iframeRef.current) {
      import("player.js").then(({ Player }) => {
        const player = new Player(iframeRef.current!);
        player.on("ready", () => {
          player.pause();
        });
      });
    }
    exitFullscreen();
    onClose();
  };

  if (!isClient || !nowPlaying) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="player-container"
      className={`fixed left-0 top-0 z-50 h-full w-full bg-black_bg ${
        isFullscreen ? "fullscreen" : ""
      }`}
    >
      <CloseButton onClose={handleClose} />
      <iframe
        ref={iframeRef}
        src={src}
        className="absolute left-0 top-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      ></iframe>
      {!isFullscreen && (
        <button
          onClick={enterFullscreen}
          className="absolute bottom-4 right-4 rounded bg-white px-4 py-2 text-black"
        >
          Enter Fullscreen
        </button>
      )}
    </div>
  );
};
