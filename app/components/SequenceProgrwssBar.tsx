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
    const dotSize = 16; // Zwiększona wielkość kropek
    const lineThickness = 6; // Zwiększona grubość linii

    return (
      <Flex
        justify="between"
        align="center"
        style={{
          position: "fixed",
          bottom: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "40px",
          backgroundColor: "transparent",
          borderRadius: "5px",
          zIndex: 10,
          overflow: "visible",
          maxWidth: "1200px",
        }}
      >
        {Array.from({ length: totalFragments }).map((_, index) => (
          <Flex
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              position: "relative",
            }}
          >
            {index < totalFragments - 1 && (
              <Box
                style={{
                  height: `${lineThickness}px`,
                  width: `calc(100% + ${dotSize}px)`,
                  position: "absolute",
                  top: `${dotSize / 2 - lineThickness / 2}px`, // Wyśrodkowanie linii
                  left: `calc(-${dotSize / 50}px)`, // Wyrównanie linii względem środka kropek
                  backgroundColor:
                    index < currentFragmentIndex ? "#808881" : "transparent",
                  transition: "background-color 0.3s ease",
                  zIndex: 0, // Linie za kropkami
                }}
              />
            )}
            <Box
              style={{
                width:
                  index === currentFragmentIndex
                    ? `${dotSize * 1.3}px`
                    : `${dotSize}px`,
                height:
                  index === currentFragmentIndex
                    ? `${dotSize * 1.3}px`
                    : `${dotSize}px`,
                borderRadius: "50%",
                backgroundColor:
                  index === currentFragmentIndex
                    ? "#6bdbc6ff"
                    : index < currentFragmentIndex
                    ? "#b85252"
                    : "#808881",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                zIndex: 1, // Kropki przed liniami
              }}
              onClick={() => onFragmentSelect(index)}
            />
          </Flex>
        ))}
      </Flex>
    );
  },
);

SequenceProgressBar.displayName = "SequenceProgressBar";

export default SequenceProgressBar;
