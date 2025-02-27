import { FC } from "react";

const Ouroboros: FC = () => {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      <path
        id="donutPath"
        d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
        className="fill-none stroke-darkRed"
        strokeWidth="40"
      />

      <defs>
        <marker
          id="arrowhead"
          markerWidth="12"
          markerHeight="10"
          refX="6"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 7 5, 0 10" className="fill-yellow_secondary" />
        </marker>
      </defs>

      <path
        id="motionPath"
        d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
        className="fill-none stroke-none"
      >
        <animateMotion
          id="animation"
          dur="3s"
          begin="0s"
          repeatCount="indefinite"
          rotate="auto"
        >
          <mpath href="#motionPath" />
        </animateMotion>
      </path>

      <path d="M -40,0 L 40,0" strokeWidth="8" markerEnd="url(#arrowhead)">
        <animateMotion
          dur="3s"
          begin="0s"
          repeatCount="indefinite"
          rotate="auto"
        >
          <mpath href="#motionPath" />
        </animateMotion>
      </path>
    </svg>
  );
};

export default Ouroboros;
