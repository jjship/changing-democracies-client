import "server-only";
import { headers } from "next/headers";
import { NarrationPath } from "../types/videosAndFilms";
import { Language } from "../utils/i18n/languages";

export const narrativesApi = {
  async getNarratives(): Promise<NarrationPath[]> {
    try {
      return await cdApiRequest<NarrationPath[]>({
        endpoint: "/client-narratives",
        options: {
          method: "POST",
          body: JSON.stringify({
            languageCode: "en",
          }),
          next: { revalidate: 15 * 60 }, // 15 minutes
        },
      });
    } catch (error) {
      console.error("Error fetching narratives:", error);
      throw error;
    }
  },
};

export interface ApiLanguage {
  id: string;
  name: string;
  code: string;
}

export const languagesApi = {
  async getLanguages(): Promise<Language[]> {
    try {
      return await cdApiRequest<ApiLanguage[]>({
        endpoint: "/languages",
        options: {
          method: "GET",
          next: { revalidate: 15 * 60 }, // 15 minutes
        },
      }).then((languages) =>
        languages.map((language) => ({
          languageCode: language.code.toLowerCase(),
          label: language.code,
        })),
      );
    } catch (error) {
      console.error("Error fetching languages:", error);
      throw error;
    }
  },
};

export async function cdApiRequest<T>({
  endpoint,
  options,
  retries = 3,
}: {
  endpoint: string;
  options: RequestInit;
  retries?: number;
}): Promise<T> {
  const fetchWithRetry = async (attempt: number): Promise<Response> => {
    try {
      const response = await fetch(`${getApiConfig().baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": getApiConfig().apiKey,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} ${response.statusText} for ${options.method} ${endpoint}`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      if (attempt <= retries) {
        console.warn(
          `Retrying ${options.method} ${endpoint} (${attempt}/${retries}) due to error: ${errorMessage}`,
        );
        return fetchWithRetry(attempt + 1);
      } else {
        throw new Error(
          `Network error or max retries reached for ${options.method} ${endpoint}: ${errorMessage}`,
        );
      }
    }
  };

  const response = await fetchWithRetry(1);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
}

type ApiConfig = {
  baseUrl: string;
  apiKey: string;
};

// Create configurations
const getApiConfig = (): ApiConfig => {
  const baseUrl = process.env.BACKEND_API_URL;
  const apiKey = process.env.BACKEND_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Missing required environment variables for API client");
  }

  return { baseUrl, apiKey };
};
