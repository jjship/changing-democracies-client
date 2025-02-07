import { FC, useCallback, useMemo, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { useNarrativesContext } from "../../narratives/NarrativesContext";
import SwitchPathButton from "@/components/narratives/switchPathButton";
import SwitchPathRedirectButton from "@/components/narratives/SwitchPathRedirectButton";

const NarrativesProgressBar: FC = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const {
    currentIndex,
    setCurrentIndex,
    setIsPlaying,
    currentPath,
    setSwitchPath,
    switchPath,
    isPlaying,
    setCurrentPath,
    narrationPaths,
  } = useNarrativesContext();

  const [animate, setAnimate] = useState(false);

  const onFragmentSelect = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsPlaying(true);
      setSwitchPath(false);
    },
    [setCurrentIndex, setIsPlaying, setSwitchPath],
  );

  const handleSwitchPathButton = useCallback(() => {
    isPlaying && setIsPlaying(false);
    !switchPath && setSwitchPath(true);
    setAnimate(true);
  }, [isPlaying, setIsPlaying, setSwitchPath, switchPath]);

  const handleSwitchPathRedirectButton = useCallback(
    (id: string) => {
      setIsPlaying(true);
      setSwitchPath(false);
      if (narrationPaths) {
        const path = narrationPaths.find((path) => path.id === id);
        path && setCurrentPath(path);
      }
      if (currentPath) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    [
      currentIndex,
      currentPath,
      narrationPaths,
      setCurrentIndex,
      setCurrentPath,
      setIsPlaying,
      setSwitchPath,
    ],
  );

  const totalFragments = currentPath?.fragments.length ?? 0;
  const dotSize = 18;
  const lineThickness = 7;
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
                left: `calc(-${dotSize / 10000000}vw)`,
                backgroundColor:
                  index < currentIndex ? "#808881" : "transparent",
                transition: "background-color 0.3s ease",
                zIndex: 0,
              }}
            />
          )}
          {index === currentIndex && (
            <Box
              className={`ease absolute -z-[50] transition-all delay-75 duration-500 ${
                !isPlaying &&
                currentPath?.fragments[currentIndex].otherPaths.length !== 0 &&
                index === currentIndex
                  ? "bottom-0 -translate-x-[45%] -translate-y-[100%] opacity-100"
                  : "bottom-0 -translate-x-[45%] -translate-y-[0%] opacity-0"
              }`}
            >
              {!switchPath && (
                <SwitchPathButton onClick={handleSwitchPathButton} />
              )}
            </Box>
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
                    border: "4px solid #cf9855",
                  }}
                />
                <Box
                  style={{
                    width: "4px",
                    height: "8vh",
                    backgroundColor: "#cf9855",
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
          <Flex className={"relative"}>
            <Box
              className={"absolute top-12"}
              style={{ overflowY: "auto", maxHeight: "20vh" }}
            >
              {switchPath &&
                !isPlaying &&
                index === currentIndex &&
                currentPath?.fragments[currentIndex].otherPaths.map(
                  (otherPath, index) => (
                    <SwitchPathRedirectButton
                      key={index}
                      onClick={() =>
                        handleSwitchPathRedirectButton(otherPath.id)
                      }
                      id={otherPath.id}
                      animate={animate}
                      title={otherPath.title}
                    ></SwitchPathRedirectButton>
                  ),
                )}
            </Box>
          </Flex>
        </Flex>
      )),
    [
      totalFragments,
      currentIndex,
      isPlaying,
      currentPath?.fragments,
      switchPath,
      handleSwitchPathButton,
      isHovered,
      onFragmentSelect,
      animate,
      handleSwitchPathRedirectButton,
    ],
  );

  return (
    <Flex className="borde-2  mx-auto items-center justify-center bg-transparent">
      {progressBarItems}
    </Flex>
  );
};

export default NarrativesProgressBar;
