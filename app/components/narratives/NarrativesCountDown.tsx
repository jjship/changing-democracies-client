import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const NarrativesCountDown: FC<{
  onFinish: () => void;
}> = ({ onFinish }) => {
  const [count, setCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - ((count - 1) / 5) * circumference;

  const handleFinish = useCallback(() => {
    requestAnimationFrame(onFinish);
  }, [onFinish]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (count > 0 && !isPaused) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count === 0 && !isPaused) {
      handleFinish();
    }

    return () => clearTimeout(timer);
  }, [count, isPaused, handleFinish]);

  if (count === 0) return null;

  return (
    <div className="max-h-xs relative flex h-full w-full max-w-xs items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-1/3 w-1/3">
        <circle
          stroke="rgba(255, 0, 0, 0.2)"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          stroke="rgba(184,82,82)"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ease-in-out ${isPaused ? "opacity-50" : ""}`}
        />
        <circle
          stroke="rgba(184,82,82)"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray="5, 5"
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ease-in-out ${isPaused ? "opacity-50" : ""}`}
        />
      </svg>
      <span className={`absolute text-4xl text-red_mains ${isPaused ? "opacity-50" : ""}`}>
        {count}
      </span>
      <Button
        onClick={togglePause}
        size="icon"
        variant="secondary"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4"
        aria-label={isPaused ? "Resume countdown" : "Pause countdown"}
      >
        {isPaused ? (
          <Play className="h-4 w-4" />
        ) : (
          <Pause className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default NarrativesCountDown;