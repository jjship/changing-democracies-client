"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoSource } from "@/types/scrollDocumentary";
import { VideoPlayer } from "./VideoPlayer";
import ErrorBoundary from "@/components/public/ErrorBoundary";
import VideoPlayerFallback from "./VideoPlayerFallback";
import { PageTheme, Speaker } from "./slides/slides";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface VideoSectionProps {
  videoSource: VideoSource;
  onVideoEnd: () => void;
  additionalContent: ReactNode;
  isActive: boolean;
  shouldPlay: boolean;
  selectedLanguageCode: string;
  pageTheme: PageTheme;
  speakers: Speaker[];
}

export function VideoSection({
  videoSource,
  onVideoEnd,
  additionalContent,
  isActive,
  shouldPlay,
  selectedLanguageCode,
  pageTheme,
  speakers,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.7,
    rootMargin: "-10% 0px",
  });

  const isPlaying = shouldPlay && isActive && inView && !isManuallyPaused;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.muted = false;
      video.play().catch((err) => {
        if (err.name === "NotAllowedError") {
          video.muted = true;
          video.play().catch(console.error);
        } else {
          console.error("Playback error:", err);
        }
      });
    } else {
      video.pause();
      if (!isActive) {
        video.currentTime = 0;
      }
    }

    return () => video.pause();
  }, [isPlaying, isActive]);

  const PlayPauseIcon = isPlaying ? Pause : Play;

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
          videoRef={videoRef}
          videoSource={videoSource}
          onEnded={() => isActive && onVideoEnd()}
          isPlaying={isPlaying}
          selectedLanguageCode={selectedLanguageCode}
          pageTheme={pageTheme}
          speakers={speakers}
        />

        {isActive && (
          <div className="absolute inset-0 ">{additionalContent}</div>
        )}

        {isHovering && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsManuallyPaused(isPlaying);
            }}
            size="icon"
            variant="ghost"
            className={`absolute right-4 top-6 z-20 rounded-none transition-opacity duration-200 hover:scale-110 ${pageTheme.subtitleBg} ${pageTheme.playButtonHover}`}
          >
            <PlayPauseIcon className={`h-6 w-6 ${pageTheme.subtitleColor}`} />
          </Button>
        )}
      </ErrorBoundary>
    </div>
  );
}
