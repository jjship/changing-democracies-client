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
  subtitlesUrl: string;
  onVideoEnd?: () => void;
  additionalContent?: React.ReactNode;
}

export default function VideoSection({
  videoSource,
  subtitlesUrl,
  onVideoEnd,
  additionalContent,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [inView]);

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
      className="relative h-screen w-full snap-start overflow-hidden"
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
          className="h-full w-full object-cover"
        />
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
