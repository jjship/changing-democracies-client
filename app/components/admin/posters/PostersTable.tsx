"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";
import { Button } from "../../ui/button";
import { usePostersContext } from "./PostersContext";
import { Poster } from "./actions";
import DownloadButton from "./DownloadButton";
import SendButton from "./SendButton";
import { destructiveButton } from "../classNames";

type PosterRowProps = {
  poster: Poster;
};

function PosterRow({ poster }: PosterRowProps) {
  const { onDelete } = usePostersContext();

  function handleDeleteClick() {
    if (onDelete) {
      onDelete(poster);
    }
  }

  const { bunny_id } = poster;

  return (
    <TableRow key={bunny_id} className="h-min-[20rem] ">
      <TableCell>
        <DownloadButton imageUrl={poster.url} fileName={poster.fileName} />
      </TableCell>
      <TableCell>
        <Image
          src={poster.url}
          alt="user created poster"
          width={500}
          height={500}
          loading="lazy"
        />
      </TableCell>
      <TableCell>
        <Button
          onClick={handleDeleteClick}
          className={destructiveButton}
          size="lg"
        >
          Delete
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
