import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNarrativesContext } from "../../narratives/NarrativesContext";
import NarrativesCloseButton from "./NarrativesCloseButton";
import Image from "next/image";
import { Box } from "@radix-ui/themes";

const NarrativesFilmPlayer: FC = () => {
  const {
    currentPath,
    currentIndex,
    isPlaying,
    setIsPlaying,
    setCurrentIndex,
    setShowCountDown,
  } = useNarrativesContext();

  const nowPlaying = currentPath?.fragments[currentIndex] ?? null;
  const src = nowPlaying
    ? `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying.guid}?autoplay=true&captions=EN`
    : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onEnded = useCallback(() => {
    if (currentPath && currentIndex < currentPath.fragments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setIsPlaying(false);
  }, [currentIndex, currentPath, setCurrentIndex, setIsPlaying]);

  const onClose = useCallback(() => {
    setIsPlaying(false);
    setShowCountDown(false);
  }, [setIsPlaying, setShowCountDown]);

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const iframeOrigin = new URL(src).origin;
      if (event.origin !== iframeOrigin) return;
      console.log("Message received from iframe:", event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [src]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  const country =
    `${currentPath?.fragments[currentIndex].country[0]}` +
    `${currentPath?.fragments[currentIndex].country.slice(1).toLowerCase()}`;
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "56%" /* 16:9 Aspect Ratio */,
      }}
    >
      {isPlaying ? (
        <>
          <Box
            className={
              "w-18 absolute right-16 top-5 z-20 border-[3px] border-turquoise p-4 text-turquoise"
            }
          >
            <p>{`${currentPath?.fragments[currentIndex].person},`}</p>
            <p>{country}</p>
          </Box>
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            ref={iframeRef}
            src={`${src}&autoplay=true&letterbox=false&responsive=true`}
            className="h-full w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          />
          <NarrativesCloseButton onClose={handleClose} />
        </>
      ) : (
        <Image
          src={
            (currentIndex === 0 && currentPath?.fragments[0]?.thumbnailUrl) ||
            currentPath?.fragments[currentIndex]?.thumbnailUrl ||
            currentPath?.fragments[0]?.thumbnailUrl ||
            ""
          }
          alt="Narration background"
          fill
          priority
        />
      )}
    </div>
  );
};

export { NarrativesFilmPlayer };