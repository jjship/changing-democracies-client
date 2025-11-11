"use client";
import { FC, useEffect, useMemo } from "react";
import { Box } from "@radix-ui/themes";
import { X } from "lucide-react";
import useAdaptiveQuality from "../scrollDocumentary/useAdaptiveQuality";
import { getOptimalQuality } from "../scrollDocumentary/videoSource";
import { useSubtitles } from "@/utils/subtitles/api";
import { useVideoPlayer } from "../narratives/hooks/useVideoPlayer";
import { VideoOverlay } from "../narratives/VideoOverlay";
import { VideoPlayPauseButton } from "../narratives/VideoPlayPauseButton";
import { useVideoBounds } from "../narratives/hooks/useVideoBounds";
import { VideoQuality } from "@/types/scrollDocumentary";
import { ClientFragment } from "@/utils/cdApi";
import { getHlsPlaylistUrl, getMp4Url } from "../films/videoUtils";

// Unified video source interface
interface UnifiedVideoSource {
  videoId: string;
  hlsPlaylistUrl?: string;
  pullZoneUrl?: string;
  availableQualities?: VideoQuality[];
  availableLanguageCodes?: Record<string, string>;
}

// Adapter to convert ClientFragment to UnifiedVideoSource
const adaptClientFragment = (fragment: ClientFragment): UnifiedVideoSource => {
  // Extract video ID from playerUrl
  // playerUrl format: https://vz-cac74041-8b3.b-cdn.net/{videoId}/...
  const videoIdMatch = fragment.playerUrl.match(/\/([^\/]+)\//);
  const videoId = videoIdMatch ? videoIdMatch[1] : fragment.id;

  return {
    videoId,
    hlsPlaylistUrl: getHlsPlaylistUrl(videoId),
    pullZoneUrl: "vz-cac74041-8b3",
    availableQualities: [
      { height: 1080, width: 1920, label: "1080p", supportsHLS: true },
      { height: 720, width: 1280, label: "720p", supportsHLS: true },
      { height: 480, width: 854, label: "480p", supportsHLS: true },
      { height: 360, width: 640, label: "360p", supportsHLS: true },
    ],
    availableLanguageCodes: { EN: "en" }, // Default, can be enhanced
  };
};

interface UnifiedVideoPlayerProps {
  // Video source - can be either a UnifiedVideoSource or ClientFragment
  videoSource: UnifiedVideoSource | ClientFragment;
  // Person/Country info
  personName?: string;
  countryName?: string;
  // Language code for subtitles
  languageCode?: string;
  // Playback state
  isPlaying: boolean;
  showSidePanel: boolean;
  onShowSidePanel: () => void;
  // Optional: on video end callback
  onVideoEnd?: () => void;
  // Optional: close button (for full-screen mode)
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const UnifiedVideoPlayer: FC<UnifiedVideoPlayerProps> = ({
  videoSource: rawVideoSource,
  personName,
  countryName,
  languageCode = "en",
  isPlaying,
  showSidePanel,
  onShowSidePanel,
  onVideoEnd,
  showCloseButton = false,
  onClose,
}) => {
  // Normalize video source
  const videoSource = useMemo(() => {
    // Check if it's a ClientFragment (has playerUrl)
    if ("playerUrl" in rawVideoSource) {
      return adaptClientFragment(rawVideoSource as ClientFragment);
    }
    return rawVideoSource as UnifiedVideoSource;
  }, [rawVideoSource]);

  // Initialize with all qualities, then filter based on HLS support
  const { currentQuality, videoRef } = useAdaptiveQuality({
    initialQuality: getOptimalQuality(videoSource.availableQualities ?? []),
    qualities: videoSource.availableQualities ?? [],
  });

  const { isPaused, isLoading, error, handlePlayPause } = useVideoPlayer({
    videoSource,
    videoRef,
    currentQuality,
    isPlaying,
    showSidePanel,
  });

  const videoBounds = useVideoBounds(videoRef);

  // Extract the language code for subtitles
  const langCode =
    (languageCode &&
      videoSource.availableLanguageCodes?.[languageCode.toUpperCase()]) ??
    languageCode.toLowerCase() ??
    "en";

  // Use the subtitles hook
  const {
    subtitles,
    isLoading: subtitlesLoading,
    error: subtitlesError,
  } = useSubtitles({
    fragmentId: videoSource.videoId,
    languageCode: langCode,
  });

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onVideoEnd) return;

    const handleEnded = () => onVideoEnd();
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onVideoEnd, videoRef]);

  if (!videoSource) return null;

  return (
    <div
      className="group/video relative h-full w-full max-w-full"
      style={{ aspectRatio: "16/9" }}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <video
          autoPlay={isPlaying}
          ref={videoRef}
          className="relative z-0 h-full w-full object-contain"
          playsInline
          crossOrigin="anonymous"
          onError={(e) => {
            const video = e.currentTarget;
            console.error("Video error:", video.error);
          }}
        />
        {videoBounds && (
          <div
            className="pointer-events-none absolute"
            style={{
              width: `${videoBounds.width}px`,
              height: `${videoBounds.height}px`,
              left: `${videoBounds.left}px`,
              top: `${videoBounds.top}px`,
            }}
          >
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className="pointer-events-auto absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 hover:text-yellow_secondary"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>
            )}

            {personName && countryName && (
              <Box
                onClick={onShowSidePanel}
                className="w-18 pointer-events-auto absolute left-2 top-2 z-30 border-[3px] border-turquoise p-2 text-turquoise hover:cursor-pointer hover:bg-[#00000080] sm:left-4 sm:top-4 sm:p-3 md:left-8 md:top-8 md:p-4 lg:left-12 lg:top-12"
              >
                <p>{personName},</p>
                <p>{countryName}</p>
              </Box>
            )}

            <VideoPlayPauseButton
              isPaused={isPaused}
              isPlaying={isPlaying}
              onToggle={handlePlayPause}
            />

            <VideoOverlay
              videoRef={videoRef}
              isLoading={isLoading}
              error={error}
              subtitles={subtitles}
              subtitlesLoading={subtitlesLoading}
              subtitlesError={subtitlesError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

