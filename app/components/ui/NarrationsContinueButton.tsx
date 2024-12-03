import { Box, Text } from "@radix-ui/themes";

type NarrationsButtonProps = {
  text: string;
  onClick: () => void;
  triangleColor: string;
  trianglePlacement: string;
  style?: React.CSSProperties;
  className?: string;
};

const NarrationsButton: React.FC<NarrationsButtonProps> = ({
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
        className={`relative flex h-[7vw] w-[25vw] items-center space-x-2 overflow-visible ${
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
              ? "right-[80%] border-r-[10vw]"
              : "left-[80%] border-l-[10vw]"
          } h-0 w-full border-b-[6vw] border-t-[6vw] border-transparent`}
        ></Box>
        <Text className="w-full text-center text-[2vw] font-bold">{text}</Text>
      </button>
    </Box>
  );
};

export default NarrationsButton;
