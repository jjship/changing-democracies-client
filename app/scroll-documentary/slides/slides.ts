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
    name: "parade",
    colorTheme: "pink",
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
    colorTheme: "black",
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
    name: "snap",
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
    name: "snap",
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

export const themeMapping: Record<
  string,
  { pageBg: string; pageFont: string; navBg: NavColor; navFont: NavColor }
> = {
  black: {
    pageBg: "bg-black_bg",
    pageFont: "text-yellow_secondary",
    navBg: "black_bg",
    navFont: "yellow_secondary",
  },
  gray: {
    pageBg: "bg-gray_dark_secondary",
    pageFont: "text-yellow_secondary",
    navBg: "gray_dark_secondary",
    navFont: "yellow_secondary",
  },
  pink: {
    pageBg: "bg-purple_lightest_bg",
    pageFont: "text-black_bg",
    navBg: "purple_lightest_bg",
    navFont: "black_bg",
  },
};
