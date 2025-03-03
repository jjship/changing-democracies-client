export { locales, getSubtitlesUrl, DEFAULT_LANGUAGE_LABEL, getInitialLanguage };
export type { CDLanguages };

const DEFAULT_LANGUAGE_LABEL = "en";

const languagesData = [
  { name: "Catalan", code: "ca" },
  { name: "Croatian", code: "hr" },
  { name: "Czech", code: "cs" },
  { name: "Dutch", code: "nl" },
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Greek", code: "el" },
  { name: "Lithuanian", code: "lt" },
  { name: "Polish", code: "pl" },
  { name: "Portuguese", code: "pt" },
  { name: "Romanian", code: "ro" },
  { name: "Spanish", code: "es" },
] as const;

const locales = languagesData.map((language) => language.code);

type CDLanguages = (typeof locales)[number];

// Helper function to get subtitle URL using the full languageCode
function getSubtitlesUrl(
  pullZoneUrl: string,
  videoId: string,
  languageCode: string,
): string {
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}.vtt`;
}

// Helper function to determine initial language based on various sources
// Order of precedence: localStorage > browser language > default language
function getInitialLanguage(): CDLanguages {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE_LABEL;
  }

  // Check localStorage first
  const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";
  const storedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);

  if (storedLanguage) {
    // Normalize the stored language code
    const normalizedLang = storedLanguage.toLowerCase() as CDLanguages;
    if (locales.includes(normalizedLang)) {
      return normalizedLang;
    }
  }

  // Try to match browser language
  try {
    const browserLang = navigator.language
      .split("-")[0]
      .toLowerCase() as CDLanguages;
    if (browserLang && locales.includes(browserLang)) {
      return browserLang;
    }
  } catch (error) {
    console.error("Error getting browser language:", error);
    // Continue to default if there's an error
  }

  // Default fallback
  return DEFAULT_LANGUAGE_LABEL;
}
