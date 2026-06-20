import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface VideoPlayPauseButtonProps {
  isPaused: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

export const VideoPlayPauseButton: FC<VideoPlayPauseButtonProps> = ({
  isPaused,
  isPlaying,
  onToggle,
}) => {
  if (!isPlaying) return null;

  return (
    <Button
      onClick={onToggle}
      size="icon"
      variant="secondary"
      className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 hover:scale-110 group-hover/video:opacity-100"
    >
      {isPaused ? (
        <Play className="h-6 w-6" />
      ) : (
        <Pause className="h-6 w-6" />
      )}
    </Button>
  );
};

