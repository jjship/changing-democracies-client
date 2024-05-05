"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Button } from "../../ui/button";
import { useState, useEffect, useMemo } from "react";
import Link from "next/dist/client/link";
import { useVideosContext } from "./VideosContext";
import { ParsedVideo, VideoDbEntry } from "@/types/videos";
import { format } from "date-fns";

type VideoRowProps = {
  video: ParsedVideo;
};

function VideoRow({ video }: VideoRowProps) {
  return (
    <>
      <TableRow key={video.guid}>
        {/* <TableCell>
          <Link href={`/video/${video.guid}`}>
            <Button className="bg-yellow_secondary text-black_bg hover:bg-green_accent">
              edit
            </Button>
          </Link>
        </TableCell> */}
        <TableCell>{video.thumbnailUrl}</TableCell>
        <TableCell>{video.title}</TableCell>
        <TableCell>{video.length}</TableCell>
        <TableCell>{video.description}</TableCell>
        <TableCell>{video.captions.map((cap) => `${cap} \n`)}</TableCell>
        <TableCell>{video.tags.map((tag) => `${tag} \n`)}</TableCell>
      </TableRow>
    </>
  );
}

export function VideosTable() {
  // const [nextId, setNextId] = useState(0);
  const { videos } = useVideosContext();

  const parsedVideos: ParsedVideo[] = useMemo(
    () => parseVideos(videos),
    [videos],
  );

  // useEffect(() => {
  //   setNextId(getNextId(videos));
  // }, [videos]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      {/* <Link href={`/video/${nextId}`}>
        <Button className="bg-red mb-2 rounded bg-green_accent px-4 py-2 text-black hover:bg-yellow_secondary">
          Add Video
        </Button>
      </Link> */}
      <Table className=" bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Length</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Available Captions</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parsedVideos &&
            parsedVideos.map((video) => (
              <VideoRow key={video.guid} video={video} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

// const getNextId = (videos: Video[]) => {
//   if (videos.length === 0) {
//     return 0;
//   }

//   return (
//     videos.reduce((acc: number, curr: Video) => {
//       return curr.guid > acc ? curr.guid : acc;
//     }, 0) + 1
//   );
// };

function parseVideos(videos: VideoDbEntry[] | null): ParsedVideo[] {
  if (!videos) return [];

  return videos.map((video) => {
    const { guid, title, length, captions, metaTags, ...otherInfo } = video;

    return {
      guid,
      title,
      length,
      captions: captions.map((cap) => cap.srclang),
      tags: metaTags
        .find((tag) => tag.property === "tags")
        ?.value.split(",") || ["no tags yet"],
      description:
        metaTags.find((tag) => tag.property === "description")?.value || "",
      thumbnailUrl: video.thumbnailFileName,
    };
  });
}
