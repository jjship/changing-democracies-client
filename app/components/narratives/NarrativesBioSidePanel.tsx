import { Box, Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { useMemo } from "react";

const NarrativesBioSidePanel = () => {
  const {
    currentPath,
    currentIndex,
    setShowSidePanel,
    setIsPlaying,
    showSidePanel,
    selectedLanguage,
  } = useNarrativesContext();

  const currentBio = useMemo(() => {
    const currentFragment = currentPath?.fragments[currentIndex];
    if (!currentFragment) return null;

    return (
      currentFragment.bios.find(
        (bio: any) => bio.languageCode === selectedLanguage,
      )?.bio ??
      currentFragment.bios.find((bio: any) => bio.languageCode === "EN")?.bio
    );
  }, [currentPath, currentIndex, selectedLanguage]);

  const currentCountryName = useMemo(() => {
    const currentFragment = currentPath?.fragments[currentIndex];
    if (!currentFragment) return null;

    return (
      currentFragment.country.names.find(
        (name) => name.languageCode === selectedLanguage,
      )?.name ??
      currentFragment.country.names.find((name) => name.languageCode === "EN")
        ?.name
    );
  }, [currentPath, currentIndex, selectedLanguage]);

  return (
    <>
      <Flex
        direction={"column"}
        className={`fixed left-0 top-0 z-[100000] h-screen w-1/3 bg-purple_mains transition-transform delay-100 duration-300 ease-in-out ${
          showSidePanel ? "translate-x-0" : "-translate-x-full"
        }`}
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
            <p>{currentCountryName}</p>
          </Box>
          <p className={"font-bold"}>{currentBio}</p>
        </Box>
      </Flex>
    </>
  );
};
export { NarrativesBioSidePanel };
