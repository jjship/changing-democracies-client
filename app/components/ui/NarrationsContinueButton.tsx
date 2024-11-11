import { Box, Text } from "@radix-ui/themes";

export default function NarrationsContinueButton() {
  // const Triangle = styled.div`
  //   position: absolute;
  //   left: 80%;
  //   height: 0;
  //   width: 100%;
  //   border-bottom: 6vw solid transparent;
  //   border-left: 10vw solid transparent;
  //   border-top: 6vw solid #8695c0;
  //   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  //   z-index: 1;
  //
  //   &After {
  //     content: "";
  //     position: absolute;
  //     left: -50px;
  //     top: 100%;
  //     width: 0;
  //     height: 0;
  //     border-left: 50px solid transparent;
  //     border-right: 50px solid transparent;
  //     border-top: 20px solid rgba(0, 0, 0, 0.5);
  //     z-index: -1;
  //   }
  // `;
  return (
    <Box>
      <button
        style={{ borderRadius: "100px 70px 70px 100px" }}
        className="relative flex h-[7vw] w-[25vw] items-center space-x-2 overflow-visible rounded-l-full bg-[#c66d68] px-10 py-2 text-white opacity-90 shadow-lg"
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
