"use client";
import React, { memo } from "react";
import { Box, Flex } from "@radix-ui/themes";

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

    return (
      <Flex
        justify="between"
        align="center"
        style={{
          position: "fixed", // Changed to fixed to ensure it stays at the bottom
          bottom: "12vh", // Adjusted bottom position
          left: "50%",
          transform: "translateX(-50%)", // Center the element horizontally
          width: "80%",
          height: "40px",
          backgroundColor: "transparent",
          borderRadius: "5px",
          zIndex: 10, // Ensure it's above other content
          overflow: "visible", // Allow dots to overflow if needed
          maxWidth: "1200px", // Prevent too wide on large screens
        }}
      >
        {Array.from({ length: totalFragments }).map((_, index) => (
          <Flex
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              position: "relative", // Added for better positioning control
            }}
          >
            <Box
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: "50%",
                backgroundColor:
                  index === currentFragmentIndex
                    ? "#6bdbc6"
                    : index < currentFragmentIndex
                    ? "#b85252"
                    : "#808881",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                zIndex: 1,
              }}
              onClick={() => onFragmentSelect(index)}
            />
            {index < totalFragments - 1 && (
              <Box
                style={{
                  height: "4px",
                  flex: 1,
                  borderRadius: "3px",
                  backgroundColor:
                    index < currentFragmentIndex ? "#808881" : "transparent",
                  transition: "background-color 0.3s ease",
                  margin: "0 4px",
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
