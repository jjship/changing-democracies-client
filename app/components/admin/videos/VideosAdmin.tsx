"use client";

import { Button } from "@/components/ui/button";
import { VideoDbEntry } from "@/types/videosAndFilms";
import { useEffect, useState } from "react";
import { getVideos } from "../actions";
import { VideosContext } from "./VideosContext";
import { VideosTable } from "./VideosTable";
import { navButton } from "../classNames";

export const dynamic = "force-dynamic";

export default function VideosAdmin({ open }: { open: boolean }) {
  const [videos, setVideos] = useState<VideoDbEntry[] | null>(null);
  const [openVideos, setOpenVideos] = useState<boolean>(open);

  function toggleVideos() {
    setOpenVideos(!openVideos);
  }

  useEffect(() => {
    const updateVideos = async () => {
      const { data, error } = await getVideos();

      if (data) {
        setVideos(data);
      } else {
        throw error;
      }
    };

    updateVideos();
  }, []);

  return (
    <>
      <Button onClick={toggleVideos} className={navButton} size="lg">
        {openVideos ? "Close Videos Table" : "Edit Videos"}
      </Button>
      <VideosContext.Provider value={{ videos, setVideos }}>
        {openVideos ? videos ? <VideosTable /> : <p>loading...</p> : null}
      </VideosContext.Provider>
    </>
  );
}
