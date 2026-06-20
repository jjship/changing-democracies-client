import "server-only";

import { Collection, VideoDbEntry } from "@/types/videosAndFilms";
import { BunnyMethodReturn } from "@/types/bunny";
import fetchWithRetry from "./fetch-retry";

export { getCollection, getVideo, getVideosPerCollection, fetchCaptions };

if (
  !process.env.BUNNY_STREAM_API_KEY ||
  !process.env.BUNNY_STREAM_LIBRARY_ID ||
  !process.env.BUNNY_STREAM_COLLECTION_ID ||
  !process.env.BUNNY_SCROLL_DOC_COLLECTION_ID
) {
  throw new Error("Missing Bunny Stream environment variables");
}

async function getCollection(): Promise<BunnyMethodReturn<Collection>> {
  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/collections/${process.env.BUNNY_STREAM_COLLECTION_ID}?includeThumbnails=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  try {
    const res = await fetchWithRetry({ url, options });

    if (!res || !res.ok)
      throw new Error("Failed to fetch video collection data");

    const collection: Collection = await res.json();

    return { data: [collection], success: true };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: {
        message: "Failed to fetch video collection data",
      },
    };
  }
}

async function getVideo(
  videoId: string,
): Promise<BunnyMethodReturn<VideoDbEntry>> {
  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  try {
    const res = await fetchWithRetry({ url, options });

    if (!res || !res.ok) throw new Error("Failed to fetch video data");

    const video: VideoDbEntry = await res.json();

    return { data: [video], success: true };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch video data" },
    };
  }
}

export type CollectionKey = "default" | "scroll-documentary";

const streamCollectionKeyToId = new Map<CollectionKey, string>();
streamCollectionKeyToId.set("default", process.env.BUNNY_STREAM_COLLECTION_ID);
streamCollectionKeyToId.set(
  "scroll-documentary",
  process.env.BUNNY_SCROLL_DOC_COLLECTION_ID,
);

async function getVideosPerCollection({
  cacheOptions,
  collectionKey,
}: {
  cacheOptions?: Record<string, unknown>;
  collectionKey?: CollectionKey;
}): Promise<BunnyMethodReturn<VideoDbEntry>> {
  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`;
  const collectionId = collectionKey
    ? streamCollectionKeyToId.get(collectionKey)
    : undefined;

  let allVideos: VideoDbEntry[] = [];
  let currentPage = 1;
  let totalItems: number | null = null;
  const itemsPerPage = 100;

  try {
    do {
      const options = {
        ...cacheOptions,
        method: "GET",
        headers: {
          accept: "application/json",
          AccessKey: process.env.BUNNY_STREAM_API_KEY,
        },
      };

      const res = await fetchWithRetry({
        url: `${url}?${
          collectionKey ? `collection=${collectionId}` : ""
        }&page=${currentPage}&itemsPerPage=${itemsPerPage}&orderBy=title`,
        options,
      });

      if (!res || !res.ok) throw new Error("Failed to fetch video data");

      const {
        items,
        totalItems: fetchedTotalItems,
      }: { items: VideoDbEntry[]; totalItems: number } = await res.json();

      allVideos = allVideos.concat(items);

      if (totalItems === null) {
        totalItems = fetchedTotalItems;
      }

      currentPage++;
    } while (totalItems && allVideos.length < totalItems);

    return {
      data: allVideos,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch videos data" },
    };
  }
}

async function fetchCaptions({
  videoId,
  srclang,
}: {
  videoId: string;
  srclang: string;
}): Promise<BunnyMethodReturn<string>> {
  const url = `https://${process.env.BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${videoId}/captions/${srclang}.vtt`;

  const options = {
    method: "GET",
    accept: "*/*",
    cache: "no-cache",
  } as const;

  try {
    const res = await fetchWithRetry({ url, options });

    if (!res || !res.ok) throw new Error("Failed to fetch video data");

    const caps = await res.text();

    return { data: [caps], success: true };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch captions" },
    };
  }
}
