"use client";

import { useRef } from "react";
import { VideoSource } from "@/types/scrollDocumentary";
import VideoSection from "./VideoSection";
import ErrorBoundary from "./VideoErrorBoundary";

interface ScrollDocumentaryProps {
  videoSources: VideoSource[];
}

export default function ScrollDocumentary({
  videoSources,
}: ScrollDocumentaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videoSources.length && containerRef.current) {
      const nextSection = containerRef.current.children[nextIndex];
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ErrorBoundary>
      <div
        ref={containerRef}
        className="h-screen w-full snap-y snap-mandatory overflow-y-auto"
      >
        {videoSources.map((source, index) => (
          <VideoSection
            key={source.videoId}
            videoSource={source}
            subtitlesUrl={`https://${source.pullZoneUrl}.b-cdn.net/${
              source.videoId
            }/captions/${
              source.availableSubtitles[0]?.languageCode || "en"
            }.vtt`}
            onVideoEnd={() => scrollToNextSection(index)}
            additionalContent={
              <div className="absolute left-4 top-4 text-white">
                {source.title}
              </div>
            }
          />
        ))}
      </div>
    </ErrorBoundary>
  );
}
