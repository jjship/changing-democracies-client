import React from "react";
import { Flex } from "@radix-ui/themes";
import { NarrationFragment } from "@/types/videosAndFilms";

type FragmentItemProps = {
  fragment: NarrationFragment;
  index: number;
  onFragmentSelect: (index: number) => void;
  isHovered: number | null;
  setIsHovered: (index: number | null) => void;
  dotSize: number;
  lineThickness: number;
  thumbnailSize: string;
};

const FragmentItem: React.FC<FragmentItemProps> = ({
  fragment,
  index,
  onFragmentSelect,
  isHovered,
  setIsHovered,
  dotSize,
  lineThickness,
  thumbnailSize,
}) => {
  return (
    <Flex
      onClick={() => onFragmentSelect(index)}
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
      style={{
        cursor: "pointer",
        position: "relative",
        flex: 1,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: isHovered === index ? "yellow" : "white",
          zIndex: 20,
        }}
      />
      {isHovered === index && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fragment.thumbnailUrl}
          alt={fragment.title}
          style={{
            position: "absolute",
            bottom: "100%",
            width: thumbnailSize,
            height: thumbnailSize,
            objectFit: "cover",
            borderRadius: "5px",
            zIndex: 30,
          }}
        />
      )}
    </Flex>
  );
};

export default FragmentItem;
