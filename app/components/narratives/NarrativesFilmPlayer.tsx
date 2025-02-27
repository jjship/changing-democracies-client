"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";
import Hls from "hls.js";
import { VideoQuality, VideoSource } from "@/types/scrollDocumentary";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import useSubtitles, { Subtitle } from "@/app/scroll-documentary/useSubtitles";
import { getSubtitlesUrl } from "@/utils/i18n/languages";
import useAdaptiveQuality from "../../scroll-documentary/useAdaptiveQuality";
import { getOptimalQuality } from "../../scroll-documentary/videoSource";

const NarrativesFilmPlayer: FC = () => {
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
  const [hls, setHls] = useState<Hls | null>(null);
  const [isUsingHLS, setIsUsingHLS] = useState(false);
  const [isPaused, setIsPaused] = useState(!isPlaying);
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
    if (!nowPlaying || !isPlaying) return;

    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);

    // Clean up previous HLS instance if exists
    if (hls) {
      hls.destroy();
      setHls(null);
    }

    try {
      if (Hls.isSupported() && nowPlaying.hlsPlaylistUrl) {
        const newHls = new Hls({
          maxMaxBufferLength: 30,
          maxBufferSize: 10 * 1000 * 1000, // 10MB
          debug: false, // Set to false to reduce logs
        });

        newHls.loadSource(nowPlaying.hlsPlaylistUrl);
        newHls.attachMedia(video);
        setHls(newHls);
        setIsUsingHLS(true);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          video
            .play()
            .then(() => {
              setIsPaused(false);
              setIsLoading(false);
            })
            .catch((e) => {
              console.error("Failed to autoplay:", e);
              setIsPaused(true);
              setIsLoading(false);
            });
        });

        newHls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            console.error("HLS fatal error:", data);
            setError(`Video playback error: ${data.type}`);
            setIsLoading(false);
          }
        });
      } else if (
        video.canPlayType("application/vnd.apple.mpegurl") &&
        nowPlaying.hlsPlaylistUrl
      ) {
        // For Safari - native HLS support
        video.src = nowPlaying.hlsPlaylistUrl;
        setIsUsingHLS(true);
        video
          .play()
          .then(() => {
            setIsPaused(false);
            setIsLoading(false);
          })
          .catch((e) => {
            console.error("Failed to autoplay:", e);
            setIsPaused(true);
            setIsLoading(false);
          });
      } else {
        // Fallback to MP4
        console.log("Falling back to MP4 playback");
        const mp4Url = `https://${nowPlaying.pullZoneUrl}.b-cdn.net/${nowPlaying.videoId}/play_720p.mp4`;

        video.src = mp4Url;
        setIsUsingHLS(false);

        video
          .play()
          .then(() => {
            setIsPaused(false);
            setIsLoading(false);
          })
          .catch((e) => {
            console.error("Failed to autoplay:", e);
            setIsPaused(true);
            setIsLoading(false);
          });
      }
    } catch (e) {
      console.error("Video setup error:", e);
      setError(
        `Failed to setup video: ${
          e instanceof Error ? e.message : "Unknown error"
        }`,
      );
      setIsLoading(false);
    }

    return () => {
      console.log("Cleaning up video player");
      if (hls) {
        hls.destroy();
      }
      video.pause();
      video.src = "";
      video.load();
    };
  }, [nowPlaying, isPlaying]);

  // Handle play/pause toggling
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  // Effect to sync pause state with video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePause = () => setIsPaused(true);
    const handlePlay = () => setIsPaused(false);

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

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

  // Effect to update subtitles display
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end,
      );
      setCurrentSubtitle(currentSub?.text || "");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [subtitles, selectedLanguage, langCode, videoRef, isPlaying]);

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
              <p>{`${nowPlaying.person},`}</p>
              <p>{`${nowPlaying.country}`}</p>
            </Box>
            <div className="group/video absolute bottom-0 left-0 right-0 top-0 h-full w-full">
              <video
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
                  console.log("Video loaded");
                  setIsLoading(false);
                }}
              />

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
        ) : (
          <Image
            src={nowPlaying.thumbnailUrl || ""}
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
