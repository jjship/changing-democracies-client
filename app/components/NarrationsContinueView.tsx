"use client";

import { Fragment, Path } from "@/types/videosAndFilms";
import "@radix-ui/themes/styles.css";
import { Flex, Text } from "@radix-ui/themes";
import NarrationsContinueButton from "@/ui/NarrationsContinueButton";
import Countdown from "@/ui/countDown";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/admin/videos/VideoPlayer";

export default function NarrationsContinueView(props: {
  path: Path;
  fragment: Fragment;
}) {
  const { path, fragment } = props;
  const [isCounting, setIsCounting] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string>("");

  useEffect(() => {
    if (fragment) {
      setNowPlaying(fragment.guid);
    }
  }, [fragment]);

  console.log(fragment.thumbnailUrl);
  return (
    <>
      {path && (
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
                "grow-2 relative right-5 top-1/4 box-border h-[10vh] min-w-[40%] items-center rounded-[3px] bg-[#8695c0] px-10"
              }
            >
              <Text
                className={
                  "text-center text-white sm:text-[0.5rem] md:text-[1.5vw] lg:text-[1vw]"
                }
              >
                {path.title}
              </Text>
            </Flex>
          </Flex>
          <Flex
            style={{
              zIndex: 100,
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
            <Countdown isCounting={setIsCounting}></Countdown>
            {isCounting && <VideoPlayer videoId={nowPlaying}></VideoPlayer>}
          </Flex>
        </Flex>
      )}
    </>
  );
}
