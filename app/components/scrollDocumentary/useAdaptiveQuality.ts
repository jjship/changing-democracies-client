import { useState, useEffect, useRef } from "react";
import { VideoQuality } from "@/types/scrollDocumentary";

interface AdaptiveQualityOptions {
  initialQuality: VideoQuality;
  qualities: VideoQuality[];
  measurementPeriod?: number; // milliseconds
  downgradeThreshold?: number; // milliseconds
  upgradeThreshold?: number; // milliseconds
}

const useAdaptiveQuality = ({
  initialQuality,
  qualities,
  measurementPeriod = 5000, // Check every 5 seconds
  downgradeThreshold = 1000, // Buffer stall longer than 1 second
  upgradeThreshold = 2000, // Stable playback for 2 seconds
}: AdaptiveQualityOptions) => {
  const [currentQuality, setCurrentQuality] =
    useState<VideoQuality>(initialQuality);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastBufferCheck = useRef<number>(0);
  const stablePlaybackTime = useRef<number>(0);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let checkInterval: NodeJS.Timeout;

    const measurePlaybackQuality = () => {
      if (!video) return;

      const now = Date.now();
      const timeSinceLastCheck = now - lastBufferCheck.current;

      // Check if video is currently buffering
      if (video.readyState < 4) {
        if (timeSinceLastCheck > downgradeThreshold) {
          // Downgrade quality if buffering too long
          const currentIndex = qualities.findIndex(
            (q) => q.height === currentQuality.height,
          );
          if (currentIndex > 0) {
            setCurrentQuality(qualities[currentIndex - 1]);
            stablePlaybackTime.current = 0;
          }
        }
      } else {
        // Video is playing smoothly
        stablePlaybackTime.current += timeSinceLastCheck;

        // Consider upgrading quality after stable playback
        if (stablePlaybackTime.current > upgradeThreshold) {
          const currentIndex = qualities.findIndex(
            (q) => q.height === currentQuality.height,
          );
          if (currentIndex < qualities.length - 1) {
            setCurrentQuality(qualities[currentIndex + 1]);
          }
          stablePlaybackTime.current = 0;
        }
      }

      lastBufferCheck.current = now;
    };

    // Monitor various video events
    const handleStall = () => {
      stablePlaybackTime.current = 0;
    };

    const handleWaiting = () => {
      stablePlaybackTime.current = 0;
    };

    const handlePlaying = () => {
      lastBufferCheck.current = Date.now();
    };

    // Set up monitoring
    checkInterval = setInterval(measurePlaybackQuality, measurementPeriod);

    video.addEventListener("stalled", handleStall);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      clearInterval(checkInterval);
      video.removeEventListener("stalled", handleStall);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [
    qualities,
    currentQuality,
    measurementPeriod,
    downgradeThreshold,
    upgradeThreshold,
  ]);

  return { currentQuality, videoRef };
};

export default useAdaptiveQuality;
