import { Metadata } from "next";
import { CDLanguages } from "./i18n/languages";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetadata(
  config: SEOConfig,
  lang: CDLanguages,
  path: string = "",
): Metadata {
  const baseUrl = process.env.SITE_URL || "https://www.changingdemocracies.eu";
  const fullUrl = `${baseUrl}/${lang}${path}`;
  const defaultImage = `${baseUrl}/og-image.jpg`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: config.author || "Changing Democracies" }],
    creator: "Changing Democracies",
    publisher: "Changing Democracies",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${baseUrl}/en${path}`,
        fr: `${baseUrl}/fr${path}`,
        de: `${baseUrl}/de${path}`,
        es: `${baseUrl}/es${path}`,
        ca: `${baseUrl}/ca${path}`,
        cs: `${baseUrl}/cs${path}`,
        el: `${baseUrl}/el${path}`,
        hr: `${baseUrl}/hr${path}`,
        lt: `${baseUrl}/lt${path}`,
        nl: `${baseUrl}/nl${path}`,
        pl: `${baseUrl}/pl${path}`,
        pt: `${baseUrl}/pt${path}`,
        ro: `${baseUrl}/ro${path}`,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: "Changing Democracies",
      images: [
        {
          url: config.image || defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: lang,
      type: config.type || "website",
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.image || defaultImage],
      creator: "@changingdemocracies",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: {
    title: "Changing Democracies - Exploring Democratic Transitions in Europe",
    description:
      "Changing Democracies explores unknown stories about recent democratic transitions in Europe to grasp what's needed for democracy to fulfil its promises for everyone.",
    keywords:
      "democracy, Europe, democratic transitions, political science, research, education",
  },
  scrollDocumentary: {
    title: "Scroll Documentary - Changing Democracies",
    description:
      "Discover what we've learnt through our interactive scroll documentary about democratic transitions in Europe.",
    keywords:
      "documentary, democracy, Europe, interactive, democratic transitions",
  },
  narratives: {
    title: "Narratives - Changing Democracies",
    description:
      "Pick a topic and watch our selection of narratives about democratic transitions in Europe.",
    keywords: "narratives, democracy, Europe, stories, democratic transitions",
  },
  freeBrowsing: {
    title: "Free Browsing - Changing Democracies",
    description:
      "Use tags to explore the stories and discover untold narratives about democratic transitions.",
    keywords: "free browsing, democracy, Europe, tags, stories, exploration",
  },
  project: {
    title: "Project - Changing Democracies",
    description:
      "Learn about the Changing Democracies project and our mission to explore democratic transitions in Europe.",
    keywords: "project, democracy, Europe, research, democratic transitions",
  },
  team: {
    title: "Team - Changing Democracies",
    description:
      "Meet the team behind Changing Democracies and learn about our researchers and contributors.",
    keywords: "team, researchers, democracy, Europe, contributors",
  },
  contact: {
    title: "Contact - Changing Democracies",
    description:
      "Get in touch with the Changing Democracies team for questions, collaborations, or media inquiries.",
    keywords: "contact, democracy, Europe, collaboration, media",
  },
  educationalResources: {
    title: "Educational Resources - Changing Democracies",
    description:
      "Access educational materials and resources about democratic transitions in Europe.",
    keywords: "educational resources, democracy, Europe, learning materials",
  },
  researchPublication: {
    title: "Research Publication - Changing Democracies",
    description:
      "Explore our research publications and academic work on democratic transitions in Europe.",
    keywords: "research, publications, democracy, Europe, academic work",
  },
  travellingWorkshop: {
    title: "Travelling Workshop - Changing Democracies",
    description:
      "Join our travelling workshops to learn about democratic transitions and participate in discussions.",
    keywords: "workshops, democracy, Europe, travelling, discussions",
  },
};
