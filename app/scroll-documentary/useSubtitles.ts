import { useState, useEffect } from "react";
import parseSubtitles from "./subtitleParser"; // Use the parser from previous example

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

const useSubtitles = (subtitlesUrl: string) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(subtitlesUrl);
        const text = await response.text();
        const parsedSubtitles = parseSubtitles(text);
        setSubtitles(parsedSubtitles);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load subtitles"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubtitles();
  }, [subtitlesUrl]);

  return { subtitles, isLoading, error };
};

export default useSubtitles;
