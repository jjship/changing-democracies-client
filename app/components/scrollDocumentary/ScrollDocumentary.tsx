"use client";

import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { VideoSection } from "./VideoSection";
import ErrorBoundary from "@/components/public/ErrorBoundary";
import VideoPlayerFallback from "./VideoPlayerFallback";
import { themeMapping, SlideWithSource } from "./slides/slides";
import { Skeleton } from "@/components/ui/skeleton";
import { Archivo_Narrow } from "next/font/google";
import { NavigationContainer } from "../navigation/NavigationContainer";
import { useTranslation } from "../../[lang]/context/TranslationContext";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

interface ScrollDocumentaryProps {
  slidesWithSources: SlideWithSource[];
}

export function ScrollDocumentary({
  slidesWithSources,
}: ScrollDocumentaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSections, setLoadedSections] = useState<number[]>([0, 1]);
  const { language, dictionary: dict } = useTranslation();
  const pageTheme = themeMapping[slidesWithSources[activeIndex].colorTheme];
  const lastIndex = slidesWithSources.length - 1;

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView) return;
      setLoadedSections((prev) => {
        const nextIndex = Math.max(...prev) + 1;
        return nextIndex > lastIndex
          ? prev
          : [...prev, nextIndex, Math.min(nextIndex + 1, lastIndex)];
      });
    },
  });

  const scrollToSection = (index: number) => {
    if (index > lastIndex) return;
    setLoadedSections((prev) =>
      prev.includes(index) ? prev : [...prev, index],
    );
    containerRef.current?.children[index]?.scrollIntoView({
      behavior: "smooth",
    });
    setActiveIndex(index);
    if (index > 0) setIsStarted(true);
  };

  // Track the section closest to the viewport center
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveIndex = () => {
      const viewportHeight = window.innerHeight;
      const index = Array.from(container.children).findIndex((child) => {
        const rect = child.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - viewportHeight / 2;
        return Math.abs(offset) < viewportHeight * 0.3;
      });
      if (index === -1) return;
      setActiveIndex(index);
      if (index > 0) setIsStarted(true);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveIndex();
        ticking = false;
      });
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScrollEnd = () =>
      container.children[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

    container.addEventListener("scrollend", onScrollEnd);
    return () => container.removeEventListener("scrollend", onScrollEnd);
  }, [activeIndex]);

  const renderAdditionalContent = (slide: SlideWithSource) => (
    <>
      {slide.hasTitle && (
        <div className="absolute left-8 top-8 flex items-center justify-center mobile:left-2 mobile:top-2">
          <h1
            className={`${archivoNarrow.className} bg-black_bg bg-opacity-70 px-2 py-1 text-left text-2xl font-bold text-yellow_secondary mobile:text-sm`}
          >
            {dict.scrollDocumentary.slides[slide.id].title}
          </h1>
        </div>
      )}
      {slide.overlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          {slide.overlay}
        </div>
      )}
    </>
  );

  return (
    <div
      className={`relative ${pageTheme.pageBg} min-h-screen w-full transition-all duration-1000`}
    >
      <NavigationContainer
        bgColor={pageTheme.navBg}
        fontColor={pageTheme.navFont}
      />
      <ErrorBoundary
        fallback={({ error, retry }) => (
          <VideoPlayerFallback error={error} onRetry={retry} />
        )}
      >
        <div
          ref={containerRef}
          className="h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth mobile:h-[100dvh]"
        >
          {slidesWithSources.map((slide, index) => (
            <div
              key={slide.id}
              className="flex h-screen snap-center items-center justify-center px-1 pb-10 pt-16 sm:px-2 mobile:h-[100dvh] mobile:px-0"
            >
              <div
                className={`relative flex aspect-video h-[calc(100vh-120px)] w-auto max-w-[90vw] items-center justify-center tall:max-h-[1076px] mobile:max-w-none ${
                  slide.videoSource
                    ? "mobile:h-auto mobile:w-[min(100vw,calc((100dvh-7.5rem)*16/9))]"
                    : "mobile:aspect-auto mobile:h-[calc(100dvh-7.5rem)] mobile:w-full mobile:landscape:w-[92vw]"
                } ${index === 0 ? "cursor-pointer" : ""}`}
                onClick={index === 0 ? () => scrollToSection(1) : undefined}
              >
                {loadedSections.includes(index) ? (
                  slide.videoSource ? (
                    <VideoSection
                      videoSource={slide.videoSource}
                      onVideoEnd={() => scrollToSection(index + 1)}
                      isActive={isStarted ? index === activeIndex : index === 0}
                      shouldPlay={isStarted && index === activeIndex}
                      selectedLanguageCode={language}
                      additionalContent={renderAdditionalContent(slide)}
                      pageTheme={pageTheme}
                      speakers={slide.speakers}
                    />
                  ) : (
                    <div className="relative aspect-video h-[calc(100vh-120px)] max-w-[90vw] tall:max-h-[1076px] mobile:aspect-auto mobile:h-full mobile:w-full mobile:max-w-none">
                      {renderAdditionalContent(slide)}
                    </div>
                  )
                ) : (
                  <div
                    className="h-full w-full"
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
        <div className="fixed right-1 top-1/2 z-50 mr-1 flex max-h-[80vh] -translate-y-1/2 flex-col gap-6 mobile:landscape:gap-2">
          {slidesWithSources.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => scrollToSection(index)}
              style={{ height: "1vh", width: "1vh" }}
              className={`rounded-full border-4 transition-all duration-300 ${
                index === activeIndex
                  ? "border-green_accent"
                  : `${pageTheme.scrollDotsBorder} ${pageTheme.scrollDotsHover}`
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </ErrorBoundary>
    </div>
  );
}
