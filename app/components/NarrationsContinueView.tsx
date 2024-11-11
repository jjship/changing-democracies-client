"use client";

import { Fragment } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Box, Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import { useIdleTimer } from "react-idle-timer";

export default function NarrationsContinueView(props: { fragment: Fragment }) {
  const { fragment } = props;

  return (
    <>
      {fragment && (
        <Flex
          height={"100%"}
          align={"center"}
          justify={"center"}
          direction={"column"}
        >
          <Flex
            style={{
              justifyContent: "end",
              color: "#8695c0",
            }}
            className={"w-full"}
          >
            <Flex
              style={{ justifyContent: "center" }}
              className={
                "grow-2 relative right-5 top-[5%] z-10 box-border h-[10vh] min-w-[40%] items-center rounded-[3px] bg-[#8695c0] px-10"
              }
            >
              <Text
                className={
                  " text-center text-white sm:text-[0.5rem] md:text-[1.5vw] lg:text-[1vw]"
                }
              >
                {fragment.title}
              </Text>
            </Flex>
          </Flex>

          <Flex
            style={{
              overflow: "hidden",
              backgroundImage: `url(${fragment.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NarrationsContinueButton />
          </Flex>
        </Flex>
      )}
    </>
  );
}
