"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { PosterMetadata } from "@/utils/posters-methods";

import { PostersContext } from "./PostersContext";
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
    // Find the poster that was deleted
    const posterToDelete =
      adminPosters?.find((p) => p.id === poster.id) || null;

    // Optimistically update the UI by filtering out the deleted poster
    setPosters(
      (prevPosters) => prevPosters?.filter((p) => p.id !== poster.id) || null,
    );

    // Send the delete request to the backend
    deletePoster(poster.fileName).then(({ error }) => {
      if (error) {
        // Revert the UI update (add the poster back)
        // TODO You might also want to notify the user about the failure
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
      <PostersContext.Provider
        value={{
          onDelete: handleDelete,
          posters: adminPosters,
          setPosters,
        }}
      >
        {openPosters ? (
          adminPosters ? (
            <PostersTable />
          ) : (
            <p>loading...</p>
          )
        ) : null}
      </PostersContext.Provider>
    </>
  );
}
