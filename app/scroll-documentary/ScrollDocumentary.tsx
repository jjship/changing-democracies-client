"use client";

import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import VideoSection from "./VideoSection";
import ErrorBoundary from "./VideoErrorBoundary";
import { Navigation } from "@/components/navigation/Navigation";
import { themeMapping, SlideWithSource, PageTheme } from "./slides/slides";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { Archivo_Narrow } from "next/font/google";
import { useLanguageSelection } from "./useLanguageSelection";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

interface ScrollDocumentaryClientProps {
  slidesWithSources: SlideWithSource[];
  initialLanguageLabel: string;
  availableLanguageLabels: string[];
}

export default function ScrollDocumentaryClient({
  slidesWithSources,
  initialLanguageLabel,
  availableLanguageLabels,
}: ScrollDocumentaryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSections, setLoadedSections] = useState<number[]>([0]);
  const [isFirstVideoReady, setIsFirstVideoReady] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguageSelection({
    initialLanguageLabel,
    availableLanguageLabels,
  });

  const activeSlide = slidesWithSources[activeIndex];
  const pageTheme = activeSlide
    ? themeMapping[activeSlide.colorTheme]
    : themeMapping.black;

  useEffect(() => {
    setLoadedSections([0]);
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
        <div className="absolute left-8 top-8 z-10 flex items-center justify-center ">
          {" "}
          <h1
            className={`${archivoNarrow.className} bg-black_bg bg-opacity-70 px-2 py-1 text-left text-2xl font-bold text-yellow_secondary mix-blend-multiply`}
          >
            {slide.title}
          </h1>
        </div>
      )}
      {slide.additionalElements.map((elem, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex max-h-[80vh] items-center justify-center"
        >
          {elem.content}
        </div>
      ))}
    </>
  );

  return (
    selectedLanguage && (
      <div
        className={`relative ${pageTheme.pageBg} min-h-screen w-full transition-all duration-1000`}
      >
        <div className="absolute w-full">
          <Navigation
            bgColor={pageTheme.navBg}
            fontColor={pageTheme.navFont}
            availableLanguages={availableLanguageLabels}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
        {!isStarted ? (
          <div className="flex h-[calc(90vh)] w-full items-center justify-center">
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
              className="h-[calc(90vh)] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            >
              {slidesWithSources.map((slide, index) => (
                <div
                  key={slide.videoSource?.videoId ?? index}
                  id={`section-${index}`}
                  className="flex h-[calc(90vh)] snap-center items-center justify-center"
                >
                  <div className="relative mx-auto aspect-video w-[70vw] max-w-[120vh] px-4">
                    {loadedSections.includes(index) && slide.videoSource ? (
                      <>
                        <VideoSection
                          videoSource={slide.videoSource!}
                          onVideoEnd={() => scrollToNextSection(index)}
                          isActive={index === activeIndex}
                          shouldPlay={isStarted && index === activeIndex}
                          selectedLanguageCode={
                            slide.videoSource?.availableLanguageCodes[
                              selectedLanguage
                            ]
                          }
                          additionalContent={renderAdditionalContent(slide)}
                          pageTheme={pageTheme}
                          speakers={slide.speakers}
                        />
                      </>
                    ) : slide.videoSource ? (
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
                    ) : (
                      renderAdditionalContent(slide)
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
