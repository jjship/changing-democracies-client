// utils/videoSource.ts
import {
  VideoQuality,
  SubtitleTrack,
  VideoSource,
  VideoSourceResponse,
} from "@/types/scrollDocumentary";

export class VideoSourceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any,
  ) {
    super(message);
    this.name = "VideoSourceError";
  }
}

const QUALITY_LABELS: Record<string, string> = {
  "2160": "4K",
  "1440": "2K",
  "1080": "1080p",
  "720": "720p",
  "480": "480p",
  "360": "360p",
  "240": "240p",
};

export async function fetchVideoSource(
  videoId: string,
  pullZoneUrl: string,
  apiKey: string,
): Promise<VideoSource> {
  try {
    // Fetch video details from Bunny CDN API
    const response = await fetch(
      `https://video.bunnycdn.com/library/${process.env.NEXT_PUBLIC_VIDEO_LIBRARY_ID}/videos/${videoId}`,
      {
        headers: {
          Accept: "application/json",
          AccessKey: apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new VideoSourceError(
        `Failed to fetch video source: ${response.statusText}`,
        response.status,
      );
    }

    const data: VideoSourceResponse = await response.json();

    if (!data.success || !data.data) {
      throw new VideoSourceError(
        data.message || "Invalid response from video API",
        data.statusCode,
      );
    }

    // Parse available qualities
    const availableQualities: VideoQuality[] = (data.data.resolutions || [])
      .map((resolution) => {
        const height = parseInt(resolution);
        return {
          height,
          label: QUALITY_LABELS[resolution] || `${height}p`,
        };
      })
      .sort((a, b) => b.height - a.height); // Sort by height descending

    // Parse available subtitles
    const availableSubtitles: SubtitleTrack[] = (data.data.captions || [])
      .map((caption) => ({
        languageCode: caption.srclang,
        label: caption.label,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

    // Construct thumbnail URL if available
    const thumbnail = data.data.thumbnailFileName
      ? `https://${pullZoneUrl}.b-cdn.net/${videoId}/${data.data.thumbnailFileName}`
      : undefined;

    // Construct and return the VideoSource object
    const videoSource: VideoSource = {
      videoId,
      pullZoneUrl,
      availableQualities,
      availableSubtitles,
      title: data.data.title,
      duration: data.data.length,
      thumbnail,
    };

    return videoSource;
  } catch (error) {
    if (error instanceof VideoSourceError) {
      throw error;
    }

    throw new VideoSourceError(
      "Failed to fetch video source",
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

// Utility function to validate video source
export function validateVideoSource(videoSource: VideoSource): boolean {
  return (
    typeof videoSource.videoId === "string" &&
    typeof videoSource.pullZoneUrl === "string" &&
    Array.isArray(videoSource.availableQualities) &&
    videoSource.availableQualities.length > 0 &&
    Array.isArray(videoSource.availableSubtitles)
  );
}

// Helper function to get optimal quality based on screen size and network
export function getOptimalQuality(
  qualities: VideoQuality[],
  connection?: { effectiveType?: string; downlink?: number },
): VideoQuality {
  if (!qualities.length) {
    throw new Error("No qualities available");
  }

  // Get screen height
  const screenHeight =
    typeof window !== "undefined" ? window.screen.height : 1080;

  // Filter qualities based on screen height
  const suitableQualities = qualities.filter((q) => q.height <= screenHeight);

  if (!suitableQualities.length) {
    return qualities[0]; // Fallback to highest quality
  }

  // If we have connection info, use it to determine quality
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

  // Default to 720p or the closest available quality
  return suitableQualities.find((q) => q.height <= 720) || suitableQualities[0];
}
