import { useState, useEffect, FC } from "react";
import { useRouter, useParams } from "next/navigation";
import { NavColor } from "./Navigation";

export { AnimatedLink };

type LinkColor = "yellow" | "pink";

const getFontColor = (color: LinkColor): NavColor => {
  switch (color) {
    case "pink":
      return "purple_lightest_bg";
    case "yellow":
      return "yellow_secondary";
    default:
      console.error("Unknown animated link color");
      return "purple_lightest_bg";
  }
};
import { LANGUAGE_PREFERENCE_KEY } from "@/components/scrollDocumentary/useLanguageSelection";

const AnimatedLink: FC<{
  href: string;
  text: string;
  timeout?: number;
  color: LinkColor;
  isNavOpen: boolean;
  toggleNav: () => void;
}> = ({ href, text, timeout, color, isNavOpen, toggleNav }) => {
  const [slideIn, setSlideIn] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (isNavOpen) {
      const slideTimeout = setTimeout(() => {
        setSlideIn(true);
      }, timeout);

      return () => clearTimeout(slideTimeout);
    } else {
      setSlideIn(false);
    }
  }, [isNavOpen, timeout]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleNav();

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

    // Construct a language-prefixed path
    const languagePrefixedHref = href.startsWith("/")
      ? `/${currentLang}${href}`
      : `/${currentLang}/${href}`;

    setTimeout(() => {
      router.push(languagePrefixedHref);
    }, 700);
  };

  return (
    <div
      className={`z-[100] transition-all duration-1000 ease-in-out ${
        slideIn ? "translate-y-0" : "translate-y-[100vh]"
      }`}
    >
      <a
        href={href}
        onClick={handleClick}
        className={`text-${getFontColor(
          color,
        )} text-3xl capitalize md:text-6xl xl:text-7xl`}
      >
        {text}
      </a>
    </div>
  );
};
