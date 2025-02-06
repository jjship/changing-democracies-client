import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import useAdaptiveQuality from "./useAdaptiveQuality";
import { VideoQuality, VideoSource } from "@/types/scrollDocumentary";
import { getOptimalQuality } from "./videoSource";
import useSubtitles from "./useSubtitles";
import { PageTheme, Subtitle } from "./slides/slides";

interface VideoPlayerProps {
  videoSource: VideoSource;
  onEnded?: () => void;
  isPlaying?: boolean;
  className?: string;
  selectedLanguageCode: string;
  pageTheme: PageTheme;
  speakers: Subtitle[];
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      videoSource,
      onEnded,
      isPlaying,
      className,
      selectedLanguageCode,
      pageTheme,
      speakers,
    },
    ref,
  ) => {
    const [hls, setHls] = useState<Hls | null>(null);
    const [isUsingHLS, setIsUsingHLS] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
    const [currentSpeaker, setCurrentSpeaker] = useState<string>("");
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
    }, [videoRef]);

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
    }, [videoSource.hlsPlaylistUrl, videoRef]);

    const {
      subtitles,
      isLoading: subtitlesLoading,
      error: subtitlesError,
    } = useSubtitles(videoSource, selectedLanguageCode);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        const currentSub = subtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end,
        );
        setCurrentSubtitle(currentSub?.text || "");

        const currentSpeakerSub = speakers.find(
          (speaker) =>
            currentTime >= speaker.start && currentTime <= speaker.end,
        );
        setCurrentSpeaker(currentSpeakerSub?.text || "");
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [subtitles, speakers, videoRef, currentSpeaker]);

    const getVideoUrl = (quality: VideoQuality) => {
      if (isUsingHLS) {
        return videoSource.hlsPlaylistUrl!;
      }
      return `https://${videoSource.pullZoneUrl}.b-cdn.net/${videoSource.videoId}/play_${quality.height}p.mp4`;
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

        {/* Speaker display */}
        {isPlaying && currentSpeaker && (
          <div
            key={currentSpeaker}
            className={`fixed bottom-28 left-1/2  max-w-2xl -translate-x-1/2 px-3 py-2 text-center font-bold ${pageTheme.speakersColor}`}
          >
            {currentSpeaker}
          </div>
        )}

        {/* Subtitle display */}
        {!subtitlesLoading && !subtitlesError && (
          <div
            className={`fixed bottom-2 left-1/2 w-full max-w-2xl -translate-x-1/2 p-4 text-center font-bold italic ${pageTheme.subtitleColor}`}
          >
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

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
