// SequenceProgressBar.tsx
import React from "react";
import { Flex } from "@radix-ui/themes";

interface SequenceProgressBarProps {
  totalFragments: number;
  currentFragmentIndex: number;
}

const SequenceProgressBar: React.FC<SequenceProgressBarProps> = ({
  totalFragments,
  currentFragmentIndex,
}) => {
  console.log("SequenceProgressBar props:", {
    totalFragments,
    currentFragmentIndex,
  });

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        position: "absolute",
        top: "20px",
        left: "0",
        right: "0",
        zIndex: 300,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      {Array.from({ length: totalFragments }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor:
                index <= currentFragmentIndex ? "#FF4136" : "#0074D9",
              margin: "0 5px",
              transition: "background-color 0.3s ease",
            }}
          />
          {index < totalFragments - 1 && index < currentFragmentIndex && (
            <div
              style={{
                width: "20px",
                height: "2px",
                backgroundColor: "#FF4136",
                margin: "0 5px",
                transition: "opacity 0.3s ease",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default SequenceProgressBar;
