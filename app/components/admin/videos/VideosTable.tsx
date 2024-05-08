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
import { useMemo } from "react";
import Link from "next/dist/client/link";
import { useVideosContext } from "./VideosContext";
import { FormVideo, VideoDbEntry } from "@/types/videos";

export { parseVideo };

type VideoRowProps = {
  video: FormVideo;
};

function VideoRow({ video }: VideoRowProps) {
  return (
    <>
      <TableRow key={video.guid}>
        <TableCell>
          <Link href={`/video/${video.guid}`}>
            <Button className="bg-yellow_secondary text-black_bg hover:bg-green_accent">
              edit
            </Button>
          </Link>
        </TableCell>
        <TableCell>{video.title}</TableCell>
        <TableCell>{video.length}</TableCell>
        <TableCell>{video.description}</TableCell>
        <TableCell>
          {video.captions.map((cap) => `${cap.srclang} \n`)}
        </TableCell>
        <TableCell>{video.tags}</TableCell>
      </TableRow>
    </>
  );
}

export function VideosTable() {
  const { videos } = useVideosContext();

  const parsedVideos: FormVideo[] = useMemo(
    () => parseVideos(videos),
    [videos],
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <Table className=" bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Edit</TableHead>
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

function parseVideos(videos: VideoDbEntry[] | null): FormVideo[] {
  if (!videos) return [];

  return videos.map((video) => parseVideo(video));
}

function parseVideo(video: VideoDbEntry): FormVideo {
  const { guid, title, length, captions, metaTags } = video;

  return {
    guid,
    title,
    length,
    captions,
    tags: metaTags.find((tag) => tag.property === "tags")?.value || "",
    description:
      metaTags.find((tag) => tag.property === "description")?.value || "",
  };
}
