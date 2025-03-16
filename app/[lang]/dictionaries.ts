import "server-only";
import { CDLanguages } from "@/utils/i18n/languages";

export type { Dictionary };

const dictionaries: Record<CDLanguages, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  ca: () => import("./dictionaries/ca.json").then((module) => module.default),
  hr: () => import("./dictionaries/hr.json").then((module) => module.default),
  cs: () => import("./dictionaries/cs.json").then((module) => module.default),
  nl: () => import("./dictionaries/nl.json").then((module) => module.default),
  lt: () => import("./dictionaries/lt.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  ro: () => import("./dictionaries/ro.json").then((module) => module.default),
  el: () => import("./dictionaries/el.json").then((module) => module.default),
};

export async function getDictionary(locale: CDLanguages): Promise<Dictionary> {
  return dictionaries[locale]();
}

type Dictionary = {
  navigation: {
    scrollDocumentary: string;
    narratives: string;
    nonLinearNarratives: string;
    freeBrowsing: string;
    project: string;
    team: string;
    events: string;
    educationalResources: string;
    researchPublication: string;
    travellingWorkshop: string;
    contact: string;
  };
  landing: {
    description: string;
    scrollDocumentary: string;
    narratives: string;
    freeBrowsing: string;
  };
  about: {
    p1: string;
    p2: string;
  };
  team: {
    description: string;
    teamList: Array<{
      organisation: string;
      members: string[];
      country: string;
      link: string;
    }>;
  };
  contact: {
    getIn: string;
    touch: string;
    download: string;
  };
  narratives: {
    title: string;
    select: string;
    watch: string;
    continue: string;
    switch: string;
  };
  freeBrowsing: {
    title: string;
    description: string;
    explanation: string;
  };
  eduPack: {
    title: string;
    subtitle: string;
    lead: string;
    p1: string;
    p2: string;
    questions: string[];
    p3: string;
    download: string;
  };
  researchPublication: {
    title: string;
    subtitle: string;
    lead: string;
    p1: string;
    download: string;
  };
  travellingWorkshop: {
    title: string;
    lead: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  scrollDocumentary: ScrollDictionary;
};

type ScrollDictionary = {
  slides: {
    [slideId: string]: {
      title?: string;
      additionalContent?: SlideAdditionalContent;
    };
  };
};

// Union type for all slide additional content types
type SlideAdditionalContent =
  | Slide0AdditionalContent
  | Slide1AdditionalContent
  | Slide2AdditionalContent
  | Slide3AdditionalContent
  | Slide15AdditionalContent
  | Record<string, string>; // Fallback for other slides

// Specific types for each slide's additional content
type Slide0AdditionalContent = {
  scroll: string;
  documentary: string;
};

type Slide1AdditionalContent = {
  is_democracy: string;
  worth: string;
  the_trouble: string;
};

type Slide2AdditionalContent = {
  democracy: string;
  equality: string;
  freedom: string;
  honesty: string;
  love: string;
  conflict: string;
  safety: string;
  justice: string;
};

export type Slide3AdditionalContent = {
  about_the_project: string;
  democracy_failed_us: string;
  democracy_is_in_crisis: string;
  we_need_to_defend_democracy: string;
  authoritarianism_is_on_the_rise: string;
  democratic_institutions_are_in_decline: string;
  you_know_these_phrases: string;
  you_ve_heard_them_over_and_over: string;
  but_what_lies_beyond_this_gloomy_picture: string;
  there_are_people_around_us_who_know: string;
  they_have_experienced_firsthand_what_life_is_like_under_different_political_systems: string;
  they_have_lived_through_times_of_transition: string;
  so_we_asked_them: string;
  is_democracy_worth_the_trouble: string;
  they_shared_their_fears_their_hopes_their_disillusions: string;
  their_stories: string;
  changing_democracies_brings_you_their_wisdom: string;
  we_learnt: string;
  that_it_pays_to_move_beyond_historical_facts: string;
  that_democracy_is_never_finished: string;
  that_engaging_with_its_challenges_together_is_the_only_way_forward: string;
  dont_take_our_word_for_it_see_for_yourself: string;
};

export type Slide15AdditionalContent = {
  credits: string;
  script: string;
  visuals: string;
  development: string;
  music: string;
  Changing_Democracies: string;
  p1: string;
  p2: string;
};
