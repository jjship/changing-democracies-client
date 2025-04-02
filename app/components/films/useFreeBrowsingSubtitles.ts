import { useState, useEffect } from "react";
import { parseSubtitles } from "../scrollDocumentary/subtitleParser";
import { ClientFragment } from "@/lib/cdApi";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

// Helper function to get subtitle URL
function getSubtitlesUrl(videoId: string, languageCode: string): string {
  // Using the constant pullZoneUrl
  const pullZoneUrl = "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}.vtt`;
}

const useFreeBrowsingSubtitles = (
  fragment: ClientFragment | undefined,
  languageCode: string,
) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!fragment || !languageCode) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const videoId = fragment.id;
        const subtitleUrl = getSubtitlesUrl(
          videoId,
          languageCode.toLowerCase(),
        );

        console.log("Fetching subtitles from:", subtitleUrl);

        const response = await fetch(subtitleUrl);

        if (!response.ok) {
          console.warn(`Could not load subtitles. Status: ${response.status}`);
          setError(`Failed to load subtitles (${response.status})`);
          setSubtitles([]);
          setIsLoading(false);
          return;
        }

        const text = await response.text();
        const parsedSubtitles = parseSubtitles(text);
        setSubtitles(parsedSubtitles);
      } catch (err) {
        console.error("Error loading subtitles:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load subtitles",
        );
        setSubtitles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubtitles();
  }, [fragment, languageCode]);

  return { subtitles, isLoading, error };
};

export default useFreeBrowsingSubtitles;
