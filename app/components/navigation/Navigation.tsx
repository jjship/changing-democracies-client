"use client";
import { FC, useState } from "react";

import { NavDrawer } from "./NavDrawer";
import { Hamburger } from "./Hamburger";

export { Navigation };

export type NavColor = "purple_lightest_bg" | "black_bg" | "yellow_secondary";

export type NavigationProps = {
  bgColor?: NavColor;
  fontColor?: NavColor;
};

const Navigation: FC<NavigationProps> = ({
  bgColor = "purple_lightest_bg",
  fontColor = "black_bg",
}: NavigationProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div
      className={`bg-${
        isNavOpen ? "black_bg" : bgColor
      } sticky top-0 z-40 transition-all duration-1000`}
    >
      <div className="flex min-h-[5vh] justify-end">
        <Hamburger
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
          fontColor={fontColor}
        />
      </div>
      <NavDrawer isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </div>
  );
};
