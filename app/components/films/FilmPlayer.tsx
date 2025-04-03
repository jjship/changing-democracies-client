import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@radix-ui/themes";
import { useFilmsContext } from "./FilmsContext";
import useFilmAdaptiveQuality from "./useFilmAdaptiveQuality";
import { getHlsPlaylistUrl, getMp4Url } from "./videoUtils";
import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Play, Pause, X } from "lucide-react";
import useFreeBrowsingSubtitles from "./useFreeBrowsingSubtitles";
import FilmBioSidePanel from "./FilmBioSidePanel";
import { useParams } from "next/navigation";

export const FilmPlayer: FC = () => {
  const {
    nowPlaying,
    fragments,
    setShowSidePanel,
    showSidePanel,
    setNowPlaying,
  } = useFilmsContext();
  const params = useParams();
  const languageCode =
    typeof params.lang === "string"
      ? params.lang.toLowerCase().substring(0, 2)
      : "en";

  // References and state
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  const [isUsingHLS, setIsUsingHLS] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [showControls, setShowControls] = useState(false);

  // Find the current fragment by its ID
  const currentFragment = fragments?.find(
    (fragment) => fragment.id === nowPlaying,
  );

  // UseAdaptiveQuality hook
  const { currentQuality, videoRef } = useFilmAdaptiveQuality({});

  // Subtitles hook
  const {
    subtitles,
    isLoading: subtitlesLoading,
    error: subtitlesError,
  } = useFreeBrowsingSubtitles(currentFragment, languageCode);

  // Effect for video initialization
  useEffect(() => {
    if (!currentFragment || !nowPlaying) return;

    const video = videoRef.current;
    if (!video) return;

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
        const hlsPlaylistUrl = getHlsPlaylistUrl(nowPlaying);

        if (Hls.isSupported()) {
          // HLS.js supported
          const newHls = new Hls({
            maxMaxBufferLength: 30,
            maxBufferSize: 10 * 1000 * 1000,
            debug: false,
          });

          newHls.loadSource(hlsPlaylistUrl);
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
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari native HLS support
          video.src = hlsPlaylistUrl;
          setIsUsingHLS(true);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        } else {
          // Fallback to MP4
          console.log("Falling back to MP4 playback");
          const mp4Url = getMp4Url(nowPlaying, currentQuality);
          video.src = mp4Url;
          setIsUsingHLS(false);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        }

        if (!isMounted) return;
        setIsLoading(false);
        setIsPaused(true); // Start in paused state
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
  }, [nowPlaying, currentFragment, currentQuality]);

  // Effect to pause video when side panel is shown
  useEffect(() => {
    setIsPaused(showSidePanel);
  }, [showSidePanel]);

  // Handle play/pause toggling
  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  // Effect to play/pause video based on isPaused state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPaused && video.paused) video.play();
    if (isPaused && !video.paused) video.pause();
  }, [isPaused]);

  // Effect to handle subtitles
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
  }, [subtitles]);

  // Handle mouse movement for showing controls
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout((window as any).controlsTimeout);
    (window as any).controlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds of inactivity
  };

  useEffect(() => {
    // Clear timeout when component unmounts
    return () => {
      clearTimeout((window as any).controlsTimeout);
    };
  }, []);

  if (!nowPlaying || !currentFragment) return null;

  return (
    <div
      id="player-container"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black_bg"
    >
      <FilmBioSidePanel />

      <div
        ref={containerRef}
        className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center justify-center px-4"
      >
        {/* Video container with proper aspect ratio */}
        <div
          ref={videoContainerRef}
          className="group/video relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "90vh" }}
        >
          {/* Actual video content - this will center within the container */}
          <div className="relative h-full w-full" onMouseMove={handleMouseMove}>
            {/* Close Button - positioned relative to video content */}
            <button
              onClick={() => {
                setNowPlaying(null);
                setShowSidePanel(false);
              }}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 hover:text-yellow_secondary"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Person/Country Info Box - positioned relative to video content */}
            <Box
              onClick={() => {
                setShowSidePanel(true);
              }}
              className="absolute left-4 top-4 z-20 border-[3px] border-turquoise p-4 text-turquoise hover:cursor-pointer hover:bg-[#00000080]"
            >
              <p>{`${currentFragment.person?.name || ""},`}</p>
              <p>{`${currentFragment.person?.country?.name || ""}`}</p>
            </Box>

            {/* Video Element */}
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
                setIsLoading(false);
              }}
              onClick={handlePlayPause} // Enable click to play/pause
            />

            {/* Play/Pause Button - now shows based on state instead of hover */}
            <Button
              onClick={handlePlayPause}
              size="icon"
              variant="secondary"
              className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                showControls || isPaused ? "opacity-100" : "opacity-0"
              }`}
            >
              {isPaused ? (
                <Play className="h-6 w-6" />
              ) : (
                <Pause className="h-6 w-6" />
              )}
            </Button>

            {/* Center control area - smaller hover target */}
            <div
              className="absolute left-1/3 top-1/3 z-10 h-1/3 w-1/3 cursor-pointer"
              onClick={handlePlayPause}
            ></div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white">Loading...</div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-red-500">{error}</div>
              </div>
            )}

            {/* Subtitles */}
            {!subtitlesLoading && currentSubtitle && (
              <div className="absolute bottom-8 left-1/2 w-full max-w-4xl -translate-x-1/2 rounded-md bg-black/60 p-4 text-center font-bold text-white">
                {currentSubtitle}
              </div>
            )}

            {/* Subtitle Error */}
            {subtitlesError && (
              <div className="absolute bottom-16 left-1/2 w-full max-w-xl -translate-x-1/2 rounded bg-red-500/80 p-4 text-center text-white">
                {subtitlesError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
