import { useEffect, useState } from "react";
import Hls from "hls.js";
import { VideoQuality } from "@/types/scrollDocumentary";

interface VideoSourceLike {
  hlsPlaylistUrl?: string;
  pullZoneUrl?: string;
  videoId?: string;
  availableQualities?: VideoQuality[];
}

interface UseVideoPlayerParams {
  videoSource: VideoSourceLike | undefined;
  videoRef: React.RefObject<HTMLVideoElement>;
  currentQuality: VideoQuality | null;
  isPlaying: boolean;
  showSidePanel: boolean;
}

interface UseVideoPlayerReturn {
  hls: Hls | null;
  isUsingHLS: boolean;
  isPaused: boolean;
  isLoading: boolean;
  error: string | null;
  handlePlayPause: () => void;
}

export const useVideoPlayer = ({
  videoSource,
  videoRef,
  currentQuality,
  isPlaying,
  showSidePanel,
}: UseVideoPlayerParams): UseVideoPlayerReturn => {
  const [hls, setHls] = useState<Hls | null>(null);
  const [isUsingHLS, setIsUsingHLS] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derive isPaused from isPlaying and showSidePanel
  useEffect(() => {
    setIsPaused(!isPlaying || showSidePanel);
  }, [isPlaying, showSidePanel]);

  // Initialize video player and HLS if supported
  useEffect(() => {
    if (!videoSource) return;

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
        if (Hls.isSupported() && videoSource.hlsPlaylistUrl) {
          // HLS.js supported
          const newHls = new Hls({
            maxMaxBufferLength: 30,
            maxBufferSize: 10 * 1000 * 1000,
            debug: false,
          });

          newHls.loadSource(videoSource.hlsPlaylistUrl);
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
          videoSource.hlsPlaylistUrl
        ) {
          // Safari native HLS support
          video.src = videoSource.hlsPlaylistUrl;
          setIsUsingHLS(true);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        } else {
          // Fallback to MP4
          console.log("Falling back to MP4 playback");
          const mp4Url = `https://${videoSource.pullZoneUrl}.b-cdn.net/${videoSource.videoId}/play_play_${currentQuality?.height}p.mp4`;
          video.src = mp4Url;
          setIsUsingHLS(false);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        }

        if (!isMounted) return;
        setIsLoading(false);
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
  }, [videoSource, currentQuality, videoRef]);

  // Effect to play/pause video based on isPaused state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPaused && video.paused) video.play();
    if (isPaused && !video.paused) video.pause();
  }, [isPaused, videoRef]);

  const handlePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  return {
    hls,
    isUsingHLS,
    isPaused,
    isLoading,
    error,
    handlePlayPause,
  };
};

