import { VideoSource } from "@/types/scrollDocumentary";
import { ReactNode } from "react";
import { NavColor } from "@/components/navigation/Navigation";
import { Slide1Content } from "./slide_1";
import { Slide2Content } from "./slide_2";
import { Slide3Content } from "./slide_3";
import { Slide15Content } from "./slide_15";
import { Slide0Content } from "./slide_0";
import { parseTimeString } from "@/utils/subtitles/api";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

export type Speaker = {
  start: number;
  end: number;
  id: string;
  name: string | null;
  country: string;
};

type Slide = {
  id: string;
  videoId?: string;
  hasTitle: boolean;
  colorTheme: "gray" | "black" | "pink";
  additionalElements: {
    type: string;
    content: ReactNode;
  }[];
  videSource: VideoSource | null;
  videoTitle: string | null;
  speakers: Speaker[];
};

export type SlideWithSource = Slide & { videoSource?: VideoSource };

export const getSpeakerText = (speaker: Speaker | undefined) =>
  speaker ? `${speaker.name}, ${speaker.country}` : "";

export const slides: Slide[] = [
  {
    id: "slide_0",
    hasTitle: false,
    colorTheme: "black",
    additionalElements: [
      {
        type: "start",
        content: <Slide0Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
    speakers: [],
  },
  {
    id: "slide_1",
    hasTitle: false,
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
    speakers: [],
  },
  {
    id: "slide_2",
    hasTitle: false,
    colorTheme: "black",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide2Content />,
      },
    ],
    videoId: "7e93c98d-b9b6-4619-a4cd-779bfdac1f60",
    videSource: null,
    videoTitle: null,
    speakers: [],
  },
  {
    id: "slide_3",
    hasTitle: false,
    colorTheme: "pink",
    additionalElements: [
      {
        type: "overlay",
        content: <Slide3Content />,
      },
    ],
    videoId: "6c5443f1-566b-4ca0-894c-7870fa6211d8",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:22.018"),
        end: parseTimeString("00:01:00.017"),
        id: "6f78ec79-a811-4555-8e14-2d3ab1c97c96",
        name: "Michaela Bedrníková",
        country: "Czech Republic",
      },
    ],
  },
  {
    id: "slide_4",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "755b14fd-62aa-4f85-9887-f5bf9bf791a4",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:02.008"),
        id: "d83c6230-e80d-46b5-a60f-4fa05a03ef98",
        name: "Juozas Malickas",
        country: "Lithuania",
      },
      {
        start: parseTimeString("00:01:02.009"),
        end: parseTimeString("00:02:01.006"),
        id: "241084e0-411b-4cfb-845b-d552ad05e6f8",
        name: "Slobodanka Moravčević",
        country: "Serbia/Belgium",
      },
      {
        start: parseTimeString("00:02:01.007"),
        end: parseTimeString("00:02:55.009"),
        id: "973cb940-5d84-45f7-84f7-2706842507da",
        name: "Lisbeth Ruiz Sanchez",
        country: "Cuba/Belgium",
      },
    ],
  },
  {
    id: "slide_5",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "844a56e9-2a91-42b4-a037-4e2a93569b21",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:03.000"),
        id: "69bd54d1-d21e-4ef8-abfa-be77a040a69b",
        name: "Mariano Royo Arpón",
        country: "Spain",
      },
    ],
  },
  {
    id: "slide_6",
    hasTitle: true,
    colorTheme: "pink",
    additionalElements: [],
    videoId: "e689da44-a382-4718-ba5b-f95e2265adb5",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:00.000"),
        end: parseTimeString("00:00:39.000"),
        id: "8c162d7f-bc18-4fe5-b1f7-f5f0dec22dfa",
        name: "Amir Mohammadi",
        country: "The Netherlands",
      },
    ],
  },
  {
    id: "slide_7",
    hasTitle: false,
    colorTheme: "black",
    additionalElements: [],
    videoId: "fb2f5641-6661-4984-a0bd-ff49bf618c13",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:00.000"),
        end: parseTimeString("00:01:22.000"),
        id: "673f578a-9e18-4273-bb29-583f2340a2c3",
        name: "Chee-Han Kartosen-Wong",
        country: "The Netherlands",
      },
    ],
  },
  {
    id: "slide_8",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "533be4fb-6afb-491e-9b52-d88f1e99b429",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:01.000"),
        id: "2f52f15a-05c9-4439-b168-ed33d42e42cb",
        name: "Nikos Vatopoulos",
        country: "Greece",
      },
      {
        start: parseTimeString("00:01:01.001"),
        end: parseTimeString("00:02:03.000"),
        id: "39f088be-b8b2-424b-b589-7215215a64e4",
        name: "Andrés Ruiz Grima",
        country: "Spain",
      },
    ],
  },
  {
    id: "slide_9",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "d934bb17-08b9-4898-be21-94d4bde205f1",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.001"),
        end: parseTimeString("00:01:46.000"),
        id: "cb6ab499-1b2c-49de-8d9a-eb5691e82d00",
        name: "Michaela Roman",
        country: "Romania",
      },
    ],
  },
  {
    id: "slide_10",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "10725c06-db6a-4594-b9ab-9b4e66d295da",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:05.011"),
        end: parseTimeString("00:00:30.018"),
        id: "2f52f15a-05c9-4439-b168-ed33d42e42cb",
        name: "Nikos Vatopoulos",
        country: "Greece",
      },
    ],
  },
  {
    id: "slide_11",
    hasTitle: true,
    colorTheme: "pink",
    additionalElements: [],
    videoId: "d59616fe-59d2-4f7b-89c7-53ac66189d55",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:02:25.000"),
        id: "5c8b6cda-53a2-4df5-9206-ca29163a1649",
        name: "Jiří Zajíc",
        country: "Czech Republic",
      },
    ],
  },
  {
    id: "slide_12",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "0096ffae-5844-4d85-a2ab-102d139bf806",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:01:13.000"),
        id: "517ba00c-59c5-4083-9636-c877afeed3fa",
        name: "Joanna Miłosz-Piekarska",
        country: "Poland",
      },
    ],
  },
  {
    id: "slide_13",
    hasTitle: true,
    colorTheme: "black",
    additionalElements: [],
    videoId: "1d16c559-e4fa-4b55-ab4b-ae9e3a464da5",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:00:31.000"),
        id: "673f578a-9e18-4273-bb29-583f2340a2c3",
        name: "Chee-Han Kartosen-Wong",
        country: "The Netherlands",
      },
    ],
  },
  {
    id: "slide_14",
    hasTitle: true,
    colorTheme: "gray",
    additionalElements: [],
    videoId: "b604561b-135f-4ef2-90b4-9cb04381a305",
    videSource: null,
    videoTitle: null,
    speakers: [
      {
        start: parseTimeString("00:00:01.000"),
        end: parseTimeString("00:00:29.022"),
        id: "79948c81-c855-491f-922b-25d86ff00bea",
        name: "Željko Rogina",
        country: "Croatia",
      },
      {
        start: parseTimeString("00:00:29.023"),
        end: parseTimeString("00:01:18.005"),
        id: "530043e7-2972-4f57-9875-dc44aebe9c1c",
        name: "Milice Ribeiro Dos Santos",
        country: "Portugal",
      },
    ],
  },
  {
    id: "slide_15",
    hasTitle: false,
    colorTheme: "black",
    additionalElements: [
      {
        type: "credits",
        content: <Slide15Content />,
      },
    ],
    videSource: null,
    videoTitle: null,
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
