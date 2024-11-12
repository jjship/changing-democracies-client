import React, { useEffect, useState } from "react";

interface CounterProps {
  isCounting: (counting: boolean) => void; // Prop type for the callback
}

const Counter: React.FC<CounterProps> = ({ isCounting }) => {
  const [count, setCount] = useState<number>(3);
  const radius = 40; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the offset for the stroke dash
  const offset = circumference - (count / 3) * circumference;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0; // Set count to 0
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (count === 0) {
      isCounting(true); // Notify parent that counting has finished
    }
  }, [count, isCounting]); // Add isCounting to dependencies

  return (
    <div className="relative flex h-screen items-center justify-center">
      <svg
        width="50%"
        height="50%"
        viewBox="0 0 100 100"
        className="max-h-xs max-w-xs"
      >
        {/* Background Circle */}
        <circle
          stroke="rgba(255, 0, 0, 0.2)" // Light background color
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Countdown Circle (Solid) */}
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
        {/* Dashed Segment */}
        <circle
          stroke="red"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray="5, 5" // Creates the dashed effect
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-4xl text-red-500">{count}</span>
    </div>
  );
};

export default Counter;
