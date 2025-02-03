"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoSource } from "@/types/scrollDocumentary";
import VideoPlayer from "./VideoPlayer";
import ErrorBoundary from "@/components/ErrorBoundary";
import VideoPlayerFallback from "./VideoPlayerFallback";
import { VideoSourceError } from "./videoSource";

interface VideoSectionProps {
  videoSource: VideoSource;
  onVideoEnd?: () => void;
  additionalContent?: React.ReactNode;
  isActive: boolean;
  shouldPlay: boolean;
  onReady?: () => void;
  selectedLanguageCode: string;
}

export default function VideoSection({
  videoSource,
  onVideoEnd,
  additionalContent,
  isActive,
  shouldPlay,
  onReady,
  selectedLanguageCode,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      onReady?.();
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [onReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView && shouldPlay) {
      video.muted = false;
      video.play().catch((err) => {
        if (err.name === "NotAllowedError") {
          video.muted = true;
          video.play().catch(console.error);
        } else {
          console.error("Playback error:", err);
        }
      });
      setIsPlaying(true);
    } else {
      video.pause();
      if (!isActive) {
        video.currentTime = 0;
      }
      setIsPlaying(false);
    }

    return () => {
      video.pause();
    };
  }, [inView, shouldPlay, isActive]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      onVideoEnd?.();
    }, 5000);
  };

  if (!videoSource) {
    throw new VideoSourceError(
      "Video source not available",
      500,
      "No video source data",
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full snap-start overflow-hidden"
    >
      <ErrorBoundary
        fallback={({ error, retry }) => (
          <VideoPlayerFallback error={error} onRetry={retry} />
        )}
      >
        <div className="relative h-full w-full">
          <VideoPlayer
            ref={videoRef}
            videoSource={videoSource}
            onEnded={handleVideoEnd}
            isPlaying={isPlaying}
            className="h-full w-full object-cover"
            selectedLanguageCode={selectedLanguageCode}
          />
        </div>
      </ErrorBoundary>
      {additionalContent}
    </section>
  );
}

const VideoLoadingPlaceholder = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black">
    <div className="text-white">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-white 
                    border-t-transparent"
      />
    </div>
  </div>
);
