import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { forwardRef, useEffect, useState, useRef } from "react";
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
  selectedLanguageCode?: string;
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
    const containerRef = useRef<HTMLDivElement>(null);

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
          // Prevent automatic level switching by starting with high quality
          startLevel: 3,
          // Configuration for stable quality
          autoStartLoad: true,
          abrEwmaDefaultEstimate: 5000000,
          abrMaxWithRealBitrate: true,
          // Disable debug logs
          debug: false,
        });

        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          // Force highest quality level to prevent resizing
          const maxLevel = Math.max(0, data.levels.length - 1);
          hls.currentLevel = maxLevel;
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
      handleTimeUpdate();

      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [subtitles, speakers, videoRef]);

    useEffect(() => {
      setCurrentSubtitle("");
      setCurrentSpeaker("");
    }, [videoSource]);

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
      <div
        ref={containerRef}
        className="relative mx-auto flex h-full items-center justify-center"
      >
        <div className="relative h-auto w-auto">
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
            aria-label="video player"
          >
            {!isUsingHLS && (
              <source src={getVideoUrl(currentQuality)} type="video/mp4" />
            )}
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

          {!subtitlesLoading && !subtitlesError && currentSubtitle && (
            <div
              className={`absolute bottom-0 left-0 right-0 z-10 px-3 py-2 text-center font-bold ${
                pageTheme.pageBg === "bg-pink_scroll"
                  ? "bg-yellow_secondary bg-opacity-70"
                  : pageTheme.pageBg === "bg-black_bg"
                  ? "bg-darkRed bg-opacity-70"
                  : "bg-yellow_secondary bg-opacity-70"
              } ${pageTheme.subtitleColor}`}
              aria-label="video subtitle"
            >
              {currentSubtitle}
            </div>
          )}

          {isPlaying && currentSpeaker && (
            <div
              key={currentSpeaker}
              className={`absolute bottom-0 left-1/2  mx-auto -translate-x-1/2 translate-y-full transform px-3 py-2 text-center font-bold ${pageTheme.speakersColor}`}
              aria-label="video speaker"
            >
              {currentSpeaker}
            </div>
          )}

          {subtitlesError && (
            <div className="absolute bottom-16 left-0 right-0 mx-auto w-full max-w-xl rounded bg-red-500/80 p-4 text-center text-white">
              {subtitlesError}
            </div>
          )}
        </div>
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
