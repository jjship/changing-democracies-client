import React, { FC, useEffect, useState } from "react";

export { CountDown };

const CountDown: FC<{
  onFinish: () => void;
}> = ({ onFinish }) => {
  const [count, setCount] = useState<number>(5);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - ((count - 1) / 5) * circumference;

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

  return (
    <div className="max-h-xs flex h-full w-full max-w-xs items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-1/2 w-1/2">
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