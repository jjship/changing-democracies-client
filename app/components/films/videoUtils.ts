export interface VideoQuality {
  height: number;
  width: number;
  label: string;
  supportsHLS: boolean;
}

// Default video qualities that will be used if not specified
export const DEFAULT_QUALITIES: VideoQuality[] = [
  {
    height: 1080,
    width: 1920,
    label: "1080p",
    supportsHLS: true,
  },
  {
    height: 720,
    width: 1280,
    label: "720p",
    supportsHLS: true,
  },
  {
    height: 480,
    width: 854,
    label: "480p",
    supportsHLS: true,
  },
  {
    height: 360,
    width: 640,
    label: "360p",
    supportsHLS: true,
  },
  {
    height: 240,
    width: 426,
    label: "240p",
    supportsHLS: true,
  },
];

/**
 * Determines the optimal quality based on screen size and network conditions
 */
export function getOptimalQuality(
  qualities: VideoQuality[],
  connection?: { effectiveType?: string; downlink?: number },
): VideoQuality {
  if (!qualities.length) {
    return DEFAULT_QUALITIES[1]; // Default to 720p
  }

  const screenHeight =
    typeof window !== "undefined" ? window.screen.height : 1080;

  const suitableQualities = qualities.filter((q) => q.height <= screenHeight);

  if (!suitableQualities.length) {
    return qualities[0]; // Fallback to highest quality
  }

  if (connection) {
    const { effectiveType, downlink } = connection;

    // Conservative quality selection based on connection
    if (effectiveType === "slow-2g" || effectiveType === "2g") {
      return suitableQualities[suitableQualities.length - 1]; // Lowest quality
    }

    if (effectiveType === "3g" || (downlink && downlink < 1.5)) {
      return (
        suitableQualities.find((q) => q.height <= 480) ||
        suitableQualities[suitableQualities.length - 1]
      );
    }

    if (effectiveType === "4g" || (downlink && downlink >= 1.5)) {
      return (
        suitableQualities.find((q) => q.height <= 720) || suitableQualities[0]
      );
    }
  }

  return suitableQualities.find((q) => q.height <= 720) || suitableQualities[0];
}

/**
 * Generates the HLS playlist URL for a video
 */
export function getHlsPlaylistUrl(videoId: string): string {
  const pullZoneUrl = "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/playlist.m3u8`;
}

/**
 * Generates the MP4 URL for a video with a specific quality
 */
export function getMp4Url(videoId: string, quality: VideoQuality): string {
  const pullZoneUrl = "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/play_play_${quality.height}p.mp4`;
}
