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
  const [error, setError] = useState<string | null>(null);

  function toggleVideos() {
    setOpenVideos(!openVideos);
  }

  useEffect(() => {
    const updateVideos = async () => {
      try {
        const { data, error } = await getVideos();

        if (data) {
          setVideos(data);
          setError(null);
        } else if (error) {
          // Handle the error
          setError(error.message || "Failed to load videos");

          // Check for detailed error information
          if ("cause" in error && typeof error.cause === "object") {
            const cause = error.cause as any;
            if (cause.errorBody) {
              try {
                // If errorBody is a string, parse it
                const parsedError =
                  typeof cause.errorBody === "string"
                    ? JSON.parse(cause.errorBody)
                    : cause.errorBody;

                // Extract error list if available
                if (parsedError.data?.errorList?.length) {
                  setError(
                    `${error.message}: ${parsedError.data.errorList.join(
                      ", ",
                    )}`,
                  );
                }
              } catch (e) {
                // If parsing fails, use the original error
                console.error("Error parsing error body", e);
              }
            }
          }
        }
      } catch (err) {
        console.error("Error loading videos:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    updateVideos();
  }, []);

  return (
    <>
      <Button onClick={toggleVideos} className={navButton} size="lg">
        {openVideos ? "Close Videos Table" : "Edit Videos"}
      </Button>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <VideosContext.Provider value={{ videos, setVideos, error, setError }}>
        {openVideos ? videos ? <VideosTable /> : <p>loading...</p> : null}
      </VideosContext.Provider>
    </>
  );
}
