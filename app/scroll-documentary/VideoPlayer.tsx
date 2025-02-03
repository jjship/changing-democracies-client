import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import useAdaptiveQuality from "./useAdaptiveQuality";
import { VideoQuality, VideoSource } from "@/types/scrollDocumentary";
import { getOptimalQuality } from "./videoSource";
import { parseSubtitles } from "./subtitleParser";

interface VideoPlayerProps {
  videoSource: VideoSource;
  onEnded?: () => void;
  isPlaying?: boolean;
  className?: string;
  selectedLanguage: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoSource, onEnded, isPlaying, className, selectedLanguage }, ref) => {
    const [hls, setHls] = useState<Hls | null>(null);
    const [isUsingHLS, setIsUsingHLS] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
    const [subtitles, setSubtitles] = useState<
      Array<{ start: number; end: number; text: string }>
    >([]);
    const [subtitlesLoading, setSubtitlesLoading] = useState(true);
    const [subtitlesError, setSubtitlesError] = useState<string | null>(null);
    const { currentQuality, videoRef } = useAdaptiveQuality({
      initialQuality: getOptimalQuality(videoSource.availableQualities),
      qualities: videoSource.availableQualities.filter((q) =>
        isUsingHLS ? q.supportsHLS : !q.supportsHLS,
      ),
    });

    const handlePlayPause = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    };

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handlePause = () => setIsPaused(true);
      const handlePlay = () => setIsPaused(false);

      video.addEventListener("pause", handlePause);
      video.addEventListener("play", handlePlay);

      return () => {
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("play", handlePlay);
      };
    }, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (Hls.isSupported() && videoSource.hlsPlaylistUrl) {
        const hls = new Hls({
          maxMaxBufferLength: 30,
          maxBufferSize: 10 * 1000 * 1000, // 10MB
        });

        hls.loadSource(videoSource.hlsPlaylistUrl);
        hls.attachMedia(video);
        setHls(hls);
        setIsUsingHLS(true);

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari - native HLS support
        video.src = videoSource.hlsPlaylistUrl!;
        setIsUsingHLS(true);
      } else {
        // Fallback to MP4
        setIsUsingHLS(false);
      }
    }, [videoSource.hlsPlaylistUrl]);

    useEffect(() => {
      const fetchSubtitles = async () => {
        if (!videoSource.availableSubtitles) return;
        try {
          setSubtitlesLoading(true);
          setSubtitlesError(null);
          const response = await fetch(getSubtitleUrl(selectedLanguage));
          if (!response.ok) {
            console.warn(
              `Could not load ${selectedLanguage} subtitles. Status: ${response.status}`,
            );
            return;
          }
          const text = await response.text();
          const parsedSubtitles = parseSubtitles(text);
          setSubtitles(parsedSubtitles);
        } catch (error) {
          console.error("Error loading subtitles:", error);
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
      if (isUsingHLS) {
        return videoSource.hlsPlaylistUrl!;
      }
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
      <div className="group/video relative">
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
          onEnded={onEnded}
          onError={handleError}
          onLoadedData={handleLoadedData}
          crossOrigin="anonymous"
        >
          {!isUsingHLS && (
            <source src={getVideoUrl(currentQuality)} type="video/mp4" />
          )}
        </video>

        <Button
          onClick={handlePlayPause}
          size="icon"
          variant="secondary"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 hover:scale-110 group-hover/video:opacity-100"
        >
          {isPaused ? (
            <Play className="h-6 w-6" />
          ) : (
            <Pause className="h-6 w-6" />
          )}
        </Button>

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

        {/* Subtitle display */}
        {!subtitlesLoading && !subtitlesError && (
          <div className="absolute -bottom-16 left-1/2 w-full max-w-2xl -translate-x-1/2 rounded bg-black/80 p-4 text-center text-white">
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
