import { useState, useEffect, FC } from "react";
import { useRouter, useParams } from "next/navigation";
import { NavColor } from "./Navigation";
import { getLocalizedRoute } from "@/utils/i18n/routeUtils";
import { LanguageService } from "@/utils/i18n/languageService";

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

    // Get the current language using the centralized service
    const { language: currentLang } =
      LanguageService.getCurrentLanguage(params);

    // Get the localized route
    const languagePrefixedHref = getLocalizedRoute(href, currentLang);

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
