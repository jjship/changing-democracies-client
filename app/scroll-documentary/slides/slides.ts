import { VideoSource } from "../../../types/scrollDocumentary";
import { ReactNode } from "react";

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
