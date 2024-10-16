import { FC } from "react";
import Link from "next/link";

export const Hamburger: FC<{
  isNavOpen: boolean;
  toggleNav: () => void;
  fontColor: string;
}> = ({ isNavOpen, toggleNav, fontColor }) => {
  const currentStroke = fontColor === "black_bg" ? "#191818" : "#CF9855";

  return (
    <Link
      href="#"
      className={`hamburger z-50 my-3 px-5 md:my-auto md:px-10  ${
        isNavOpen ? "open" : ""
      }`}
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
          stroke={currentStroke}
          strokeWidth="4"
          className={isNavOpen ? "open" : ""}
        />
        <line
          id="middle-line"
          y1="11.834"
          x2="28"
          y2="11.834"
          stroke={currentStroke}
          strokeWidth="4"
          className={isNavOpen ? "open" : ""}
        />
        <line
          id="bottom-line"
          y1="22.168"
          x2="28"
          y2="22.168"
          stroke={currentStroke}
          strokeWidth="4"
          className={isNavOpen ? "open" : ""}
        />
      </svg>
    </Link>
  );
};
