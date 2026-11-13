import Hls from "hls.js";
import { RefObject, useEffect, useState } from "react";
import { VideoSource } from "@/types/scrollDocumentary";
import { PageTheme, Speaker, getSpeakerText } from "./slides/slides";
import { useSubtitles } from "@/utils/subtitles/api";

interface VideoPlayerProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSource: VideoSource;
  onEnded: () => void;
  isPlaying: boolean;
  selectedLanguageCode: string;
  pageTheme: PageTheme;
  speakers: Speaker[];
}

export function VideoPlayer({
  videoRef,
  videoSource,
  onEnded,
  isPlaying,
  selectedLanguageCode,
  pageTheme,
  speakers,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { hlsPlaylistUrl } = videoSource;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hlsPlaylistUrl) return;

    if (!Hls.isSupported()) {
      // Safari plays HLS natively
      video.src = hlsPlaylistUrl;
      return;
    }

    const hls = new Hls({
      maxMaxBufferLength: 30,
      maxBufferSize: 10 * 1000 * 1000,
      startLevel: 3,
      abrEwmaDefaultEstimate: 5000000,
      abrMaxWithRealBitrate: true,
    });

    // Pin the highest level so the video doesn't resize mid-playback
    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      hls.currentLevel = Math.max(0, data.levels.length - 1);
    });

    hls.loadSource(hlsPlaylistUrl);
    hls.attachMedia(video);

    return () => hls.destroy();
  }, [hlsPlaylistUrl, videoRef]);

  const {
    subtitles,
    isLoading: subtitlesLoading,
    error: subtitlesError,
  } = useSubtitles({
    fragmentId: videoSource.videoId,
    languageCode: selectedLanguageCode,
  });

  const isCurrent = ({ start, end }: { start: number; end: number }) =>
    currentTime >= start && currentTime <= end;
  const currentSubtitle = subtitles.find(isCurrent)?.text;
  const currentSpeaker = getSpeakerText(speakers.find(isCurrent));

  return (
    <div className="relative mx-auto flex h-full items-center justify-center">
      <div className="relative h-auto w-auto">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          playsInline
          onEnded={onEnded}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onError={(e) => {
            setError(
              `Video error: ${
                e.currentTarget.error?.message || "Unknown error"
              }`,
            );
            setIsLoading(false);
          }}
          onLoadedData={() => setIsLoading(false)}
          crossOrigin="anonymous"
          aria-label="video player"
        />

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
            className={`absolute bottom-0 left-0 right-0 z-10 px-3 py-2 text-center font-bold xl:text-2xl mobile:px-2 mobile:py-1 mobile:text-[clamp(0.7rem,3.2vw,0.95rem)] mobile:leading-snug ${pageTheme.subtitleBg} ${pageTheme.subtitleColor}`}
            aria-label="video subtitle"
          >
            {currentSubtitle}
          </div>
        )}

        {isPlaying && currentSpeaker && (
          <div
            key={currentSpeaker}
            className={`absolute bottom-0 left-1/2  mx-auto -translate-x-1/2 translate-y-full transform px-3 py-2 text-center font-bold mobile:whitespace-nowrap mobile:py-1 mobile:text-xs ${pageTheme.speakersColor}`}
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
}
