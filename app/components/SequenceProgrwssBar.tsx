"use client";
import React, { memo, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { NarrationFragment } from "@/types/videosAndFilms";

type SequenceProgressBarProps = {
  totalFragments: number;
  currentFragmentIndex: number;
  onFragmentSelect: (index: number) => void;
  narrationFragments: NarrationFragment[];
};

const SequenceProgressBar = memo(
  ({
    totalFragments,
    currentFragmentIndex,
    onFragmentSelect,
    narrationFragments,
  }: SequenceProgressBarProps) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const dotSize = 16;
    const lineThickness = 6;
    const thumbnailSize = "8vh";

    return (
      <Flex
        justify="between"
        align="center"
        style={{
          position: "fixed",
          bottom: "3vh",
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
              flex: index === totalFragments - 1 ? "0 1 auto" : 1, // Change flex value for last item
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
                  top: `${dotSize / 2 - lineThickness / 2}px`,
                  left: `calc(-${dotSize / 50}px)`,
                  backgroundColor:
                    index < currentFragmentIndex ? "#808881" : "transparent",
                  transition: "background-color 0.3s ease",
                  zIndex: 0,
                }}
              />
            )}
            <Box
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isHovered === index && (
                <Box
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: thumbnailSize,
                  }}
                >
                  <Box
                    style={{
                      width: thumbnailSize,
                      height: thumbnailSize,
                      backgroundImage: `url(${narrationFragments[index].thumbnailUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%",
                      border: "2px solid #cf9855",
                    }}
                  />
                  <Box
                    style={{
                      width: "2px",
                      height: "48px",
                      backgroundColor: "#cf9855",
                      marginTop: "8px",
                    }}
                  />
                </Box>
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
                  zIndex: 1,
                }}
                onClick={() => onFragmentSelect(index)}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              />
            </Box>
          </Flex>
        ))}
      </Flex>
    );
  },
);

SequenceProgressBar.displayName = "SequenceProgressBar";

export default SequenceProgressBar;
