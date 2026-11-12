import { useEffect, useRef, useState } from "react";
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
  videoRef: React.RefObject<HTMLVideoElement | null>;
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

  // Mirror the latest intended play state into a ref. The init effect below
  // must NOT depend on isPlaying/showSidePanel (that would re-initialize HLS on
  // every play/pause), so it reads the current values from this ref when a new
  // fragment finishes loading.
  const playStateRef = useRef({ isPlaying, showSidePanel });
  useEffect(() => {
    playStateRef.current = { isPlaying, showSidePanel };
  }, [isPlaying, showSidePanel]);

  // The quality only feeds the MP4 fallback URL. It is read through a ref so
  // that a quality change never re-runs the init effect: re-initializing tears
  // the player down and restarts playback from 0. On the normal HLS path the
  // bitrate is chosen by hls.js / the browser, not by this value.
  const qualityRef = useRef(currentQuality);
  useEffect(() => {
    qualityRef.current = currentQuality;
  }, [currentQuality]);

  // Initialize video player and HLS if supported. Keyed on the video's
  // identity rather than the videoSource object, so a parent re-render that
  // hands down an equivalent object does not reload the video.
  const hasSource = videoSource !== undefined;
  const videoId = videoSource?.videoId;
  const hlsPlaylistUrl = videoSource?.hlsPlaylistUrl;
  const pullZoneUrl = videoSource?.pullZoneUrl;

  useEffect(() => {
    if (!hasSource) return;

    const video = videoRef.current;
    if (!video) return;

    // Set initial states
    setIsLoading(true);
    setError(null);

    // Flag to track if component is still mounted
    let isMounted = true;
    // The HLS instance owned by this effect run; destroyed in cleanup.
    let hlsInstance: Hls | null = null;

    const initializeVideo = async () => {
      try {
        if (Hls.isSupported() && hlsPlaylistUrl) {
          // HLS.js supported
          const newHls = new Hls({
            maxMaxBufferLength: 30,
            maxBufferSize: 10 * 1000 * 1000,
            debug: false,
          });
          hlsInstance = newHls;

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
        } else if (
          video.canPlayType("application/vnd.apple.mpegurl") &&
          hlsPlaylistUrl
        ) {
          // Safari native HLS support
          video.src = hlsPlaylistUrl;
          setIsUsingHLS(true);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        } else {
          // Fallback to MP4
          console.log("Falling back to MP4 playback");
          const mp4Url = `https://${pullZoneUrl}.b-cdn.net/${videoId}/play_play_${qualityRef.current?.height}p.mp4`;
          video.src = mp4Url;
          setIsUsingHLS(false);

          await new Promise((resolve) => {
            video.addEventListener("loadeddata", resolve, { once: true });
          });
        }

        if (!isMounted) return;
        setIsLoading(false);
        // Respect the intended play state so a fragment loaded mid-session
        // (seamless auto-advance, arrow-key jump, progress-bar jump) resumes
        // playing instead of pausing.
        setIsPaused(
          !playStateRef.current.isPlaying || playStateRef.current.showSidePanel,
        );
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

      // Clean up the HLS instance created by this run
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      setHls(null);

      // Safely stop video
      try {
        video.pause();
        video.src = "";
        video.load();
      } catch (e) {
        console.error("Error during cleanup:", e);
      }
    };
  }, [hasSource, videoId, hlsPlaylistUrl, pullZoneUrl, videoRef]);

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
