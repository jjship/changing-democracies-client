import { VideoSource } from "@/types/scrollDocumentary";
import { ReactNode } from "react";
import { NavColor } from "@/components/navigation/Navigation";
import { parseTimeString } from "../subtitleParser";
import { Slide0Content } from "./slide_0";
import { Slide1Content } from "./slide_1";
import Slide3Content from "./slide_3";
import Slide15Content from "./slide_15";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

type Slide = {
  title?: string;
  colorTheme: "gray" | "black" | "pink";
  additionalElements: {
    type: string;
    content: ReactNode;
  }[];
  videSource: VideoSource | null;
  videoTitle: string | null;
  persons: { start: number; end: number; text: string }[];
  speakers: Subtitle[];
};

export type SlideWithSource = Slide & { videoSource: VideoSource };

const slides: Slide[] = [
  {
    colorTheme: "gray",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide0Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
  {
    colorTheme: "black",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide1Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
  {
    colorTheme: "pink",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide3Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:22.018"),
        end: parseTimeString("00:01:00.017"),
        text: "Michaela Bedrníková, Czech Republic",
      },
    ],
  },
  {
    title: "Looking back",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:02.008"),
        text: "Juozas Malickas, Lithuania",
      },
      {
        start: parseTimeString("00:01:02.009"),
        end: parseTimeString("00:02:01.006"),
        text: "Slobodanka Moravčević, Serbia/Belgium",
      },
      {
        start: parseTimeString("00:02:01.007"),
        end: parseTimeString("00:02:55.009"),
        text: "Lisbeth Ruiz Sanchez, Cuba/Belgium",
      },
    ],
  },
  {
    title: "State of transition",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:03.000"),
        text: "Mariano Royo Arpón, Spain",
      },
    ],
  },
  {
    title: "Is my democracy your democracy?",
    colorTheme: "pink",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:00.000"),
        end: parseTimeString("00:00:39.000"),
        text: "Amir Mohammadi, The Netherlands",
      },
    ],
  },
  {
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:00.000"),
        end: parseTimeString("00:01:22.000"),
        text: "Chee-Han Kartosen-Wong, The Netherlands",
      },
    ],
  },
  {
    title: "Reality check",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:01.000"),
        text: "Nikos Vatopoulos, Greece",
      },
      {
        start: parseTimeString("00:01:01.001"),
        end: parseTimeString("00:02:03.000"),
        text: "Andrés Ruiz Grima, Spain",
      },
    ],
  },
  {
    title: "The personal is political",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.001"),
        end: parseTimeString("00:01:46.000"),
        text: "Michaela Roman, Romania",
      },
    ],
  },
  {
    title: "Past Present Future",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:05.011"),
        end: parseTimeString("00:00:30.018"),
        text: "Nikos Vatopoulos, Greece",
      },
    ],
  },
  {
    title: "Get together",
    colorTheme: "pink",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:02:25.000"),
        text: "Jiří Zajíc, Czech Republic",
      },
    ],
  },
  {
    title: "Beware",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:13.000"),
        text: "Joanna Miłosz-Piekarska, Poland",
      },
    ],
  },
  {
    title: "Make noise",
    colorTheme: "black",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:00:31.000"),
        text: "Chee-Han Kartosen-Wong, The Netherlands",
      },
    ],
  },
  {
    title: "Our turn",
    colorTheme: "gray",
    additionalElements: [],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:00:29.022"),
        text: "Željko Rogina, Croatia",
      },
      {
        start: parseTimeString("00:00:29.023"),
        end: parseTimeString("00:01:18.005"),
        text: "Milice Ribeiro Dos Santos, Portugal",
      },
    ],
  },
  {
    colorTheme: "black",
    additionalElements: [
      {
        type: "credits",
        content: <Slide15Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
];

export function assignVideoSourcesToSlides({
  videoSources,
}: {
  videoSources: VideoSource[];
}) {
  return slides.map((slide, index) => {
    return {
      ...slide,
      videoSource: videoSources[index] ?? null,
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
  subtitleColor: string;
  speakersColor: string;
};

export const themeMapping: Record<string, PageTheme> = {
  black: {
    pageBg: "bg-black_bg",
    pageFont: "text-yellow_secondary",
    navBg: "black_bg",
    navFont: "yellow_secondary",
    scrollDotsBorder: "border-yellow_secondary",
    scrollDotsHover: "hover:bg-green_accent",
    subtitleColor: "text-white",
    speakersColor: "text-green_accent bg-darkRed",
  },
  gray: {
    pageBg: "bg-gray_scroll",
    pageFont: "text-yellow_secondary",
    navBg: "gray_scroll",
    navFont: "yellow_secondary",
    scrollDotsBorder: "border-yellow_secondary",
    scrollDotsHover: "hover:bg-green_accent",
    subtitleColor: "text-white",
    speakersColor: "text-green_accent bg-darkRed",
  },
  pink: {
    pageBg: "bg-pink_scroll",
    pageFont: "text-black_bg",
    navBg: "pink_scroll",
    navFont: "black_bg",
    scrollDotsBorder: "border-black_bg",
    scrollDotsHover: "hover:bg-green_accent",
    subtitleColor: "text-black_bg",
    speakersColor: "text-darkRed bg-yellow_secondary",
  },
};
