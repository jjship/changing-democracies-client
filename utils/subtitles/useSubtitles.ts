"use client";
import { useState, useEffect } from "react";
import { parseSubtitles } from "./parser";
import { getSubtitlesUrl } from "./urls";
import type { Subtitle } from "./types";

interface UseSubtitlesParams {
  fragmentId?: string;
  languageCode: string;
}

const useSubtitles = ({ fragmentId, languageCode }: UseSubtitlesParams) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!fragmentId || !languageCode) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let response: Response | null = null;

        // Try 1: Standard format in requested language
        response = await fetchSubtitleAttempt(
          fragmentId,
          languageCode.toLowerCase(),
          "",
        );

        // Try 2: Auto-generated format in requested language
        if (!response) {
          response = await fetchSubtitleAttempt(
            fragmentId,
            languageCode.toLowerCase(),
            "-auto",
          );
        }

        // Try 3: Standard format in English
        if (!response) {
          response = await fetchSubtitleAttempt(fragmentId, "en", "");
        }

        // Try 4: Auto-generated format in English
        if (!response) {
          response = await fetchSubtitleAttempt(fragmentId, "en", "-auto");
        }

        // If we still don't have a response, no subtitles are available
        if (!response) {
          setSubtitles([]);
          setIsLoading(false);
          return;
        }

        // Parse the successful response
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
  }, [fragmentId, languageCode]);

  return { subtitles, isLoading, error };
};

// Helper function to fetch subtitles with error handling and retries
async function fetchSubtitleAttempt(
  fragmentId: string,
  langCode: string,
  suffix: string = "",
  retries: number = 2,
): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const subtitleUrl = getSubtitlesUrl(fragmentId, langCode, suffix);

      // First check if the file exists with a HEAD request
      const headResponse = await fetch(subtitleUrl, { method: "HEAD" });

      if (headResponse.status === 404) {
        return null; // File doesn't exist, no need to retry
      }

      if (!headResponse.ok) {
        // Non-404 error, throw to be caught
        throw new Error(
          `HTTP ${headResponse.status}: ${headResponse.statusText}`,
        );
      }

      // File exists, now fetch the actual content
      const response = await fetch(subtitleUrl);

      if (response.ok) {
        return response;
      }

      // For non-404 HTTP errors, throw to be caught by the main try-catch
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (err) {
      // Check if it's a network error that should be retried
      if (err instanceof TypeError && err.message.includes("fetch")) {
        // Network errors should be retried (unless it's the last attempt)
        if (attempt < retries) {
          // Wait a bit before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 100),
          );
          continue;
        }
        // Last attempt failed, return null
        return null;
      }

      // Only re-throw non-404 errors
      if (err instanceof Error && !err.message.includes("404")) {
        throw err;
      }
      return null;
    }
  }

  return null;
}

export default useSubtitles;
