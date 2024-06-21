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
import DownloadButton from "./DownloadButton";
import { destructiveButton } from "../classNames";
import { PosterMetadata } from "@/utils/posters-methods";

type PosterRowProps = {
  poster: PosterMetadata;
};

function PosterRow({ poster }: PosterRowProps) {
  const { onDelete } = usePostersContext();

  function handleDeleteClick() {
    if (onDelete) {
      onDelete(poster);
    }
  }

  const { id } = poster;

  return (
    <TableRow key={id} className="h-min-[20rem] ">
      <TableCell>
        <DownloadButton
          imageUrl={poster.imageUrl ?? ""}
          fileName={poster.fileName}
        />
      </TableCell>
      <TableCell>
        <Image
          src={poster.imageUrl ?? ""}
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
            <PosterRow key={poster.id} poster={poster} />
          ))}
      </TableBody>
    </Table>
  );
}
