import "server-only";
import { Collection, VideoDbEntry } from "@/types/videos";

export {
  getCollection,
  getVideo,
  getVideosPerCollection,
  updateVideo,
  deleteCaption,
  uploadCaptions,
  fetchCaptions,
  purgeCaptionsCash,
  uploadImage,
  getPosters,
  deleteBunnyPoster,
};

export type UpdateVideoModel = {
  guid: string;
  title?: string | null;
  collectionId?: string | null;
  chapters?: Record<string, any> | null;
  moments?: Record<string, any> | null;
  metaTags?: { property: string; value: string }[] | null;
};

export type BunnyPoster = {
  Guid: string;
  StorageZoneName: string;
  Path: string;
  ObjectName: string;
  Length: number;
  LastChanged: string;
  ServerId: number;
  ArrayNumber: number;
  IsDirectory: boolean;
  UserId: string;
  ContentType: string;
  DateCreated: string;
  StorageZoneId: number;
  Checksum: string;
  ReplicatedZones: string;
};

export type BunnyMethodReturn<T> = {
  success: boolean;
  data: T[];
  error?: { message: string; status: number };
};

async function uploadImage({
  blob,
  fileName,
}: {
  blob: Blob;
  fileName: string;
}) {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const readStream = blob.stream();

  const storageName = "cd-dev-storage";
  const host = "https://storage.bunnycdn.com";
  const path = `/${storageName}/posters/${fileName}`;

  const options = {
    method: "PUT",
    headers: {
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: readStream,
    duplex: "half",
  };

  const res = await fetch(host + path, options);

  if (!res.ok) {
    return {
      success: false,
      error: { message: "Failed to upload image", status: res.status },
    };
  }

  return { success: true };
}

async function getPosters(): Promise<{
  success: boolean;
  data: BunnyPoster[];
  error?: { message: string; status: number };
}> {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = "https://storage.bunnycdn.com/cd-dev-storage/posters/";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch posters data", status: res.status },
    };
  }

  const posters: BunnyPoster[] = (await res.json()) as BunnyPoster[];

  return { success: true, data: posters };
}

async function deleteBunnyPoster({
  poster,
}: {
  poster: Pick<BunnyPoster, "Path" | "StorageZoneName" | "ObjectName">;
}): Promise<
  BunnyMethodReturn<
    Pick<BunnyPoster, "Path" | "StorageZoneName" | "ObjectName">
  >
> {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://storage.bunnycdn.com${poster.Path}${poster.ObjectName}`;

  const options = {
    method: "DELETE",
    headers: {
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to delete poster", status: res.status },
    };
  }

  return { success: true, data: [] };
}

async function getCollection(): Promise<BunnyMethodReturn<Collection>> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/collections/${process.env.BUNNY_STREAM_COLLECTION_ID}?includeThumbnails=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: {
        message: "Failed to fetch video collection data",
        status: res.status,
      },
    };
  }

  const collection: Collection = await res.json();

  return { data: [collection], success: true };
}

async function getVideo(
  videoId: string,
): Promise<BunnyMethodReturn<VideoDbEntry>> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch video data", status: res.status },
    };
  }

  const video: VideoDbEntry = await res.json();

  return { data: [video], success: true };
}

async function updateVideo({
  videoData,
}: {
  videoData: UpdateVideoModel;
}): Promise<BunnyMethodReturn<[]>> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

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

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to update video data", status: res.status },
    };
  }

  return { success: true, data: [] };
}

async function getVideosPerCollection(): Promise<
  BunnyMethodReturn<VideoDbEntry>
> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos?collectionId=${process.env.BUNNY_STREAM_COLLECTION_ID}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch videos data", status: res.status },
    };
  }

  const { items }: { items: VideoDbEntry[] } = await res.json();

  return {
    data: items.sort((a, b) => a.title.localeCompare(b.title)),
    success: true,
  };
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

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to delete subtitles", status: res.status },
    };
  }

  return { success: true, data: [] };
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
  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to save captions", status: res.status },
    };
  }

  return { success: true, data: [] };
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

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch captions", status: res.status },
    };
  }

  const caps = await res.text();

  return { data: [caps], success: true };
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

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to purge captions cache", status: res.status },
    };
  }

  return { success: true, data: [] };
}
