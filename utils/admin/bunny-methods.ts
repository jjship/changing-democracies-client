import "server-only";

import { VideoDbEntry } from "@/types/videosAndFilms";
import { BunnyMethodReturn } from "@/types/bunny";
import fetchWithRetry from "../fetch-retry";

export {
  getCollection,
  getVideo,
  getVideosPerCollection,
  fetchCaptions,
} from "../bunny-stream";
export type { CollectionKey } from "../bunny-stream";

export {
  updateVideo,
  deleteCaption,
  uploadCaptions,
  purgeCaptionsCash,
  uploadImage,
};

export type UpdateVideoModel = {
  guid: string;
  title?: string | null;
  collectionId?: string | null;
  chapters?: Record<string, any> | null;
  moments?: Record<string, any> | null;
  metaTags?: { property: string; value: string }[] | null;
};

if (
  !process.env.BUNNY_STREAM_API_KEY ||
  !process.env.BUNNY_STREAM_LIBRARY_ID ||
  !process.env.BUNNY_STREAM_COLLECTION_ID ||
  !process.env.BUNNY_STORAGE_API_KEY ||
  !process.env.BUNNY_STORAGE_NAME
) {
  throw new Error("Missing Bunny Stream environment variables");
}

async function uploadImage({
  blob,
  fileName,
}: {
  blob: Blob;
  fileName: string;
}) {
  const readStream = blob.stream();

  const storageName = process.env.BUNNY_STORAGE_NAME;
  const url = `https://storage.bunnycdn.com/${storageName}/posters/${fileName}`;

  const options = {
    method: "PUT",
    headers: {
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: readStream,
    duplex: "half",
  };

  try {
    await fetchWithRetry({ url, options });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: "Failed to upload image" },
    };
  }
}

async function updateVideo({
  videoData,
}: {
  videoData: UpdateVideoModel;
}): Promise<BunnyMethodReturn<VideoDbEntry>> {
  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoData.guid}`;

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
    body: JSON.stringify({
      title: videoData.title,
      collectionId: process.env.BUNNY_STREAM_COLLECTION_ID,
      chapters: null,
      moments: null,
      metaTags: videoData.metaTags,
    } as UpdateVideoModel),
  };

  try {
    const res = await fetchWithRetry({ url, options });

    if (!res || !res.ok) throw new Error("Failed to fetch video data");

    const video: VideoDbEntry = await res.json();

    return { success: true, data: [video] };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to update video data" },
    };
  }
}

async function deleteCaption({
  videoId,
  srclang,
}: {
  videoId: string;
  srclang: string;
}): Promise<BunnyMethodReturn<[]>> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}/captions/${srclang}`;

  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  try {
    await fetchWithRetry({ url, options });

    return { success: true, data: [] };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to delete subtitles" },
    };
  }
}

async function uploadCaptions({
  videoId,
  srclang,
  label,
  captions,
}: {
  videoId: string;
  srclang: string;
  label: string;
  captions: string;
}): Promise<BunnyMethodReturn<[]>> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const buffer = Buffer.from(captions);
  const captionsFile = buffer.toString("base64");

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}/captions/${srclang}`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
    body: JSON.stringify({
      captionsFile,
      srclang,
      label,
    }),
  };
  try {
    await fetchWithRetry({ url, options });

    await deleteCaption({
      videoId,
      srclang: `${srclang}-auto`,
    });

    return { success: true, data: [] };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to save captions" },
    };
  }
}

async function purgeCaptionsCash({
  videoId,
}: {
  videoId: string;
}): Promise<BunnyMethodReturn<[]>> {
  if (!process.env.BUNNY_STREAM_PULL_ZONE || !process.env.BUNNY_ADMIN_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://api.bunny.net/purge?url=https%3A%2F%2F${process.env.BUNNY_STREAM_PULL_ZONE}.b-cdn.net%2F${videoId}%2Fcaptions%2F%2A&async=false`;
  const options = {
    method: "POST",
    headers: {
      AccessKey: process.env.BUNNY_ADMIN_API_KEY,
    },
  };

  try {
    await fetchWithRetry({ url, options });

    return { success: true, data: [] };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to purge captions cache" },
    };
  }
}
