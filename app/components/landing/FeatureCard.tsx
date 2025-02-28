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
        {isMobile || isHovered ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`scale-100 object-cover ${
                !position ? "object-[20%_20%]" : "object-[60%_40%]"
              }`}
              priority={true} // Always prioritize these images
              onLoadingComplete={() => setIsImageLoaded(true)}
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
        <p className="absolute bottom-1 pl-5 text-xs text-white md:bottom-2 md:pl-12 md:text-lg xl:bottom-6 xl:pl-24">
          {description}
        </p>
      </div>
    </Link>
  );
}
