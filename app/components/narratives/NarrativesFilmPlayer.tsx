"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

const NarrativesFilmPlayer: FC = () => {
  const [src, setSrc] = useState("");
  const {
    currentPath,
    currentIndex,
    isPlaying,
    setIsPlaying,
    setCurrentIndex,
    setCurrentPath,
    setShowSidePanel,
    selectedLanguage,
  } = useNarrativesContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const nowPlaying = currentPath?.fragments[currentIndex] ?? null;

  useEffect(() => {
    setSrc(
      nowPlaying && selectedLanguage
        ? `${nowPlaying.playerUrl}?captions=${selectedLanguage}&autoplay=true&letterbox=false&responsive=true`
        : "",
    );
  }, [nowPlaying, selectedLanguage]);

  const onEnded = useCallback(() => {
    if (currentPath && currentIndex < currentPath.fragments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentPath(null);
    }
    setIsPlaying(false);
  }, [
    currentIndex,
    currentPath,
    setCurrentIndex,
    setCurrentPath,
    setIsPlaying,
  ]);

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (!iframeRef.current || !onEnded) return;

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
  }, [iframeRef, onEnded, isPlaying]);

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

  const country = `${currentPath?.fragments[currentIndex].country}`;
  return (
    nowPlaying && (
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
              onClick={() => {
                setShowSidePanel(true);
                setIsPlaying(false);
              }}
              className={
                "w-18 absolute left-12 top-12 z-20 border-[3px] border-turquoise p-4 text-turquoise hover:cursor-pointer hover:bg-[#00000080]"
              }
            >
              <p>{`${currentPath?.fragments[currentIndex].person},`}</p>
              <p>{country}</p>
            </Box>
            <iframe
              key={`${src}-${selectedLanguage}`} // Add this key prop
              ref={iframeRef}
              src={src}
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
    )
  );
};

export { NarrativesFilmPlayer };
