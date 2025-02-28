export { locales, getSubtitlesUrl, DEFAULT_LANGUAGE_LABEL };
export type { Locale };

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

type Locale = (typeof locales)[number];

// Helper function to get subtitle URL using the full languageCode
function getSubtitlesUrl(
  pullZoneUrl: string,
  videoId: string,
  languageCode: string,
): string {
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}.vtt`;
}
