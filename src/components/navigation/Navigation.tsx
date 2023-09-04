"use client";
import { createContext, useState } from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Hamburger from "./Hamburger";

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
        className={` flex flex-row justify-between bg-puprple_lightest_bg dt:flex-col dt:items-end ${
          isNavOpen ? "relative" : "sticky top-0 z-40"
        }`}
      >
        <Navbar />
        <Hamburger />
      </div>
    </NavContext.Provider>
  );
}
