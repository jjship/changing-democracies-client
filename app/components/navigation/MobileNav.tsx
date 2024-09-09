import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { NavColor } from "./Navigation";
import { useRouter } from "next/navigation";

export const MobileNav: FC<{ isNavOpen: boolean; toggleNav: () => void }> = ({
  isNavOpen,
  toggleNav,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isNavOpen]);

  return (
    <div
      id="mobileContainer"
      className={`flex h-screen transform flex-col justify-between bg-black_bg transition-all duration-1000 ease-in-out ${
        visible
          ? "max-h-screen scale-100 opacity-100"
          : "max-h-0  overflow-hidden opacity-0"
      } `}
    >
      <div className="flex-grow "></div>
      <div className="ml-5 flex flex-col justify-center gap-8">
        <AnimatedLink
          href="/free-browsing"
          text="free browsing"
          timeout={110}
          color="yellow"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/#project"
          text="project"
          timeout={200}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/#team"
          text="team"
          timeout={300}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/#events"
          text="events"
          timeout={400}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <AnimatedLink
          href="/#contact"
          text="contact"
          timeout={500}
          color="pink"
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
      </div>
    </div>
  );
};

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

  const linkClasses = `text-${getFontColor(color)} text-5xl capitalize`;

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

    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <div
      className={`z-[100] transition-all duration-1000 ease-in-out ${
        slideIn ? "translate-y-0" : "translate-y-[100vh]"
      }`}
    >
      <a href={href} onClick={handleClick} className={linkClasses}>
        {text}
      </a>
    </div>
  );
};
