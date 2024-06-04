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
import { editButton } from "../classNames";

export { parseVideo };

type VideoRowProps = {
  video: FormVideo;
};

function VideoRow({ video }: VideoRowProps) {
  return (
    <>
      <TableRow key={video.guid}>
        <TableCell>
          <Link href={`admin/video/${video.guid}`}>
            <Button className={editButton} size="sm">
              edit
            </Button>
          </Link>
        </TableCell>
        <TableCell>{video.title}</TableCell>
        <TableCell>{video.length}</TableCell>
        <TableCell>
          {video.description.length > 20
            ? `${video.description.slice(0, 20)}...`
            : video.description}
        </TableCell>
        <TableCell>
          {video.captions
            .filter((cap) => (cap.srclang.endsWith("auto") ? false : true))
            .map((cap) => `${cap.srclang} `)}
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
            <TableHead>Verified Captions</TableHead>
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
    length: `${Math.floor(length / 60)}:${length % 60}`,
    captions,
    tags:
      metaTags
        .find((tag) => tag.property === "tags")
        ?.value?.split(",")
        .join(" ") || "",
    description:
      metaTags.find((tag) => tag.property === "description")?.value || "",
  };
}
