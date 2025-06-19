export { locales, getSubtitlesUrl, DEFAULT_CD_LANG };
export type { CDLanguages };

const DEFAULT_CD_LANG = "en";

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
  videoId: string,
  languageCode: string,
  suffix: string = "",
): string {
  // Use provided pullZoneUrl or fall back to the environment variable
  const pullZoneUrl =
    process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE || "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}${suffix}.vtt`;
}
