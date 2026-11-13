import { Box, Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FC } from "react";

interface BioSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  personName: string | undefined;
  countryName: string | undefined;
  bio: string | undefined;
  /** on phones, cover the page below the 4rem nav instead of a third of the width */
  mobileSheet?: boolean;
}

export const BioSidePanel: FC<BioSidePanelProps> = ({
  isOpen,
  onClose,
  personName,
  countryName,
  bio,
  mobileSheet = false,
}) => {
  const m = (classes: string) => (mobileSheet ? ` ${classes}` : "");

  return (
    <Flex
      direction={"column"}
      className={`fixed left-0 top-0 z-[100000] h-screen w-1/3 bg-purple_mains transition-transform delay-100 duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }${m(
        "mobile:top-16 mobile:h-[calc(100dvh-4rem)] mobile:w-full mobile:overflow-y-auto mobile:pb-8 mobile:landscape:!flex-row",
      )}`}
    >
      <div
        className={`flex w-full justify-end px-8 pt-8${m(
          "mobile:w-auto mobile:justify-start mobile:pt-6 mobile:landscape:px-6 mobile:landscape:pt-4",
        )}`}
      >
        <Button
          onClick={onClose}
          className={`h-[5vh] w-[5vh] rounded-full border-4 border-green_accent bg-purple_mains p-3 text-2xl font-bold text-green_accent hover:bg-purple_mains${m(
            "mobile:h-12 mobile:w-12 mobile:p-2",
          )}`}
        >
          <X className="h-12 w-12" />
        </Button>
      </div>
      <Box
        className={`mx-12${m(
          "mobile:mx-9 mobile:max-w-[34rem] mobile:landscape:ml-4 mobile:landscape:pt-4",
        )}`}
      >
        <Box
          className={`my-12 w-1/2 border-l-4 border-t-4 border-l-black border-t-black pl-5 pt-5 text-lg font-bold${m(
            "mobile:mb-10 mobile:mt-7 mobile:min-w-[11rem] mobile:pb-4 mobile:text-base mobile:landscape:mb-4 mobile:landscape:mt-0",
          )}`}
        >
          <p>{personName},</p>
          <p>{countryName}</p>
        </Box>
        <p
          className={`font-bold${m("mobile:text-xs mobile:font-medium mobile:leading-snug")}`}
        >
          {bio || "No biography available."}
        </p>
      </Box>
    </Flex>
  );
};
