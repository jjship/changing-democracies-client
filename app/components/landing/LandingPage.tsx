"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../../[lang]/context/TranslationContext";
import FeatureCard from "./FeatureCard";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Set initial values
    setIsMobile(window.innerWidth < 865);
    setWindowHeight(window.innerHeight);

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 865);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prefetch all main routes when component mounts
  useEffect(() => {
    // Prefetch main navigation routes
    router.prefetch("/scroll-documentary");
    router.prefetch("/narratives");
    router.prefetch("/free-browsing");
  }, [router]);

  // Calculate feature card height (approximately 60% of viewport height divided by number of cards)
  const calculateCardHeight = () => {
    if (isMobile) return "160px";
    const totalCardsHeight = windowHeight * 0.6; // 60% of viewport height
    const singleCardHeight = Math.floor(totalCardsHeight / featureItems.length);
    return `${singleCardHeight}px`;
  };

  // Access the dictionary and other translation context data
  const { dictionary: dict, language } = useTranslation();
  const urls = {
    freeBrowsing: `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/page/free_browsing_bg.png`,
    nln: `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/page/nln_bg.png`,
    scroll: `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/page/scroll_bg.png`,
  };

  const featureItems = [
    {
      title: dict.navigation.scrollDocumentary,
      description: dict.landing.scrollDocumentary,
      imageUrl: urls.scroll,
      navTo: "/scroll-documentary",
    },
    {
      title: dict.navigation.nonLinearNarratives,
      description: dict.landing.narratives,
      imageUrl: urls.nln,
      navTo: "/narratives",
    },
    {
      title: dict.navigation.freeBrowsing,
      description: dict.landing.freeBrowsing,
      imageUrl: urls.freeBrowsing,
      navTo: "/free-browsing",
    },
  ];

  const position = (index: number) => {
    if (index === 0) return "top";
    if (index === featureItems.length - 1) return "bottom";
    return undefined;
  };

  const cardHeight = calculateCardHeight();

  return (
    <div className="flex flex-col">
      {/* Main content area */}
      <main className="flex-grow">
        <div className="mx-auto md:max-w-[90vw]">
          <p className="mx-2 mb-8 max-w-3xl font-openBold text-black md:ml-10  md:text-xl">
            {dict.landing.description}
          </p>
          <div className="flex flex-col">
            {featureItems.map((item, index) => (
              <FeatureCard
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                isMobile={isMobile}
                position={position(index)}
                desktopHeight={cardHeight}
                navTo={item.navTo}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
