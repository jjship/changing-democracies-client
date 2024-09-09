"use client";
import { FC, createContext, useContext, useState } from "react";
import Overlay from "./Overlay";

import MobileNav from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

export { Navigation, NavContext };

export type NavColor = "purple_lightest_bg" | "black_bg" | "yellow_secondary";

export type NavigationProps = {
  bgColor?: NavColor;
  fontColor?: NavColor;
};

export type NavContextType = {
  isNavOpen: boolean;
  toggleNav: () => void;
  bgColor: NavColor;
  fontColor: NavColor;
};

const NavContext = createContext<NavContextType | null>(null);

const Navigation: FC<NavigationProps> = ({
  bgColor = "purple_lightest_bg",
  fontColor = "black_bg",
}: NavigationProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav, bgColor, fontColor }}>
      <Overlay />
      <DesktopNav />
      <MobileNav />
    </NavContext.Provider>
  );
};

export function useNavContext() {
  const context = useContext(NavContext);

  if (!context) {
    throw new Error("useNavContext must be used within a NavContextProvider");
  }

  return context;
}
