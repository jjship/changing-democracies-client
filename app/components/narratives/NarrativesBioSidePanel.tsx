import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

const NarrativesBioSidePanel = () => {
  const { currentPath, currentIndex, setShowSidePanel } =
    useNarrativesContext();
  return (
    <>
      <Flex
        direction={"column"}
        className={
          "fixed left-0 top-0 z-[100000] h-screen w-1/3 bg-purple_mains px-12"
        }
      >
        <Button
          onClick={() => {
            setShowSidePanel(false);
          }}
          className={
            "bottom-0 right-0 my-8 w-[2vw] self-end rounded-full border-4 border-green_accent bg-purple_mains text-2xl text-green_accent hover:bg-purple_mains"
          }
        >
          X
        </Button>
        <p
          className={
            "mb-10 w-1/2 border-l-4 border-t-4 border-l-black border-t-black font-bold"
          }
        >
          {currentPath?.fragments[currentIndex].person},
          {currentPath?.fragments[currentIndex].country}
        </p>
        <p>{currentPath?.fragments[currentIndex].bio}</p>
      </Flex>
    </>
  );
};
export { NarrativesBioSidePanel };
