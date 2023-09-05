"use client";
import { createContext, useState } from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Hamburger from "./Hamburger";
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
        className={`bg-puprple_lightest_bg ${
          isNavOpen ? "relative" : "sticky top-0 z-40"
        }`}
      >
        <div className="m-auto max-w-[23.125rem] dt:max-w-[90rem] ">
          <div
            className={`flex flex-row justify-between dt:flex-col dt:items-end ${
              isNavOpen ? "relative" : "sticky top-0 z-40"
            }`}
          >
            <Navbar />
            <Hamburger />
          </div>
        </div>
      </div>
      <MobileNav />
    </NavContext.Provider>
  );
}
