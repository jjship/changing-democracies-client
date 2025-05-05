import { useState, useEffect } from "react";
import { parseSubtitles } from "../scrollDocumentary/subtitleParser";
import { ClientFragment } from "@/utils/cdApi";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

// Helper function to get subtitle URL
function getSubtitlesUrl(
  videoId: string,
  languageCode: string,
  suffix: string = "",
) {
  // Using the constant pullZoneUrl
  const pullZoneUrl = "vz-cac74041-8b3";
  return `https://${pullZoneUrl}.b-cdn.net/${videoId}/captions/${languageCode}${suffix}.vtt`;
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

        // First try the standard format (e.g., "en.vtt")
        let subtitleUrl = getSubtitlesUrl(videoId, languageCode.toLowerCase());

        let response = await fetch(subtitleUrl);

        // If the first attempt fails, try the auto-generated format (e.g., "en-auto.vtt")
        if (!response.ok) {
          subtitleUrl = getSubtitlesUrl(
            videoId,
            languageCode.toLowerCase(),
            "-auto",
          );

          response = await fetch(subtitleUrl);
        }

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
