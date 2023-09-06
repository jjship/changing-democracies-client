"use client";
import { useContext } from "react";
import { NavContext } from "./Navigation";
import Link from "next/link";

export default function Hamburger() {
  const { isNavOpen, toggleNav } = useContext(NavContext);

  return (
    <Link
      href="#"
      className={`hamburger z-50 p-5 xl:hidden ${isNavOpen ? "open" : ""}`}
      onClick={toggleNav}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        height="1.5em"
        viewBox="0 0 28 24"
        fill="none"
      >
        <line
          id="top-line"
          y1="1.5"
          x2="28"
          y2="1.5"
          stroke="#191818"
          strokeWidth="3"
          className={isNavOpen ? "open" : ""}
        />
        <line
          id="middle-line"
          y1="11.834"
          x2="28"
          y2="11.834"
          stroke="#191818"
          strokeWidth="3"
          className={isNavOpen ? "open" : ""}
        />
        <line
          id="bottom-line"
          y1="22.168"
          x2="28"
          y2="22.168"
          stroke="#191818"
          strokeWidth="3"
          className={isNavOpen ? "open" : ""}
        />
      </svg>
    </Link>
  );
}
