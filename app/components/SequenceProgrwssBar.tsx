import React, { memo } from "react";
import { Flex } from "@radix-ui/themes";

type SequenceProgressBarProps = {
  totalFragments: number;
  currentFragmentIndex: number;
  onFragmentSelect: (index: number) => void;
};

const SequenceProgressBar = memo(
  ({
    totalFragments,
    currentFragmentIndex,
    onFragmentSelect,
  }: SequenceProgressBarProps) => {
    const dotSize = 12;
    const segmentWidth = 100 / (totalFragments - 1) - dotSize / 100; // Adjusted to ensure visibility

    return (
      <Flex
        justify="between"
        align="center"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0",
          right: "0",
          width: "60%",
          height: "20px",
          backgroundColor: "transparent",
          borderRadius: "5px",
          margin: "auto",
        }}
      >
        {Array.from({ length: totalFragments }).map((_, index) => (
          <Flex key={index}>
            <div
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: "50%",
                backgroundColor:
                  index === currentFragmentIndex
                    ? "#FFD700"
                    : index < currentFragmentIndex
                    ? "#B85252"
                    : "#54534D",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                zIndex: 1,
              }}
              onClick={() => onFragmentSelect(index)}
            />
            {index < totalFragments - 1 && (
              <div
                style={{
                  height: "2px",
                  flex: `1 0 calc(${segmentWidth}% - ${dotSize / 2}px)`,
                  backgroundColor:
                    index < currentFragmentIndex ? "#B85252" : "transparent", // Transparent placeholder
                  transition: "background-color 0.3s ease",
                }}
              />
            )}
          </Flex>
        ))}
      </Flex>
    );
  },
);

SequenceProgressBar.displayName = "SequenceProgressBar";

export default SequenceProgressBar;
