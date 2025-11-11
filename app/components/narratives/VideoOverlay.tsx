import { FC } from "react";
import { VideoSubtitles } from "./VideoSubtitles";
import type { Subtitle } from "@/utils/subtitles/types";

interface VideoOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoading: boolean;
  error: string | null;
  subtitles: Subtitle[];
  subtitlesLoading: boolean;
  subtitlesError: string | null;
}

export const VideoOverlay: FC<VideoOverlayProps> = ({
  videoRef,
  isLoading,
  error,
  subtitles,
  subtitlesLoading,
  subtitlesError,
}) => {
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      <VideoSubtitles
        videoRef={videoRef}
        subtitles={subtitles}
        isLoading={subtitlesLoading}
        error={subtitlesError}
      />

      {subtitlesError && (
        <div className="absolute bottom-16 left-1/2 z-20 w-full max-w-xl -translate-x-1/2 rounded bg-red-500/80 p-4 text-center text-white">
          {subtitlesError}
        </div>
      )}
    </>
  );
};

