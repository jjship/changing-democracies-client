import { Box, Text } from "@radix-ui/themes";

type NarrationsContinueButtonProps = {
  onClick?: () => void;
};
export { NarrationsOverviewButton };
const NarrationsOverviewButton: React.FC<NarrationsContinueButtonProps> = ({
  onClick,
}) => {
  return (
    <Box>
      <button
        onClick={onClick}
        style={{ borderRadius: "70px 100px 100px 70px" }} // Swapped border radius values
        className="relative flex h-[7vw] w-[25vw] items-center space-x-2 overflow-visible rounded-r-full bg-[#b85252] px-10 py-2 text-white opacity-90 shadow-lg"
      >
        <Box
          style={{ filter: "drop-shadow(5px 10px 4px rgba(0,0,0,.5))" }}
          className="absolute right-[80%] h-0 w-full border-b-[6vw] border-r-[10vw] border-t-[6vw] border-transparent border-r-[#4CAF50]" // Changed to green color and right border
        ></Box>
        <Text className="w-full text-center text-[2vw] font-bold">
          Overview
        </Text>
      </button>
    </Box>
  );
};
