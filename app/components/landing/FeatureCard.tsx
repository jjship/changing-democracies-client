"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "../Title";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();

  const border =
    !isMobile && position === "top"
      ? "rounded-t-3xl"
      : !isMobile && position === "bottom"
      ? "rounded-b-3xl"
      : "";

  // Preload image when component mounts
  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setIsImageLoaded(true);
  }, [imageUrl]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(navTo);
  };

  return (
    <Link
      href={navTo}
      className={`relative z-10 w-full cursor-pointer overflow-hidden ${border}`}
      style={{ height: isMobile ? "160px" : desktopHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="absolute inset-0 h-full w-full">
        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-800"></div>
        )}

        {/* Image with opacity transition based on load state */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`scale-100 object-cover transition-opacity duration-300 ${
            !position ? "object-[20%_20%]" : "object-[60%_40%]"
          } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          priority={true} // Always prioritize these images
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isHovered
              ? "from-[#E3AC55]/50 to-transparent"
              : "from-black/50 to-transparent"
          }`}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        <div className="z-30 mb-4 md:z-20 md:mb-6">
          {/* Direct styling instead of Title component */}
          <h1 className="pl-5 text-[2.25rem] leading-9 tracking-[-0.064rem] text-green_accent md:pl-12 md:text-6xl md:leading-8 xl:pl-24">
            {title}
          </h1>
        </div>
        <p className="pl-5 text-base text-white md:pl-12 md:text-2xl xl:pl-24 xl:text-3xl">
          {description}
        </p>
      </div>
    </Link>
  );
}
