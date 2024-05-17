"use client";

import { saveAs } from "file-saver";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";
import { Button } from "../../ui/button";
import { useState } from "react";
import { usePostersContext } from "./PostersContext";
import { Poster } from "./actions";

type PosterRowProps = {
  poster: Poster;
};

function PosterRow({ poster }: PosterRowProps) {
  const [hover, setHover] = useState(false);

  const { onDelete, onUpdate } = usePostersContext();

  function handleDeleteClick() {
    if (onDelete) {
      onDelete(poster);
    }
  }

  function handleUpdateClick() {
    if (onUpdate) {
      onUpdate({ ...poster, published: !poster.published });
    }
  }

  const handleDownload = async () => {
    const response = await fetch(getPosterUrl(poster.fileName), {
      mode: "no-cors",
    });

    console.log(response);
    const blob = await response.blob();
    saveAs(blob, poster.fileName);
  };

  const { published, bunny_id } = poster;

  return (
    <TableRow key={bunny_id} className="h-min-[20rem] ">
      <TableCell>
        <Button
          onClick={handleUpdateClick}
          className={`${setPulishClass(published)} w-36`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover
            ? published
              ? "unpublish"
              : "publish"
            : published
            ? "published"
            : "unpublished"}
        </Button>
      </TableCell>
      <TableCell>
        <div onClick={handleDownload} style={{ cursor: "pointer" }}>
          <Image
            src={getPosterUrl(poster.fileName)}
            alt="user created poster"
            width={500}
            height={500}
            loading="lazy"
          />
        </div>
      </TableCell>
      <TableCell>
        <Button
          onClick={handleDeleteClick}
          className="w-36 bg-black_bg text-destructive hover:bg-destructive  hover:text-black_bg"
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function PostersTable() {
  const { posters } = usePostersContext();

  return (
    <Table className="flex flex-1 flex-col items-center justify-center gap-5">
      <TableBody>
        {posters &&
          posters.map((poster) => (
            <PosterRow key={poster.bunny_id} poster={poster} />
          ))}
      </TableBody>
    </Table>
  );
}

function setPulishClass(published: boolean) {
  return `${
    published
      ? "bg-green_accent hover:bg-yellow_secondary"
      : "bg-yellow_secondary hover:bg-green_accent"
  } text-black_bg`;
}

function getPosterUrl(fileName: Poster["fileName"]) {
  return `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${fileName}`;
}
