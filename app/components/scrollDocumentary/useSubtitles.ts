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
  const [languageCode, setLanguageCode] = useState<string | undefined>(
    selectedLanguageCode,
  );

  useEffect(() => {
    // Update languageCode when selectedLanguageCode changes
    if (selectedLanguageCode && selectedLanguageCode !== languageCode) {
      setLanguageCode(selectedLanguageCode);
    }
  }, [selectedLanguageCode, languageCode]);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!videoSource.availableLanguageCodes || !languageCode) {
        setIsLoading(false);
        return;
      }

      // Convert languageCode to uppercase to match the keys in availableLanguageCodes
      const upperLanguageCode = languageCode.toUpperCase();
      if (
        !Object.keys(videoSource.availableLanguageCodes).includes(
          upperLanguageCode,
        )
      ) {
        setError(`Subtitles not available for language: ${languageCode}`);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get the actual subtitle code from the availableLanguageCodes using the uppercase key
        const subtitleCode =
          videoSource.availableLanguageCodes[upperLanguageCode];

        const response = await fetch(
          getSubtitlesUrl(
            videoSource.pullZoneUrl,
            videoSource.videoId,
            subtitleCode,
          ),
        );

        if (!response.ok) {
          setError(`Failed to load subtitles (${response.status})`);
          return;
        }

        const text = await response.text();
        const parsedSubtitles = parseSubtitles(text);
        setSubtitles(parsedSubtitles);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load subtitles",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubtitles();
  }, [videoSource, languageCode]);

  return { subtitles, isLoading, error };
};

export default useSubtitles;
