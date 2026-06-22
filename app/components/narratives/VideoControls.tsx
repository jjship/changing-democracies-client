import { FC } from "react";
import { Flex } from "@radix-ui/themes";
import NarrativesViewButton from "./NarrativesViewButton";

interface VideoControlsProps {
  isPlaying: boolean;
  currentIndex: number;
  onStart: () => void;
}

export const VideoControls: FC<VideoControlsProps> = ({
  isPlaying,
  currentIndex,
  onStart,
}) => {
  // Only the initial Start gate remains. Once playing, controls live on the
  // video itself; fragments auto-advance seamlessly with no between-fragment UI.
  if (isPlaying || currentIndex !== 0) return null;

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
};
