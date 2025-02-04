"use client";

import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { VideoSource } from "@/types/scrollDocumentary";
import VideoSection from "./VideoSection";
import ErrorBoundary from "./VideoErrorBoundary";
import { Navigation } from "@/components/navigation/Navigation";

interface ScrollDocumentaryClientProps {
  videoSources: VideoSource[];
  initialLanguageLabel: string;
  availableLanguageCodes: { [key: string]: string };
}

export default function ScrollDocumentaryClient({
  videoSources,
  initialLanguageLabel,
  availableLanguageCodes,
}: ScrollDocumentaryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSections, setLoadedSections] = useState<number[]>([0]);
  const [isFirstVideoReady, setIsFirstVideoReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    setLoadedSections([0]);
  }, []);

  useEffect(() => {
    setSelectedLanguage(initialLanguageLabel || null);
  }, [initialLanguageLabel]);

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView) {
        setLoadedSections((prev) => {
          const nextIndex = Math.max(...prev) + 1;
          if (nextIndex < videoSources.length) {
            return [
              ...prev,
              nextIndex,
              Math.min(nextIndex + 1, videoSources.length - 1),
            ];
          }
          return prev;
        });
      }
    },
  });

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      setLoadedSections((prev) =>
        prev.includes(index) ? prev : [...prev, index],
      );

      // Force a small delay to ensure DOM is ready
      setTimeout(() => {
        const section = containerRef.current?.children[index];
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setActiveIndex(index);
        }
      }, 50);
    }
  };

  const scrollToNextSection = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videoSources.length) {
      scrollToSection(nextIndex);
    }
  };

  const ScrollNavigation = () => (
    <div className="fixed right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-6">
      {videoSources.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`h-5 w-5 rounded-full border-2 transition-all duration-300 
            ${
              index === activeIndex
                ? "border-3 border-green_accent"
                : "border-yellow_secondary hover:bg-yellow_secondary"
            }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children);
      const viewportHeight = window.innerHeight;
      const containerTop = container.getBoundingClientRect().top;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        // Check if this section is the most centered one
        if (Math.abs(childCenter - viewportCenter) < viewportHeight * 0.3) {
          if (activeIndex !== index) {
            setActiveIndex(index);
          }
        }
      });
    };

    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll);
    // Initial check
    handleScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [activeIndex]);

  return (
    selectedLanguage && (
      <div className="relative min-h-screen w-full bg-black_bg">
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          availableLanguages={Object.keys(availableLanguageCodes)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {!isStarted ? (
          <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
            {/* Hidden preload section */}
            <div className="hidden">
              {loadedSections.includes(0) && (
                <VideoSection
                  key={videoSources[0].videoId}
                  videoSource={videoSources[0]}
                  onVideoEnd={() => {}}
                  isActive={false}
                  shouldPlay={false}
                  onReady={() => setIsFirstVideoReady(true)}
                  selectedLanguageCode={
                    availableLanguageCodes[selectedLanguage]
                  }
                />
              )}
            </div>
            <button
              onClick={() => setIsStarted(true)}
              className={`rounded-lg bg-yellow_secondary px-8 py-4 text-xl font-bold text-black_bg transition-all
             ${
               isFirstVideoReady
                 ? "hover:bg-yellow_secondary/80"
                 : "cursor-wait opacity-50"
             }`}
              disabled={!isFirstVideoReady}
            >
              {isFirstVideoReady ? "Start Documentary" : "Loading..."}
            </button>
          </div>
        ) : (
          <ErrorBoundary>
            <div
              ref={containerRef}
              className="h-[calc(100vh-64px)] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            >
              {videoSources.map((source, index) => (
                <div
                  key={source.videoId}
                  className="flex h-[calc(100vh-64px)] items-center justify-center bg-black_bg"
                >
                  <div className="relative mx-auto aspect-video max-h-[80vh] w-full max-w-[142.22vh] px-4">
                    {loadedSections.includes(index) ? (
                      <VideoSection
                        videoSource={source}
                        onVideoEnd={() => scrollToNextSection(index)}
                        additionalContent={
                          <div className="absolute left-4 top-4 text-white">
                            {source.title}
                          </div>
                        }
                        isActive={index === activeIndex}
                        shouldPlay={isStarted && index === activeIndex}
                        selectedLanguageCode={
                          availableLanguageCodes[selectedLanguage]
                        }
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        ref={
                          index === Math.max(...loadedSections) + 1
                            ? loadMoreRef
                            : undefined
                        }
                      >
                        <div className="text-yellow_secondary">
                          Loading next section...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <ScrollNavigation />
          </ErrorBoundary>
        )}
      </div>
    )
  );
}
