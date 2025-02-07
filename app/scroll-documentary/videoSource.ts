import {
  VideoQuality,
  VideoSource,
  VideoSourceResponse,
} from "@/types/scrollDocumentary";
import { VideoDbEntry } from "../../types/videosAndFilms";

if (!process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE)
  throw new Error("Missing Bunny Stream environment variables");

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
  "1080": "1080p",
  "720": "720p",
  "480": "480p",
  "360": "360p",
  "240": "240p",
};

export function isHLSSupported(): boolean {
  if (typeof window === "undefined") return false;

  const video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl") !== "";
}

export function serializeVideoSource(video: VideoDbEntry): VideoSource {
  if (!process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE)
    throw new Error("Missing Bunny Stream environment variables");
  const pullZoneUrl = process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE;
  const videoId = video.guid;
  try {
    const availableQualities: VideoQuality[] = (
      video.availableResolutions.split(",") || []
    )
      .map((resolution) => {
        const height = parseInt(resolution);
        return {
          height,
          label: QUALITY_LABELS[resolution] || `${height}p`,
          // HLS is supported for all qualities, MP4 only up to 720p
          supportsHLS: true,
        };
      })
      .sort((a, b) => b.height - a.height); // Sort by height descending

    const mp4Qualities = availableQualities
      .filter((q) => q.height < 720)
      .map((q) => ({
        ...q,
        supportsHLS: false,
      }));

    const availableSubtitles =
      video.captions.length > 0
        ? video.captions
            .map((caption) => ({
              languageCode: caption.srclang,
              label: caption.label,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : undefined;

    const thumbnail = video.thumbnailFileName
      ? `https://${pullZoneUrl}.b-cdn.net/${videoId}/${video.thumbnailFileName}`
      : undefined;

    return {
      videoId: video.guid,
      pullZoneUrl,
      availableQualities: isHLSSupported() ? availableQualities : mp4Qualities,
      availableSubtitles,
      hlsPlaylistUrl: `https://${pullZoneUrl}.b-cdn.net/${videoId}/playlist.m3u8`,
      title: video.title,
      duration: video.length,
      thumbnail,
    };
  } catch (error) {
    if (error instanceof VideoSourceError) {
      throw error;
    }

    throw new VideoSourceError(
      "Failed to serialize video source",
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

export function validateVideoSource(videoSource: VideoSource): boolean {
  return (
    typeof videoSource.videoId === "string" &&
    typeof videoSource.pullZoneUrl === "string" &&
    Array.isArray(videoSource.availableQualities) &&
    videoSource.availableQualities.length > 0 &&
    Array.isArray(videoSource.availableSubtitles)
  );
}

export function getOptimalQuality(
  qualities: VideoQuality[],
  connection?: { effectiveType?: string; downlink?: number },
): VideoQuality {
  if (!qualities.length) {
    throw new Error("No qualities available");
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
