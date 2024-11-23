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
    return (
      <Flex
        justify="between"
        align="center"
        style={{
          position: "absolute",
          bottom: "30px",
          left: "0",
          right: "0",
          width: "60%",
          backgroundColor: "transparent",
          padding: "10px",
          borderRadius: "5px",
          margin: "auto",
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
                  index <= currentFragmentIndex ? "#B85252" : "#54534D",
                margin: "0 5px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => onFragmentSelect(index)}
            />
            {index < totalFragments - 1 && index < currentFragmentIndex && (
              <div
                style={{
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#B85252",
                  margin: "0 2px",
                  transition: "opacity 0.3s ease",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
    );
  },
);

SequenceProgressBar.displayName = "SequenceProgressBar";

export default SequenceProgressBar;
