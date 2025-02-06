import { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

const NarrativesFilmPlayer: FC = () => {
  const {
    currentPath,
    currentIndex,
    isPlaying,
    setIsPlaying,
    setCurrentIndex,
    setSwitchPath,
  } = useNarrativesContext();

  const nowPlaying = currentPath?.fragments[currentIndex] ?? null;
  const src = nowPlaying
    ? `${nowPlaying.playerUrl}?autoplay=true&captions=EN`
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

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
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
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [src]);

  if (!isClient || !nowPlaying) {
    return null;
  }

  const country = `${currentPath?.fragments[currentIndex].country}`;
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        paddingTop: "56%" /* 16:9 Aspect Ratio */,
      }}
    >
      {isPlaying ? (
        <>
          <Box
            className={
              "w-18 absolute left-12 top-12 z-20 border-[3px] border-turquoise p-4 text-turquoise"
            }
          >
            <p>{`${currentPath?.fragments[currentIndex].person},`}</p>
            <p>{country}</p>
          </Box>
          <iframe
            ref={iframeRef}
            src={`${src}&autoplay=true&letterbox=false&responsive=true`}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full border-none"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          />
        </>
      ) : (
        <Image
          src={currentPath?.fragments[currentIndex]?.thumbnailUrl || ""}
          alt="narrative background"
          fill
          priority
        />
      )}
    </div>
  );
};

export { NarrativesFilmPlayer };
