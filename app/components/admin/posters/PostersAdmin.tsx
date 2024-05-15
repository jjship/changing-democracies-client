"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { PostersContext } from "./PostersContext";
import PostersTable from "./PostersTable";
import { deletePoster, updatePoster } from "./actions";
import { Poster, fetchPosters } from "./actions";

export const dynamic = "force-dynamic";

export default function PostersAdmin({ open }: { open: boolean }) {
  const [posters, setPosters] = useState<Poster[] | null>(null);
  const [openPosters, setOpenPosters] = useState<boolean>(open);

  function togglePosters() {
    setOpenPosters(!openPosters);
  }

  useEffect(() => {
    const updatePosters = async () => {
      const { data } = await fetchPosters();

      if (data) {
        setPosters(data);
      }
    };

    updatePosters();
  }, []);

  function handleUpdate(poster: Poster) {
    // Find the poster that was updated
    const posterToUpdate =
      posters?.find((p) => p.bunny_id === poster.bunny_id) || null;

    // Optimistically update the UI by updating the poster
    setPosters(
      (prevPosters) =>
        prevPosters?.map((p) =>
          p.bunny_id === poster.bunny_id ? poster : p,
        ) || null,
    );

    // Send the update request to the backend
    updatePoster(poster).then(({ error }) => {
      if (error) {
        // Revert the UI update (add the poster back)
        // TODO You might also want to notify the user about the failure
        if (posterToUpdate) {
          setPosters((prevPosters) => [...(prevPosters || []), posterToUpdate]);
        }
      }
    });
  }
  function handleDelete(poster: Poster) {
    // Find the poster that was deleted
    const posterToDelete =
      posters?.find((p) => p.bunny_id === poster.bunny_id) || null;

    // Optimistically update the UI by filtering out the deleted poster
    setPosters(
      (prevPosters) =>
        prevPosters?.filter((p) => p.bunny_id !== poster.bunny_id) || null,
    );

    // Send the delete request to the backend
    deletePoster(poster).then(({ error }) => {
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
      <Button onClick={togglePosters} size="sm">
        {openPosters ? "Close posters table" : "Edit posters"}
      </Button>
      <PostersContext.Provider
        value={{
          onDelete: handleDelete,
          onUpdate: handleUpdate,
          posters,
          setPosters,
        }}
      >
        {openPosters ? posters ? <PostersTable /> : <p>loading...</p> : null}
      </PostersContext.Provider>
    </>
  );
}
