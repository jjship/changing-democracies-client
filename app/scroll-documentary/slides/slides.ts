import { VideoSource } from "@/types/scrollDocumentary";
import { ReactNode } from "react";
import { NavColor } from "@/components/navigation/Navigation";

type Slide = {
  name: string;
  colorTheme: "gray" | "black" | "pink";
  additionalElements: {
    type: string;
    content: ReactNode;
  }[];
  videSource: VideoSource | null;
  videoTitle: string | null;
  persons: { start: number; end: number; text: string }[];
};

export type SlideWithSource = Slide & { videoSource: VideoSource };

const slides: Slide[] = [
  {
    name: "opening",
    colorTheme: "gray",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "arrows",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "description",
    colorTheme: "pink",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "parade",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "flag",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "undocumented",
    colorTheme: "pink",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "beauty",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "disillusionment",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "diagram",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "tunel",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "lecture",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "snap",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "noise",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
  {
    name: "toddler",
    colorTheme: "gray",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
  },
];

export function assignVideoSourcesToSlides({
  videoSources,
}: {
  videoSources: VideoSource[];
}) {
  if (videoSources.length !== slides.length) {
    console.log({ vidLen: videoSources.length, slidesLen: slides.length });
    throw new Error("videoSources and slides must have the same length");
  }

  return slides.map((slide, index) => {
    return {
      ...slide,
      videoSource: videoSources[index],
    };
  });
}

export type PageTheme = {
  pageBg: string;
  pageFont: string;
  navBg: NavColor;
  navFont: NavColor;
  scrollDotsBorder: string;
  scrollDotsHover: string;
};

export const themeMapping: Record<string, PageTheme> = {
  black: {
    pageBg: "bg-black_bg",
    pageFont: "text-yellow_secondary",
    navBg: "black_bg",
    navFont: "yellow_secondary",
    scrollDotsBorder: "border-yellow_secondary",
    scrollDotsHover: "hover:bg-green_accent",
  },
  gray: {
    pageBg: "bg-gray_scroll",
    pageFont: "text-yellow_secondary",
    navBg: "gray_scroll",
    navFont: "yellow_secondary",
    scrollDotsBorder: "border-yellow_secondary",
    scrollDotsHover: "hover:bg-green_accent",
  },
  pink: {
    pageBg: "bg-pink_scroll",
    pageFont: "text-black_bg",
    navBg: "pink_scroll",
    navFont: "black_bg",
    scrollDotsBorder: "border-black_bg",
    scrollDotsHover: "hover:bg-green_accent",
  },
};
