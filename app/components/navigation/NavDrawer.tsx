import { FC } from "react";
import { AnimatedLink } from "./AnimatedLink";

export const NavDrawer: FC<{ isNavOpen: boolean; toggleNav: () => void }> = ({
  isNavOpen,
  toggleNav,
}) => (
  <div
    className={`z-50 flex h-screen transform flex-col justify-between bg-black_bg transition-all duration-1000 ease-in-out ${
      isNavOpen
        ? "max-h-screen scale-100 opacity-100"
        : "max-h-0  overflow-hidden opacity-0"
    } `}
  >
    <div className="z-50 flex-grow "></div>
    <div className="z-50 ml-5 flex flex-col justify-center gap-8">
      <AnimatedLink
        href="/free-browsing"
        text="free browsing"
        timeout={100}
        color="yellow"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
      <AnimatedLink
        href="/narrations"
        text="narrations"
        timeout={120}
        color="yellow"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
      <AnimatedLink
        href="/#project"
        text="project"
        timeout={150}
        color="pink"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
      <AnimatedLink
        href="/#team"
        text="team"
        timeout={200}
        color="pink"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
      <AnimatedLink
        href="/#events"
        text="events"
        timeout={250}
        color="pink"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
      <AnimatedLink
        href="/#contact"
        text="contact"
        timeout={300}
        color="pink"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
    </div>
    <div className="h-[15vh]"></div>
  </div>
);
