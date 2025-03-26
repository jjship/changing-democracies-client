"use client";

import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import VideoSection from "./VideoSection";
import ErrorBoundary from "./VideoErrorBoundary";
import { themeMapping, SlideWithSource, PageTheme } from "./slides/slides";
import { Skeleton } from "@/components/ui/skeleton";
import { Archivo_Narrow } from "next/font/google";
import { NavigationContainer } from "../navigation/NavigationContainer";
import { useTranslation } from "../../[lang]/context/TranslationContext";
import { CDLanguages } from "../../../utils/i18n/languages";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

interface ScrollDocumentaryClientProps {
  slidesWithSources: SlideWithSource[];
}

export default function ScrollDocumentaryClient({
  slidesWithSources,
}: ScrollDocumentaryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSections, setLoadedSections] = useState<number[]>([0, 1]);
  const { language } = useTranslation();
  const activeSlide = slidesWithSources[activeIndex];
  const pageTheme = activeSlide
    ? themeMapping[activeSlide.colorTheme]
    : themeMapping.black;

  useEffect(() => {
    setLoadedSections([0, 1]);
  }, []);

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
    <div className="fixed right-1 top-1/2 z-50 mr-1 flex max-h-[80vh] -translate-y-1/2 flex-col gap-6">
      {slidesWithSources.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          style={{
            height: "1vh",
            width: "1vh",
          }}
          className={`rounded-full border-4 transition-all duration-300 
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

            // Start the documentary if user scrolls from first slide to another slide
            if (activeIndex === 0 && index > 0 && !isStarted) {
              setIsStarted(true);
            }
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
      {slide.title && (
        <div className="absolute left-8 top-8 flex items-center justify-center">
          <h1
            className={`${archivoNarrow.className} bg-black_bg bg-opacity-70 px-2 py-1 text-left text-2xl font-bold text-yellow_secondary`}
          >
            {slide.title}
          </h1>
        </div>
      )}
      {slide.additionalElements.map((elem, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex items-center justify-center"
        >
          {elem.content}
        </div>
      ))}
    </>
  );

  const startDocumentary = () => {
    setIsStarted(true);
    scrollToNextSection(0);
  };

  return (
    <div
      className={`relative ${pageTheme.pageBg} min-h-screen w-full transition-all duration-1000`}
    >
      <NavigationContainer
        bgColor={pageTheme.navBg}
        fontColor={pageTheme.navFont}
      />
      <ErrorBoundary>
        <div
          ref={containerRef}
          className="h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
        >
          {slidesWithSources.map((slide, index) => (
            <div
              key={slide.videoSource?.videoId ?? index}
              id={`section-${index}`}
              className="flex h-screen snap-center items-center justify-center px-1 pb-10 pt-16 sm:px-2"
            >
              <div
                className={`relative flex aspect-video h-[calc(100vh-120px)] w-auto max-w-[90vw] items-center justify-center tall:max-h-[1076px] ${
                  index === 0 ? "cursor-pointer" : ""
                }`}
                onClick={index === 0 ? startDocumentary : undefined}
              >
                {loadedSections.includes(index) ? (
                  slide.videoSource ? (
                    <VideoSection
                      videoSource={slide.videoSource}
                      onVideoEnd={() => scrollToNextSection(index)}
                      isActive={isStarted ? index === activeIndex : index === 0}
                      shouldPlay={isStarted && index === activeIndex}
                      selectedLanguageCode={language}
                      additionalContent={renderAdditionalContent(slide)}
                      pageTheme={pageTheme}
                      speakers={slide.speakers}
                    />
                  ) : (
                    <div className="relative aspect-video h-[calc(100vh-120px)] max-w-[90vw] tall:max-h-[1076px]">
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
        {ScrollNavigation(pageTheme)}
      </ErrorBoundary>
    </div>
  );
}
