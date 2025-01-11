import { Box, Text } from "@radix-ui/themes";
import { CSSProperties, FC } from "react";

type NarrativesButtonProps = {
  text: string;
  onClick: () => void;
  triangleColor: string;
  trianglePlacement: string;
  style?: CSSProperties;
  className?: string;
};

const NarrativesViewButton: FC<NarrativesButtonProps> = ({
  text,
  onClick,
  triangleColor,
  trianglePlacement,
  style,
}) => {
  const isRightPlacement = trianglePlacement === "right";

  return (
    <Box>
      <button
        onClick={onClick}
        style={{
          ...style,
          borderRadius: isRightPlacement
            ? "70px 100px 100px 70px"
            : "100px 70px 70px 100px",
        }}
        className={`relative flex h-[5vw] w-[20vw] items-center space-x-2 overflow-visible ${
          isRightPlacement ? "rounded-r-full" : "rounded-l-full"
        } bg-[#b85252] px-10 py-2 text-white opacity-90 shadow-lg`}
      >
        <Box
          style={{
            filter: "drop-shadow(5px 10px 4px rgba(0,0,0,.5))",
            borderRightColor: isRightPlacement ? triangleColor : "transparent",
            borderLeftColor: isRightPlacement ? "transparent" : triangleColor,
          }}
          className={`absolute ${
            isRightPlacement
              ? "right-[80%] border-r-[8vw]"
              : "left-[80%] border-l-[8vw]"
          } h-0 w-full border-b-[5vw] border-t-[5vw] border-transparent`}
        ></Box>
        <Text className="w-full text-center text-[2vw] font-bold">{text}</Text>
      </button>
    </Box>
  );
};

export default NarrativesViewButton;
