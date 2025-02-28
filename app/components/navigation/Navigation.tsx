"use client";
import { FC, useState } from "react";
import Image from "next/image";
import logoDark from "@/public/logo_dark_no_bg.svg";
import { NavDrawer } from "./NavDrawer";
import { Hamburger } from "./Hamburger";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export { Navigation };

export type NavColor =
  | "purple_lightest_bg"
  | "black_bg"
  | "yellow_secondary"
  | "gray_dark_secondary"
  | "pink_scroll"
  | "black_scroll"
  | "gray_scroll";

export type NavigationProps = {
  bgColor?: NavColor;
  fontColor?: NavColor;
  onLanguageChange?: (language: string) => void;
  availableLanguages?: string[];
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
      <div className="flex h-[4rem] items-center justify-between">
        <Image
          src={logoDark}
          alt="changing democracies logo"
          className="m-3 h-auto w-[30%] md:mx-10 md:w-[10%] "
        />
        <div className="mr-3 flex items-center gap-2 font-bold">
          {availableLanguages && availableLanguages.length > 0 && isNavOpen && (
            <Select
              value={selectedLanguage}
              onValueChange={(value) => {
                toggleNav();
                if (onLanguageChange) onLanguageChange(value);
              }}
              aria-label="Language Selector"
            >
              <SelectTrigger
                className={`h-10 w-10 border-none bg-transparent p-0 text-yellow_secondary`}
                aria-label="Selected Language"
              >
                <SelectValue placeholder={selectedLanguage?.toUpperCase()} />
              </SelectTrigger>
              <SelectContent
                className={`border-yellow_secondary bg-black_bg font-bold text-yellow_secondary`}
                aria-label="Available Languages"
              >
                {availableLanguages.map((lang) => (
                  <SelectItem
                    key={`${lang}`}
                    value={lang}
                    className="text-yellow_secondary focus:bg-yellow_secondary focus:text-black_bg"
                    aria-label={lang}
                  >
                    {lang.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Hamburger
            isNavOpen={isNavOpen}
            toggleNav={toggleNav}
            fontColor={fontColor}
            aria-label="Navigation Toggle"
          />
        </div>
      </div>
      <NavDrawer isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </div>
  );
};
