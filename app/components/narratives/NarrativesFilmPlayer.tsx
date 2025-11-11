"use client";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import useAdaptiveQuality from "../scrollDocumentary/useAdaptiveQuality";
import { getOptimalQuality } from "../scrollDocumentary/videoSource";
import { useSubtitles } from "@/utils/subtitles/api";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { VideoOverlay } from "./VideoOverlay";
import { VideoPlayPauseButton } from "./VideoPlayPauseButton";
import { useVideoBounds } from "./hooks/useVideoBounds";

const NarrativesFilmPlayer: FC = () => {
  const {
    currentPath,
    currentIndex,
    isPlaying,
    setIsPlaying,
    setCurrentIndex,
    setCurrentPath,
    showSidePanel,
    setShowSidePanel,
    selectedLanguage,
  } = useNarrativesContext();
  const nowPlaying = currentPath?.fragments[currentIndex];

  const currentCountryName = useMemo(() => {
    const currentFragment = currentPath?.fragments[currentIndex];
    if (!currentFragment) return null;

    return (
      currentFragment.country.names.find(
        (name) => name.languageCode === selectedLanguage,
      )?.name ??
      currentFragment.country.names.find((name) => name.languageCode === "EN")
        ?.name
    );
  }, [currentPath, currentIndex, selectedLanguage]);

  // Initialize with all qualities, then filter based on HLS support
  const { currentQuality, videoRef } = useAdaptiveQuality({
    initialQuality: getOptimalQuality(nowPlaying?.availableQualities ?? []),
    qualities: nowPlaying?.availableQualities ?? [],
  });

  const { isPaused, isLoading, error, handlePlayPause, isUsingHLS } =
    useVideoPlayer({
      videoSource: nowPlaying,
      videoRef,
      currentQuality,
      isPlaying,
      showSidePanel,
    });

  const videoBounds = useVideoBounds(videoRef);

  if (!nowPlaying) throw new Error("No now playing fragment");

  // Extract the language code for the selected language
  const langCode =
    (selectedLanguage &&
      nowPlaying.availableLanguageCodes?.[selectedLanguage]) ??
    "en";

  // Use the subtitles hook
  const {
    subtitles,
    isLoading: subtitlesLoading,
    error: subtitlesError,
  } = useSubtitles({
    fragmentId: nowPlaying ? nowPlaying.videoId : undefined,
    languageCode: langCode,
  });

  // Handle video end
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

  // Effect to handle video ended event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => onEnded();
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onEnded, videoRef]);

  // Keyboard controls
  useEffect(() => {
    if (!currentPath) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard events if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsPlaying(true);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (currentIndex < currentPath.fragments.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
          }
          break;
        case " ":
          e.preventDefault();
          handlePlayPause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentPath,
    currentIndex,
    setCurrentIndex,
    setIsPlaying,
    handlePlayPause,
  ]);

  return (
    nowPlaying && (
      <div
        className="group/video relative h-full w-full max-w-full"
        style={{ aspectRatio: "16/9" }}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <video
            autoPlay={isPlaying}
            ref={videoRef}
            className="relative z-0 h-full w-full object-contain"
            playsInline
            crossOrigin="anonymous"
            onError={(e) => {
              const video = e.currentTarget;
              console.error("Video error:", video.error);
            }}
          />
          {videoBounds && (
            <div
              className="pointer-events-none absolute"
              style={{
                width: `${videoBounds.width}px`,
                height: `${videoBounds.height}px`,
                left: `${videoBounds.left}px`,
                top: `${videoBounds.top}px`,
              }}
            >
              <Box
                onClick={() => {
                  setShowSidePanel(true);
                }}
                className={
                  "w-18 pointer-events-auto absolute left-2 top-2 z-30 border-[3px] border-turquoise p-2 text-turquoise hover:cursor-pointer hover:bg-[#00000080] sm:left-4 sm:top-4 sm:p-3 md:left-8 md:top-8 md:p-4 lg:left-12 lg:top-12"
                }
              >
                <p>{`${nowPlaying.person},`}</p>
                <p>{`${currentCountryName}`}</p>
              </Box>

              <VideoPlayPauseButton
                isPaused={isPaused}
                isPlaying={isPlaying}
                onToggle={handlePlayPause}
              />

              <VideoOverlay
                videoRef={videoRef}
                isLoading={isLoading}
                error={error}
                subtitles={subtitles}
                subtitlesLoading={subtitlesLoading}
                subtitlesError={subtitlesError}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export { NarrativesFilmPlayer };
