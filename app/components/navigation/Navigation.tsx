"use client";
import { FC, useState } from "react";
import Image from "next/image";
import logoDark from "@/public/logo_dark_no_bg.svg";
import { NavDrawer } from "./NavDrawer";
import { Hamburger } from "./Hamburger";

export { Navigation };

export type NavColor = "purple_lightest_bg" | "black_bg" | "yellow_secondary";

export type NavigationProps = {
  bgColor?: NavColor;
  fontColor?: NavColor;
  onLanguageChange?: (language: string) => void;
  availableLanguages?: Array<{ languageCode: string; label: string }>;
  selectedLanguage?: string;
};

const Navigation: FC<NavigationProps> = ({
  bgColor = "purple_lightest_bg",
  fontColor = "black_bg",
  onLanguageChange,
  availableLanguages,
  selectedLanguage,
}: NavigationProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div
      className={`bg-${
        isNavOpen ? "black_bg" : bgColor
      } sticky top-0 z-40 w-full transition-all duration-1000`}
    >
      <div className="flex min-h-[5vh] justify-between">
        <Image
          src={logoDark}
          alt="changing democracies logo"
          className="m-3 h-auto w-[30%] md:mx-10 md:w-[10%]"
        />
        {availableLanguages && availableLanguages.length > 0 && (
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange?.(e.target.value)}
            className={`rounded bg-${bgColor} px-2 py-1 text-sm text-${fontColor} border border-${fontColor}`}
          >
            {availableLanguages.map((lang) => (
              <option key={lang.languageCode} value={lang.languageCode}>
                {lang.label}
              </option>
            ))}
          </select>
        )}
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
