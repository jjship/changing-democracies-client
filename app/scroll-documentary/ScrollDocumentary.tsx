"use client";

import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import VideoSection from "./VideoSection";
import ErrorBoundary from "./VideoErrorBoundary";
import { Navigation } from "@/components/navigation/Navigation";
import { themeMapping, SlideWithSource, PageTheme } from "./slides/slides";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

interface ScrollDocumentaryClientProps {
  slidesWithSources: SlideWithSource[];
  initialLanguageLabel: string;
  availableLanguageCodes: { [key: string]: string };
}

export default function ScrollDocumentaryClient({
  slidesWithSources,
  initialLanguageLabel,
  availableLanguageCodes,
}: ScrollDocumentaryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSections, setLoadedSections] = useState<number[]>([0]);
  const [isFirstVideoReady, setIsFirstVideoReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const activeSlide = slidesWithSources[activeIndex];
  const pageTheme = activeSlide
    ? themeMapping[activeSlide.colorTheme]
    : themeMapping.black;

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
          if (nextIndex < slidesWithSources.length) {
            return [
              ...prev,
              nextIndex,
              Math.min(nextIndex + 1, slidesWithSources.length - 1),
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
      // Delay to ensure DOM children are rendered before scrolling.
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
    if (nextIndex < slidesWithSources.length) {
      scrollToSection(nextIndex);
    }
  };

  const ScrollNavigation = (pageTheme: PageTheme) => (
    <div className="fixed right-1 top-1/2 z-50 mr-3 flex -translate-y-1/2 flex-col gap-6 md:px-10">
      {slidesWithSources.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`h-5 w-5 rounded-full border-4 transition-all duration-300 
            ${
              index === activeIndex
                ? "border-4 border-green_accent"
                : `${pageTheme.scrollDotsBorder} ${pageTheme.scrollDotsHover}`
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
      const viewportCenter = viewportHeight / 2;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;

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

    const onScrollEnd = () => {
      const activeSlide = container.children[activeIndex];
      if (activeSlide) {
        activeSlide.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    container.addEventListener("scroll", onScroll);
    container.addEventListener("scrollend", onScrollEnd);
    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", onScrollEnd);
    };
  }, [activeIndex, isStarted]);

  const renderAdditionalContent = (
    slide: (typeof slidesWithSources)[number],
  ) => (
    <>
      {slide.videoTitle && (
        <div className="absolute left-4 top-4 text-white">
          {slide.videoTitle}
        </div>
      )}
      {slide.additionalElements.map((elem, idx) => (
        <div key={idx} className="absolute" style={{ top: "50%", left: "50%" }}>
          {elem.content}
        </div>
      ))}
      {slide.persons.length > 0 && (
        <div className="absolute bottom-4 right-4 text-white">
          {slide.persons.map((p, idx) => (
            <div key={idx}>{p.text}</div>
          ))}
        </div>
      )}
    </>
  );

  return (
    selectedLanguage && (
      <div
        className={`relative ${pageTheme.pageBg} min-h-screen w-full transition-all duration-1000`}
      >
        <Navigation
          bgColor={pageTheme.navBg}
          fontColor={pageTheme.navFont}
          availableLanguages={Object.keys(availableLanguageCodes)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
        {!isStarted ? (
          <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
            <div className="hidden">
              {loadedSections.includes(0) &&
                slidesWithSources[0].videoSource && (
                  <VideoSection
                    key={slidesWithSources[0].videoSource.videoId}
                    videoSource={slidesWithSources[0].videoSource}
                    onVideoEnd={() => {}}
                    isActive={false}
                    shouldPlay={false}
                    onReady={() => setIsFirstVideoReady(true)}
                    selectedLanguageCode={
                      availableLanguageCodes[selectedLanguage]
                    }
                    pageTheme={pageTheme}
                    speakers={[]}
                  />
                )}
            </div>
            {!isFirstVideoReady ? (
              <Skeleton className=" h-20 w-20 bg-yellow_secondary   dark:bg-gray_dark_secondary" />
            ) : (
              <Play
                className="h-20  w-20 cursor-pointer text-yellow_secondary"
                onClick={() => setIsStarted(true)}
              />
            )}
          </div>
        ) : (
          <ErrorBoundary>
            <div
              ref={containerRef}
              className="h-[calc(100vh-64px)] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            >
              {slidesWithSources.map((slide, index) => (
                <div
                  key={slide.videoSource?.videoId ?? index}
                  id={`section-${index}`}
                  className="flex h-[calc(100vh-64px)] snap-center items-center justify-center"
                >
                  <div className="relative mx-auto aspect-video w-[70vw] max-w-[142.22vh] px-4">
                    {loadedSections.includes(index) ? (
                      <VideoSection
                        videoSource={slide.videoSource!}
                        onVideoEnd={() => scrollToNextSection(index)}
                        isActive={index === activeIndex}
                        shouldPlay={isStarted && index === activeIndex}
                        selectedLanguageCode={
                          availableLanguageCodes[selectedLanguage]
                        }
                        additionalContent={renderAdditionalContent(slide)}
                        pageTheme={pageTheme}
                        speakers={slide.speakers}
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
                        <Skeleton className="h-full w-full bg-pink dark:bg-black_bg" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {ScrollNavigation(pageTheme)}
          </ErrorBoundary>
        )}
      </div>
    )
  );
}
