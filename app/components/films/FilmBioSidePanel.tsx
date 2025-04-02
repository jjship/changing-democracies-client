import { Box, Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFilmsContext } from "./FilmsContext";
import { useMemo } from "react";

const FilmBioSidePanel = () => {
  const {
    nowPlaying,
    fragments,
    setNowPlaying,
    showSidePanel,
    setShowSidePanel,
  } = useFilmsContext();

  const currentFragment = useMemo(() => {
    return fragments?.find((fragment) => fragment.id === nowPlaying);
  }, [fragments, nowPlaying]);

  return (
    <>
      <Flex
        direction={"column"}
        className={`fixed left-0 top-0 z-[100000] h-screen w-1/3 bg-purple_mains transition-transform delay-100 duration-300 ease-in-out ${
          showSidePanel ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full justify-end px-8 pt-8">
          <Button
            onClick={() => {
              setShowSidePanel(false);
            }}
            className="h-[5vh] w-[5vh] rounded-full border-4 border-green_accent bg-purple_mains p-3 text-2xl font-bold text-green_accent hover:bg-purple_mains"
          >
            <X className="h-12 w-12" />
          </Button>
        </div>
        <Box className={"mx-12"}>
          <Box
            className={
              "my-12 w-1/2 border-l-4 border-t-4 border-l-black border-t-black pl-5 pt-5 text-lg font-bold"
            }
          >
            <p>{currentFragment?.person?.name},</p>
            <p>{currentFragment?.person?.country?.name}</p>
          </Box>
          <p className={"font-bold"}>
            {currentFragment?.person?.bio || "No biography available."}
          </p>
        </Box>
      </Flex>
    </>
  );
};

export default FilmBioSidePanel;
