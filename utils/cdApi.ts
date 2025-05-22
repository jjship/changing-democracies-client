import "server-only";
import { NarrationPath } from "../types/videosAndFilms";

// Client Fragment interfaces based on the schema
export interface ClientTag {
  id: string;
  name: string;
}

export interface ClientPerson {
  id: string;
  name: string;
  bio: string;
  country: {
    code: string;
    name: string;
  };
}

export interface ClientFragment {
  id: string;
  title: string;
  duration: number;
  playerUrl: string;
  thumbnailUrl: string;
  person: ClientPerson | null;
  tags: ClientTag[];
}

export interface FragmentsPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FragmentsResponse {
  data: ClientFragment[];
  pagination: FragmentsPagination;
}

export const narrativesApi = {
  async getNarratives(): Promise<NarrationPath[]> {
    try {
      return await cdApiRequest<NarrationPath[]>({
        endpoint: "/client-narratives",
        options: {
          method: "GET",
          next: { revalidate: 60 * 60 },
        },
      });
    } catch (error) {
      console.error("Error fetching narratives:", error);
      throw error;
    }
  },
};

export const fragmentsApi = {
  async getFragments(params: {
    languageCode: string;
    page?: number;
    limit?: number;
    disableCache?: boolean;
  }): Promise<FragmentsResponse> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("languageCode", params.languageCode);
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const queryString = queryParams.toString();
      const endpoint = `/client-fragments${
        queryString ? `?${queryString}` : ""
      }`;

      // Set revalidation based on disableCache flag
      const options: RequestInit = {
        method: "GET",
        next: params.disableCache
          ? { revalidate: 0 } // Set revalidate to 0 to disable cache
          : { revalidate: 10 * 60 }, // Default: cache for 10 minutes
      };

      return await cdApiRequest<FragmentsResponse>({
        endpoint,
        options,
      });
    } catch (error) {
      console.error("Error fetching fragments:", error);
      throw error;
    }
  },
};

export interface ApiLanguage {
  id: string;
  name: string;
  code: string;
}

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

export type TagCategory = {
  id: string;
  name: string;
  tags: {
    id: string;
    name: string;
  }[];
};

export type TagCategoriesResponse = {
  tagCategories: TagCategory[];
};

export const tagCategoriesApi = {
  async getTagCategories(languageCode: string): Promise<TagCategoriesResponse> {
    try {
      return await cdApiRequest<TagCategoriesResponse>({
        endpoint: `/client-tag-categories?languageCode=${languageCode}`,
        options: {
          method: "GET",
          next: { revalidate: 60 * 10 }, // 10 minutes cache
        },
      });
    } catch (error) {
      console.error("Error fetching tag categories:", error);
      throw error;
    }
  },
};
