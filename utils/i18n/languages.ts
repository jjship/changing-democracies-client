export type Language = {
  languageCode: string; // e.g., 'en-auto' or 'en' - used for CDN URL
  label: string; // e.g., 'EN' - used for identification and display
};

export const DEFAULT_LANGUAGE_LABEL = "EN";

export function getBrowserLanguage(
  acceptLanguageHeader: string | null,
): string {
  if (!acceptLanguageHeader) return DEFAULT_LANGUAGE_LABEL;

  // Get first preferred language code and convert to uppercase
  const browserLocale = acceptLanguageHeader
    .split(",")[0]
    .trim()
    .split(";")[0]
    .split("-")[0]
    .toUpperCase();

  return browserLocale;
}

// Helper function to get subtitle URL using the full languageCode
export function getSubtitlesUrl(
  pullZoneUrl: string,
  videoId: string,
  languageCode: string,
): string {
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}.vtt`;
}
