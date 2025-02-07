import { FC } from "react";
import { AnimatedLink } from "./AnimatedLink";

export const NavDrawer: FC<{ isNavOpen: boolean; toggleNav: () => void }> = ({
  isNavOpen,
  toggleNav,
}) => (
  <div
    className={`z-50 flex h-screen transform flex-col justify-between bg-black_bg transition-all duration-1000 ease-in-out ${
      isNavOpen
        ? "max-h-[90vh] scale-100 opacity-100"
        : "max-h-0  overflow-hidden opacity-0"
    } `}
  >
    <div className="z-50 flex-grow "></div>
    <div className="z-50 mb-5 ml-5 flex flex-col justify-center gap-2">
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
        href="/#project"
        text="project"
        timeout={160}
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
      <AnimatedLink
        href="/#educational-resources"
        text="educational resources"
        timeout={350}
        color="pink"
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />
    </div>
  </div>
);
