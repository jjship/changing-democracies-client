import { VideoSource } from "@/types/scrollDocumentary";
import { ReactNode } from "react";
import { NavColor } from "@/components/navigation/Navigation";
import { parseTimeString } from "../subtitleParser";
import { Slide1Content } from "./slide_1";
import { Slide2Content } from "./slide_2";
import { Slide3Content } from "./slide_3";
import { Slide15Content } from "./slide_15";
import { Slide0Content } from "./slide_0";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

type Slide = {
  id: string;
  videoId?: string;
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

export type SlideWithSource = Slide & { videoSource?: VideoSource };

export const slides: Slide[] = [
  {
    id: "slide_0",
    colorTheme: "black",
    additionalElements: [
      {
        type: "start",
        content: <Slide0Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
  {
    id: "slide_1",
    colorTheme: "gray",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide1Content />,
      },
    ],
    videoId: "89ade28e-439a-4952-a068-b81da8c4b22a",
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
  {
    id: "slide_2",
    colorTheme: "black",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide2Content />,
      },
    ],
    videoId: "2952bc8b-2892-4813-8331-0d8e3ce793dd",
    videSource: null,
    videoTitle: null,
    persons: [],
    speakers: [],
  },
  {
    id: "slide_3",
    colorTheme: "pink",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide3Content />,
      },
    ],
    videoId: "243f8c4a-4a51-4f15-83fb-085524b5e96c",
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
    id: "slide_4",
    title: "Looking back",
    colorTheme: "black",
    additionalElements: [],
    videoId: "2219fb4f-e47e-4cc5-83c2-8f5d0c51731b",
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
    id: "slide_5",
    title: "State of transition",
    colorTheme: "black",
    additionalElements: [],
    videoId: "844a56e9-2a91-42b4-a037-4e2a93569b21",
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
    id: "slide_6",
    title: "Is my democracy your democracy?",
    colorTheme: "pink",
    additionalElements: [],
    videoId: "e689da44-a382-4718-ba5b-f95e2265adb5",
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
    id: "slide_7",
    colorTheme: "black",
    additionalElements: [],
    videoId: "fb2f5641-6661-4984-a0bd-ff49bf618c13",
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
    id: "slide_8",
    title: "Reality check",
    colorTheme: "black",
    additionalElements: [],
    videoId: "533be4fb-6afb-491e-9b52-d88f1e99b429",
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
    id: "slide_9",
    title: "The personal is political",
    colorTheme: "black",
    additionalElements: [],
    videoId: "d934bb17-08b9-4898-be21-94d4bde205f1",
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
    id: "slide_10",
    title: "Past Present Future",
    colorTheme: "black",
    additionalElements: [],
    videoId: "10725c06-db6a-4594-b9ab-9b4e66d295da",
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
    id: "slide_11",
    title: "Get together",
    colorTheme: "pink",
    additionalElements: [],
    videoId: "6a1fdc30-4b16-4c34-ad53-1b468a4306ca",
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
    id: "slide_12",
    title: "Beware",
    colorTheme: "black",
    additionalElements: [],
    videoId: "0096ffae-5844-4d85-a2ab-102d139bf806",
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
    id: "slide_13",
    title: "Make noise",
    colorTheme: "black",
    additionalElements: [],
    videoId: "1d16c559-e4fa-4b55-ab4b-ae9e3a464da5",
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
    id: "slide_14",
    title: "Our turn",
    colorTheme: "gray",
    additionalElements: [],
    videoId: "b604561b-135f-4ef2-90b4-9cb04381a305",
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
    id: "slide_15",
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
