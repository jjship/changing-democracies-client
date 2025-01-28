// components/VideoPlayer.tsx
import { forwardRef, useEffect, useState } from "react";
import useAdaptiveQuality from "./useAdaptiveQuality";
import { VideoQuality, VideoSource } from "@/types/scrollDocumentary";

interface VideoPlayerProps {
  videoSource: VideoSource;
  onEnded?: () => void;
  isPlaying?: boolean;
  className?: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoSource, onEnded, isPlaying, className }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
    const [subtitles, setSubtitles] = useState<
      Array<{ start: number; end: number; text: string }>
    >([]);
    const [subtitlesLoading, setSubtitlesLoading] = useState(true);
    const [subtitlesError, setSubtitlesError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState(
      videoSource.availableSubtitles[0]?.languageCode,
    );

    const { currentQuality, videoRef } = useAdaptiveQuality({
      initialQuality:
        videoSource.availableQualities.find((q) => q.height === 720) ||
        videoSource.availableQualities[0],
      qualities: videoSource.availableQualities,
    });

    useEffect(() => {
      const fetchSubtitles = async () => {
        try {
          setSubtitlesLoading(true);
          setSubtitlesError(null);
          const response = await fetch(getSubtitleUrl(selectedLanguage));

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          const parsedSubtitles = parseSubtitles(text);
          setSubtitles(parsedSubtitles);
        } catch (error) {
          console.error("Error loading subtitles:", error);
          setSubtitlesError(
            error instanceof Error ? error.message : "Failed to load subtitles",
          );
        } finally {
          setSubtitlesLoading(false);
        }
      };

      fetchSubtitles();
    }, [selectedLanguage]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        const currentSub = subtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end,
        );
        setCurrentSubtitle(currentSub?.text || "");
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [subtitles]);

    const getVideoUrl = (quality: VideoQuality) => {
      return `https://${videoSource.pullZoneUrl}.b-cdn.net/${videoSource.videoId}/play_${quality.height}p.mp4`;
    };

    const getSubtitleUrl = (languageCode: string) => {
      return `https://${videoSource.pullZoneUrl}.b-cdn.net/${videoSource.videoId}/captions/${languageCode}.vtt`;
    };

    const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = e.currentTarget;
      setError(`Video error: ${video.error?.message || "Unknown error"}`);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    return (
      <div className="relative">
        <video
          ref={(element) => {
            videoRef.current = element;
            if (typeof ref === "function") {
              ref(element);
            } else if (ref) {
              ref.current = element;
            }
          }}
          className={className}
          playsInline
          muted
          onEnded={onEnded}
          onError={handleError}
          onLoadedData={handleLoadedData}
          crossOrigin="anonymous"
        >
          <source src={getVideoUrl(currentQuality)} type="video/mp4" />
        </video>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">Loading...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="absolute right-4 top-4 rounded bg-black/80 px-2 py-1 text-sm text-white">
            {currentQuality.label}
          </div>
        )}

        {/* Subtitle controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <select
            className="rounded bg-black/80 px-2 py-1 text-sm text-white"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {videoSource.availableSubtitles.map((track) => (
              <option key={track.languageCode} value={track.languageCode}>
                {track.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subtitle display */}
        {!subtitlesLoading && !subtitlesError && (
          <div className="absolute bottom-16 left-1/2 w-full max-w-2xl -translate-x-1/2 rounded bg-black/80 p-4 text-center text-white">
            {currentSubtitle}
          </div>
        )}

        {subtitlesError && (
          <div className="absolute bottom-16 left-1/2 w-full max-w-2xl -translate-x-1/2 rounded bg-red-500/80 p-4 text-center text-white">
            {subtitlesError}
          </div>
        )}
      </div>
    );
  },
);

export default VideoPlayer;
