import { FC, useEffect } from "react";
import { AnimatedLink } from "./AnimatedLink";
import { useRouter, useParams } from "next/navigation";

// Constant for localStorage key to maintain consistency across the app
const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";

export const NavDrawer: FC<{ isNavOpen: boolean; toggleNav: () => void }> = ({
  isNavOpen,
  toggleNav,
}) => {
  const router = useRouter();
  const params = useParams();

  // Prefetch all routes when component mounts
  useEffect(() => {
    // Get the current language from params or localStorage
    let currentLang: string = "en"; // Default fallback

    // Try to get from params first
    if (params?.lang && typeof params.lang === "string") {
      currentLang = params.lang;
    }
    // Otherwise try localStorage
    else if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
      if (storedLang) {
        currentLang = storedLang;
      }
    }

    // Prefetch main navigation routes with language prefix
    router.prefetch(`/${currentLang}/scroll-documentary`);
    router.prefetch(`/${currentLang}/narratives`);
    router.prefetch(`/${currentLang}/free-browsing`);
    router.prefetch(`/${currentLang}/team`);
    router.prefetch(`/${currentLang}/events`);
    router.prefetch(`/${currentLang}/contact`);
  }, [router, params?.lang]);

  return (
    <div
      className={`z-50 flex h-[110vh] transform flex-col justify-between bg-black_bg transition-all duration-1000 ease-in-out ${
        isNavOpen
          ? "max-h-[90vh] scale-100 opacity-100"
          : "max-h-0  overflow-hidden opacity-0"
      } `}
    >
      <div className="z-50 flex-grow "></div>
      <div className="z-50 mb-5 ml-5 flex flex-col justify-center gap-2 ">
        <AnimatedLink
          href="/scroll-documentary"
          text="scroll documentary"
          timeout={80}
          color="yellow"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/narratives"
          text="narratives"
          timeout={120}
          color="yellow"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/free-browsing"
          text="free browsing"
          timeout={140}
          color="yellow"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />

        <AnimatedLink
          href="/team"
          text="team"
          timeout={160}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/events"
          text="events"
          timeout={200}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/contact"
          text="contact"
          timeout={250}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/educational-resources"
          text="educational resources"
          timeout={300}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/research-publication"
          text="research publication"
          timeout={350}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/travelling-workshop"
          text="travelling workshop"
          timeout={400}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
      </div>
    </div>
  );
};
