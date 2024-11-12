import React, { useEffect, useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const radius = 40; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the offset for the stroke dash
  const offset = circumference - (count / 3) * circumference;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer); // Clear interval when count reaches 0
          return 0; // Set count to 0
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="z-5 flex h-screen items-center justify-center">
      <svg width="100" height="100">
        <circle
          stroke="rgba(187, 132, 132, 0.2)"
          // Light background color
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          stroke="#b85252"
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
          stroke="#b85252"
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
      <span className="absolute text-4xl text-[#b85252]">{count}</span>
    </div>
  );
};

export default Counter;
