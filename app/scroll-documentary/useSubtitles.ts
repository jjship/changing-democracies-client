import { useState, useEffect } from "react";
import { parseSubtitles } from "./subtitleParser";
import { getSubtitlesUrl } from "@/utils/i18n/languages";
import { VideoSource } from "@/types/scrollDocumentary";

export type Subtitle = {
  start: number;
  end: number;
  text: string;
};

const useSubtitles = (
  videoSource: VideoSource,
  selectedLanguageCode?: string,
) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!videoSource.availableLanguageCodes || !selectedLanguageCode) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          getSubtitlesUrl(
            videoSource.pullZoneUrl,
            videoSource.videoId,
            selectedLanguageCode,
          ),
        );

        if (!response.ok) {
          console.warn(`Could not load subtitles. Status: ${response.status}`);
          setError(`Failed to load subtitles (${response.status})`);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubtitles();
  }, [videoSource, selectedLanguageCode]);

  console.log({ useSubtitles: subtitles });

  return { subtitles, isLoading, error };
};

export default useSubtitles;
