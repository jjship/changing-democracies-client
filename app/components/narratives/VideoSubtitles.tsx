import { FC, useEffect, useRef, useState } from "react";
import type { Subtitle } from "@/utils/subtitles/types";

interface VideoSubtitlesProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  subtitles: Subtitle[];
  isLoading: boolean;
  error: string | null;
}

export const VideoSubtitles: FC<VideoSubtitlesProps> = ({
  videoRef,
  subtitles,
  isLoading,
  error,
}) => {
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const currentSubRef = useRef<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || subtitles.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end,
      );

      const newSubtitleText = currentSub?.text || "";

      // Only update state if subtitle text has changed
      if (newSubtitleText !== currentSubRef.current) {
        currentSubRef.current = newSubtitleText;
        setCurrentSubtitle(newSubtitleText);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [subtitles, videoRef]);

  if (isLoading || error) return null;

  if (!currentSubtitle) return null;

  return (
    <div className="absolute bottom-20 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 rounded-md bg-black/60 p-4 text-center font-bold text-white">
      {currentSubtitle}
    </div>
  );
};

