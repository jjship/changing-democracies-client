// Helper function to get subtitle URL using the full languageCode
export function getSubtitlesUrl(
  videoId: string,
  languageCode: string,
  suffix: string = "",
): string {
  // Use provided pullZoneUrl or fall back to the environment variable
  const pullZoneUrl =
    process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE || "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}${suffix}.vtt`;
}
