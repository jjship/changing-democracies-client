import React, { useEffect, useState } from "react";

interface CountdownProps {
  isCounting: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: () => void;
}

export default function Countdown({ isCounting, onFinish }: CountdownProps) {
  const [count, setCount] = useState<number>(3);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (count / 3) * circumference;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  useEffect(() => {
    if (count === 0) {
      isCounting(false);
    }
  }, [count, isCounting]);

  return (
    <div className="relative flex h-screen items-center justify-center">
      <svg
        width="50%"
        height="50%"
        viewBox="0 0 100 100"
        className="max-h-xs max-w-xs"
      >
        <circle
          stroke="rgba(255, 0, 0, 0.2)"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          stroke="red"
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
          stroke="red"
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
      <span className="absolute text-4xl text-red-500">{count}</span>
    </div>
  );
}
