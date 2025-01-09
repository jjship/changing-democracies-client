import { FC, useCallback, useMemo, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { useNarrationContext } from "../../narratives/NarrationsContext";

const SequenceProgressBar: FC = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { currentIndex, setCurrentIndex, setIsPlaying, currentPath } =
    useNarrationContext();

  const onFragmentSelect = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsPlaying(true);
    },
    [setCurrentIndex, setIsPlaying],
  );

  const totalFragments = currentPath?.fragments.length ?? 0;
  const dotSize = 16;
  const lineThickness = 6;
  const thumbnailSize = "8vh";

  const progressBarItems = useMemo(
    () =>
      Array.from({ length: totalFragments }).map((_, index) => (
        <Flex
          key={index}
          style={{
            flex: index === totalFragments - 1 ? "0 1 auto" : 1,
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
                  index < currentIndex ? "#808881" : "transparent",
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
                    backgroundImage: `url(${currentPath?.fragments[index].thumbnailUrl})`,
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
                  index === currentIndex
                    ? `${dotSize * 1.3}px`
                    : `${dotSize}px`,
                height:
                  index === currentIndex
                    ? `${dotSize * 1.3}px`
                    : `${dotSize}px`,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex
                    ? "#6bdbc6ff"
                    : index < currentIndex
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
      )),
    [
      totalFragments,
      currentIndex,
      isHovered,
      currentPath?.fragments,
      onFragmentSelect,
    ],
  );

  return (
    <Flex
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "transparent",
      }}
    >
      {progressBarItems}
    </Flex>
  );
};

export default SequenceProgressBar;