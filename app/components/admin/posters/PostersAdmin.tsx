"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { PosterMetadata } from "@/utils/posters-methods";

import { PostersContextProvider } from "./PostersContext";
import PostersTable from "./PostersTable";
import { deletePoster } from "./actions";
import { navButton } from "../classNames";
import { usePostersLoader } from "../photobooth/usePostersLoader";

export const dynamic = "force-dynamic";

export default function PostersAdmin({ open }: { open: boolean }) {
  const [adminPosters, setPosters] = useState<PosterMetadata[] | null>(null);
  const [openPosters, setOpenPosters] = useState<boolean>(open);

  function togglePosters() {
    setOpenPosters(!openPosters);
  }

  const { posters } = usePostersLoader("/admin/posters/api");

  useEffect(() => {
    if (posters) setPosters(posters);
  }, [posters]);

  function handleDelete(poster: PosterMetadata) {
    const posterToDelete =
      adminPosters?.find((p) => p.id === poster.id) || null;

    setPosters(
      (prevPosters) => prevPosters?.filter((p) => p.id !== poster.id) || null,
    );

    deletePoster(poster.fileName).then(({ error }) => {
      if (error) {
        if (posterToDelete) {
          setPosters((prevPosters) => [...(prevPosters || []), posterToDelete]);
        }
      }
    });
  }

  return (
    <>
      <Button onClick={togglePosters} className={navButton} size="lg">
        {openPosters ? "Close Posters Table" : "Edit Posters"}
      </Button>
      <PostersContextProvider
        posters={adminPosters}
        setPosters={setPosters}
        onDelete={handleDelete}
      >
        {openPosters ? (
          adminPosters ? (
            <PostersTable />
          ) : (
            <p>loading...</p>
          )
        ) : null}
      </PostersContextProvider>
    </>
  );
}
