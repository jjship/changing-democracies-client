// SequenceProgressBar.tsx
import React from "react";
import { Flex } from "@radix-ui/themes";

interface SequenceProgressBarProps {
  totalFragments: number;
  currentFragmentIndex: number;
  setCurrentFragmentIndex: (idx: number) => void;
  setIsVideoEnded: (is: boolean) => void;
  // setShowControls: (is: boolean) => void;
  // setIsCounting: (is: boolean) => void;
  // setIsChangedByUser: (is: boolean) => void;
}

const SequenceProgressBar: React.FC<SequenceProgressBarProps> = ({
  totalFragments,
  currentFragmentIndex,
  setCurrentFragmentIndex,
  setIsVideoEnded,
  // setShowControls,
  // setIsCounting,
  // setIsChangedByUser,
}) => {
  console.log("SequenceProgressBar props:", {
    totalFragments,
    currentFragmentIndex,
  });

  return (
    <Flex
      justify="between"
      align="center"
      style={{
        position: "absolute",
        bottom: "30px",
        left: "0",
        right: "0",
        // zIndex: 300,
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
            onClick={() => {
              // setIsChangedByUser(true);
              setCurrentFragmentIndex(index);
              setIsVideoEnded(true);
              // setShowControls(true);
              // setIsCounting(true);
            }} // Add onClick handler
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
};

export default SequenceProgressBar;
