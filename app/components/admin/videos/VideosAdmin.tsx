"use client";

import { Button } from "@/components/ui/button";
import { VideoDbEntry } from "@/types/videos";
import { useEffect, useState } from "react";
import { getVideos } from "../actions";
import { VideosContext } from "./VideosContext";
import { VideosTable } from "./VideosTable";

export const dynamic = "force-dynamic";

export default function VideosAdmin() {
  const [videos, setVideos] = useState<VideoDbEntry[] | null>(null);
  const [openVideos, setOpenVideos] = useState<boolean>(false);

  function toggleVideos() {
    setOpenVideos(!openVideos);
  }

  useEffect(() => {
    const updateVideos = async () => {
      const data = await getVideos();

      if (data) {
        setVideos(data);
      }
    };

    updateVideos();
  }, []);

  return (
    <>
      <Button onClick={toggleVideos} size="sm">
        {openVideos ? "Close Videos table" : "Edit Videos"}
      </Button>
      <VideosContext.Provider value={{ videos, setVideos }}>
        {openVideos ? videos ? <VideosTable /> : <p>loading...</p> : null}
      </VideosContext.Provider>
    </>
  );
}
