"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoSource } from "@/types/scrollDocumentary";
import VideoPlayer from "./VideoPlayer";
import ErrorBoundary from "@/components/ErrorBoundary";
import VideoPlayerFallback from "./VideoPlayerFallback";
import { VideoSourceError } from "./videoSource";
import { PageTheme, Subtitle } from "./slides/slides";

interface VideoSectionProps {
  videoSource: VideoSource;
  onVideoEnd?: () => void;
  additionalContent?: React.ReactNode;
  isActive: boolean;
  shouldPlay: boolean;
  onReady?: () => void;
  selectedLanguageCode: string;
  pageTheme: PageTheme;
  speakers: Subtitle[];
}

export default function VideoSection({
  videoSource,
  onVideoEnd,
  additionalContent,
  isActive,
  shouldPlay,
  onReady,
  selectedLanguageCode,
  pageTheme,
  speakers,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.7,
    rootMargin: "-10% 0px",
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

    const shouldBePlayingNow = shouldPlay && isActive && inView;

    if (shouldBePlayingNow) {
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
      setIsPlaying(false);
      if (!isActive) {
        video.currentTime = 0;
      }
    }

    return () => {
      video.pause();
      setIsPlaying(false);
    };
  }, [shouldPlay, isActive, inView]);

  const handleVideoEnd = () => {
    if (isActive) {
      // Only trigger scroll if this section is active
      onVideoEnd?.();
    }
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
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <VideoPlayer
            ref={videoRef}
            videoSource={videoSource}
            onEnded={handleVideoEnd}
            isPlaying={isPlaying}
            className="h-full w-full object-cover"
            selectedLanguageCode={selectedLanguageCode}
            pageTheme={pageTheme}
            speakers={speakers}
          />
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              {additionalContent}
            </div>
          )}
        </div>
      </ErrorBoundary>
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
