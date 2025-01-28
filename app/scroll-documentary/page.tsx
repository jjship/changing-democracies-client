// app/page.tsx
"use client";

import { useRef } from "react";
import VideoSection from "./VideoSection";
import { VideoSource } from "@/types/scrollDocumentary";

const videoSources: VideoSource[] = [
  {
    videoId: "your-video-id-1",
    pullZoneUrl: "your-pull-zone",
    availableQualities: [
      { height: 360, label: "360p" },
      { height: 480, label: "480p" },
      { height: 720, label: "720p" },
      { height: 1080, label: "1080p" },
    ],
    availableSubtitles: [], // Add appropriate subtitle tracks here
  },
  // Add more video sources as needed
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videoSources.length && containerRef.current) {
      const nextSection = containerRef.current.children[nextIndex];
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      ref={containerRef}
      className="h-screen w-full snap-y snap-mandatory overflow-y-auto"
    >
      {videoSources.map((source, index) => (
        <VideoSection
          key={source.videoId}
          videoId={source.videoId}
          pullZoneUrl={source.pullZoneUrl}
          apiKey={process.env.NEXT_PUBLIC_BUNNY_CDN_API_KEY!}
          onVideoEnd={() => scrollToNextSection(index)}
          additionalContent={
            <div className="absolute left-4 top-4">Section {index + 1}</div>
          }
        />
      ))}
    </main>
  );
}
