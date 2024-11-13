import { Box, Text } from "@radix-ui/themes";

export default function NarrationsContinueButton() {
  return (
    <Box>
      <button
        // onClick={() => ()}
        style={{ borderRadius: "100px 70px 70px 100px" }}
        className="relative flex h-[7vw] w-[25vw] items-center space-x-2 overflow-visible rounded-l-full bg-[#b85252] px-10 py-2 text-white opacity-90 shadow-lg"
      >
        <Text className="w-full text-center text-[2vw] font-bold">
          continue
        </Text>
        <Box
          style={{ filter: "drop-shadow(5px 10px 4px rgba(0,0,0,.5))" }}
          className="absolute left-[80%] h-0 w-full border-b-[6vw] border-l-[10vw] border-t-[6vw] border-transparent border-l-[#8695c0]"
        ></Box>
      </button>
    </Box>
  );
}
