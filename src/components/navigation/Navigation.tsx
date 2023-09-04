"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Hamburger from "./Hamburger";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const NavContext = createContext({
  isNavOpen: false,
  toggleNav: () => {},
});

export default function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav }}>
      <Overlay />
      <div
        className={`flex flex-row justify-between bg-puprple_lightest_bg dt:flex-col dt:items-end ${
          isNavOpen ? "relative" : "sticky top-0 z-40"
        }`}
      >
        <Navbar />
        <Hamburger />
      </div>
      <MobileNav />
    </NavContext.Provider>
  );
}
