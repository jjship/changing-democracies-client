"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import useSubtitles, {
  Subtitle,
} from "@/app/components/scrollDocumentary/useSubtitles";
import { getSubtitlesUrl } from "@/utils/i18n/languages";
import useAdaptiveQuality from "../scrollDocumentary/useAdaptiveQuality";
import { getOptimalQuality } from "../scrollDocumentary/videoSource";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  const [isUsingHLS, setIsUsingHLS] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const nowPlaying = currentPath?.fragments[currentIndex];

  const { currentQuality, videoRef } = useAdaptiveQuality({
    initialQuality: getOptimalQuality(nowPlaying?.availableQualities ?? []),
    qualities: (nowPlaying?.availableQualities ?? []).filter((q) =>
      isUsingHLS ? q.supportsHLS : !q.supportsHLS,
    ),
  });

  useEffect(() => {
    if (isPlaying === isPaused) {
      setIsPaused((prev) => !prev);
    }
  }, [isPlaying]);

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
  } = useSubtitles(nowPlaying, langCode);

  // Effect to initialize video player and HLS if supported
  useEffect(() => {
    if (!nowPlaying) return;

    const video = videoRef.current;
    if (!video) return;

    // Set poster image
    video.poster = nowPlaying.thumbnailUrl || "";

    // Set initial states
    setIsLoading(true);
    setError(null);

    // Flag to track if component is still mounted
    let isMounted = true;

    // Clean up previous HLS instance if exists
    if (hls) {
      hls.destroy();
      setHls(null);
    }

    const initializeVideo = async () => {
      try {
        if (Hls.isSupported() && nowPlaying.hlsPlaylistUrl) {
          // HLS.js supported
          const newHls = new Hls({
            maxMaxBufferLength: 30,
            maxBufferSize: 10 * 1000 * 1000,
            debug: false,
          });

          newHls.loadSource(nowPlaying.hlsPlaylistUrl);
          newHls.attachMedia(video);

          await new Promise((resolve, reject) => {
            newHls.once(Hls.Events.MANIFEST_PARSED, resolve);
            newHls.once(Hls.Events.ERROR, (_, data) => {
              if (data.fatal) reject(new Error(`HLS error: ${data.type}`));
            });
          });

          if (!isMounted) return;
          setHls(newHls);
          setIsUsingHLS(true);
        } else if (
          video.canPlayType("application/vnd.apple.mpegurl") &&
          nowPlaying.hlsPlaylistUrl
        ) {
          // Safari native HLS support
          video.src = nowPlaying.hlsPlaylistUrl;
          setIsUsingHLS(true);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        } else {
          // Fallback to MP4
          console.log("Falling back to MP4 playback");
          const mp4Url = `https://${nowPlaying.pullZoneUrl}.b-cdn.net/${nowPlaying.videoId}/play_play_${currentQuality.height}p.mp4`;
          video.src = mp4Url;
          setIsUsingHLS(false);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        }

        if (!isMounted) return;
        setIsLoading(false);

        // IMPORTANT: Don't automatically play the video
        // Just update the UI state to reflect that the video is paused
        setIsPaused(true);
      } catch (e) {
        console.error("Video setup error:", e);
        if (isMounted) {
          setError(
            `Failed to setup video: ${
              e instanceof Error ? e.message : "Unknown error"
            }`,
          );
          setIsLoading(false);
        }
      }
    };

    initializeVideo();

    // Set up event listeners for play/pause state
    const handlePause = () => {
      if (isMounted) {
        setIsPaused(true);
      }
    };

    const handlePlay = () => {
      if (isMounted) {
        setIsPaused(false);
      }
    };

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      isMounted = false;

      // Remove event listeners
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);

      // Clean up HLS
      if (hls) {
        hls.destroy();
      }

      // Safely stop video
      try {
        video.pause();
        video.src = "";
        video.load();
      } catch (e) {
        console.error("Error during cleanup:", e);
      }
    };
  }, [nowPlaying, currentQuality]); // adding hls and videoRef to the dependency array causes an infinite loop

  // Remove the separate effect that was trying to sync isPlaying with video state

  // Handle play/pause toggling
  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  // Effect to play/pause video based on isPlaying state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPaused && video.paused) video.play();
    if (isPaused && !video.paused) video.pause();
  }, [isPaused, videoRef]);

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
  }, [onEnded, isPlaying, videoRef]);
  const currentSubRef = useRef<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || subtitles.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end,
      );

      const newSubtitleText = currentSub?.text || "";

      // Only update state if subtitle text has changed
      if (newSubtitleText !== currentSubRef.current) {
        currentSubRef.current = newSubtitleText;
        setCurrentSubtitle(newSubtitleText);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [subtitles]); // removing videoRef from the dependency array fixes the infinite loop

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
        <>
          <Box
            onClick={() => {
              setShowSidePanel(true);
            }}
            className={
              "w-18 absolute left-12 top-12 z-20 border-[3px] border-turquoise p-4 text-turquoise hover:cursor-pointer hover:bg-[#00000080]"
            }
          >
            <p>{`${nowPlaying.person},`}</p>
            <p>{`${nowPlaying.country}`}</p>
          </Box>
          <div className="group/video absolute bottom-0 left-0 right-0 top-0 h-full w-full">
            <video
              autoPlay={isPlaying}
              ref={videoRef}
              className="h-full w-full object-contain"
              playsInline
              crossOrigin="anonymous"
              onError={(e) => {
                const video = e.currentTarget;
                console.error("Video error:", video.error);
                setError(
                  `Video error: ${video.error?.message || "Unknown error"}`,
                );
                setIsLoading(false);
              }}
              onLoadedData={() => {
                setIsLoading(false);
              }}
            />

            {isPlaying && (
              <Button
                onClick={handlePlayPause}
                size="icon"
                variant="secondary"
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 hover:scale-110 group-hover/video:opacity-100"
              >
                {isPaused ? (
                  <Play className="h-6 w-6" />
                ) : (
                  <Pause className="h-6 w-6" />
                )}
              </Button>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white">Loading...</div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-red-500">{error}</div>
              </div>
            )}

            {!subtitlesLoading && currentSubtitle && (
              <div className="absolute bottom-8 left-1/2 w-full max-w-4xl -translate-x-1/2 rounded-md bg-black/60 p-4 text-center font-bold text-white">
                {currentSubtitle}
              </div>
            )}

            {subtitlesError && (
              <div className="absolute bottom-16 left-1/2 w-full max-w-xl -translate-x-1/2 rounded bg-red-500/80 p-4 text-center text-white">
                {subtitlesError}
              </div>
            )}
          </div>
        </>
      </div>
    )
  );
};

export { NarrativesFilmPlayer };
