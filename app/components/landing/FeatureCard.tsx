"use client";

import { useState } from "react";
import Image from "next/image";
import Title from "../Title";
import Link from "next/link";

type FeatureCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  isMobile?: boolean;
  position?: "top" | "bottom";
  desktopHeight?: string;
  navTo: string;
};

export default function FeatureCard({
  title,
  description,
  imageUrl,
  isMobile = false,
  position,
  desktopHeight = "140px",
  navTo,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const border =
    !isMobile && position === "top"
      ? "rounded-t-3xl"
      : !isMobile && position === "bottom"
      ? "rounded-b-3xl"
      : "";

  return (
    <Link
      href={navTo}
      className={`relative z-10 w-full cursor-pointer overflow-hidden ${border}`}
      style={{ height: isMobile ? "160px" : desktopHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 h-full w-full">
        {isMobile || isHovered ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`scale-100 object-cover ${
                !position ? "object-[20%_20%]" : "object-[60%_40%]"
              }`}
              priority={isMobile}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
        <Title text={title} theme="transparent" color="green_accent" />
        <p className="absolute bottom-1 pl-5 text-xs text-white  md:bottom-6 md:pl-12 md:text-lg xl:pl-24">
          {description}
        </p>
      </div>
    </Link>
  );
}
