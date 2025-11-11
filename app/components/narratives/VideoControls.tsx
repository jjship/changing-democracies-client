import { FC } from "react";
import { Flex } from "@radix-ui/themes";
import NarrativesViewButton from "./NarrativesViewButton";
import NarrativesCountDown from "./NarrativesCountDown";

interface VideoControlsProps {
  isPlaying: boolean;
  currentIndex: number;
  totalFragments: number;
  showSidePanel: boolean;
  onStart: () => void;
  onContinue: () => void;
}

export const VideoControls: FC<VideoControlsProps> = ({
  isPlaying,
  currentIndex,
  totalFragments,
  showSidePanel,
  onStart,
  onContinue,
}) => {
  if (isPlaying) return null;

  if (currentIndex === 0) {
    return (
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        className={"absolute w-full"}
      >
        <NarrativesViewButton
          text="Start"
          onClick={onStart}
          triangleColor="#8083ae"
          trianglePlacement="left"
        />
      </Flex>
    );
  }

  if (currentIndex > 0 && currentIndex <= totalFragments) {
    return (
      <Flex
        direction={"row"}
        justify={"center"}
        align={"center"}
        className={"absolute w-full"}
      >
        <NarrativesViewButton
          text="Continue"
          onClick={onContinue}
          triangleColor="#8083ae"
          trianglePlacement="left"
        />
        {!showSidePanel && (
          <NarrativesCountDown onFinish={onContinue} />
        )}
      </Flex>
    );
  }

  return null;
};

