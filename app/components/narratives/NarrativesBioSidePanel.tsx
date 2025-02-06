import { Box, Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

const NarrativesBioSidePanel = () => {
  const { currentPath, currentIndex, setShowSidePanel, setIsPlaying } =
    useNarrativesContext();
  return (
    <>
      <Flex
        direction={"column"}
        className={
          "fixed left-0 top-0 z-[100000] h-screen w-1/3 bg-purple_mains"
        }
      >
        <Button
          onClick={() => {
            setShowSidePanel(false);
            setIsPlaying(true);
          }}
          className={
            "m-8 h-[5vh] w-[5vh] self-end rounded-full border-4 border-green_accent bg-purple_mains p-3 text-2xl font-bold text-green_accent hover:bg-purple_mains"
          }
        >
          <X className={"h-12 w-12"} />
        </Button>
        <Box className={"mx-12"}>
          <Box
            className={
              "my-12 w-1/2 border-l-4 border-t-4 border-l-black border-t-black pl-5 pt-5 text-lg font-bold"
            }
          >
            <p>{currentPath?.fragments[currentIndex].person},</p>
            <p>{currentPath?.fragments[currentIndex].country}</p>
          </Box>
          <p className={"{/*font-bold*/}"}>
            {currentPath?.fragments[currentIndex].bio}
          </p>
        </Box>
      </Flex>
    </>
  );
};
export { NarrativesBioSidePanel };
