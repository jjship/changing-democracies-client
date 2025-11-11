import { FC, useEffect, useRef, useState } from "react";

interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoProgressBar: FC<VideoProgressBarProps> = ({ videoRef }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!isDragging && video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration) {
        setDuration(video.duration);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef, isDragging]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !video.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;

    video.currentTime = Math.max(0, Math.min(newTime, video.duration));
    setProgress(percentage * 100);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !video.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(clickX / rect.width, 1));
    const newTime = percentage * video.duration;

    video.currentTime = newTime;
    setProgress(percentage * 100);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = videoRef.current?.currentTime || 0;

  return (
    <div className="pointer-events-auto absolute bottom-2 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 px-4">
      <div
        ref={progressBarRef}
        className="group relative h-2 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-3"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-white/60 transition-all group-hover:bg-white/80"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-white/80">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

