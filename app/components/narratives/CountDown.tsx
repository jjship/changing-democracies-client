import { FC, useCallback, useEffect, useState } from "react";

const CountDown: FC<{
  onFinish: () => void;
}> = ({ onFinish }) => {
  const [count, setCount] = useState<number>(5);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - ((count - 1) / 5) * circumference;

  const handleFinish = useCallback(() => {
    requestAnimationFrame(() => {
      onFinish();
    });
  }, [onFinish]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      handleFinish();
    }

    return () => clearTimeout(timer);
  }, [count, handleFinish]);

  if (count === 0) return null;

  return (
    <div className="max-h-xs flex h-full w-full max-w-xs items-center justify-center">
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
          className="transition-all duration-1000 ease-in-out"
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
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-4xl text-red_mains">{count}</span>
    </div>
  );
};

export default CountDown;
