"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoSource } from "@/types/scrollDocumentary";
import VideoPlayer from "./VideoPlayer";
import ErrorBoundary from "@/components/ErrorBoundary";
import VideoPlayerFallback from "./VideoPlayerFallback";
import { VideoSourceError } from "./videoSource";
import { PageTheme, Speaker } from "./slides/slides";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface VideoSectionProps {
  videoSource: VideoSource;
  onVideoEnd?: () => void;
  additionalContent?: React.ReactNode;
  isActive: boolean;
  shouldPlay: boolean;
  onReady?: () => void;
  selectedLanguageCode?: string;
  pageTheme: PageTheme;
  speakers: Speaker[];
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
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

    const shouldBePlayingNow =
      shouldPlay && isActive && inView && !isManuallyPaused;

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
  }, [shouldPlay, isActive, inView, isManuallyPaused]);

  const handleVideoEnd = () => {
    if (isActive) {
      // Only trigger scroll if this section is active
      onVideoEnd?.();
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setIsManuallyPaused(true);
    } else {
      video.play().catch(console.error);
      setIsPlaying(true);
      setIsManuallyPaused(false);
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
    <div
      ref={sectionRef}
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ErrorBoundary
        fallback={({ error, retry }) => (
          <VideoPlayerFallback error={error} onRetry={retry} />
        )}
      >
        <VideoPlayer
          ref={videoRef}
          videoSource={videoSource}
          onEnded={handleVideoEnd}
          isPlaying={isPlaying}
          className="h-full w-full object-contain"
          selectedLanguageCode={selectedLanguageCode}
          pageTheme={pageTheme}
          speakers={speakers}
        />

        {isActive && additionalContent && (
          <div className="absolute inset-0 ">{additionalContent}</div>
        )}

        {isHovering && (
          <Button
            onClick={togglePlayPause}
            size="icon"
            variant="ghost"
            className={`absolute right-4 top-6 z-20 rounded-none transition-opacity duration-200 hover:scale-110 ${
              pageTheme.pageBg === "bg-pink_scroll"
                ? "bg-yellow_secondary bg-opacity-70 hover:bg-yellow_secondary/90"
                : pageTheme.pageBg === "bg-black_bg"
                ? "bg-darkRed bg-opacity-70 hover:bg-darkRed/90"
                : "bg-yellow_secondary bg-opacity-70 hover:bg-yellow_secondary/90"
            }`}
          >
            {isPlaying ? (
              <Pause className={`h-6 w-6 ${pageTheme.subtitleColor}`} />
            ) : (
              <Play className={`h-6 w-6 ${pageTheme.subtitleColor}`} />
            )}
          </Button>
        )}
      </ErrorBoundary>
    </div>
  );
}
