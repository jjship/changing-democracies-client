/**
 * Generates the HLS playlist URL for a video
 */
export function getHlsPlaylistUrl(videoId: string): string {
  const pullZoneUrl = "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/playlist.m3u8`;
}
