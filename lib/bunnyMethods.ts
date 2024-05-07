import "server-only";
import { Collection, VideoDbEntry } from "@/types/videos";

export {
  getCollection,
  getVideo,
  getVideosPerCollection,
  updateVideo,
  uploadCaptions,
  fetchCaptions,
};

export type UpdateVideoModel = {
  guid: string;
  title?: string | null;
  collectionId?: string | null;
  chapters?: Record<string, any> | null;
  moments?: Record<string, any> | null;
  metaTags?: { property: string; value: string }[] | null;
};

async function getCollection(): Promise<Collection> {
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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch collection data");
  }

  return res.json();
}

async function getVideo(videoId: string): Promise<VideoDbEntry> {
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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch videos data");
  }

  return res.json();
}

async function updateVideo({
  videoData,
}: {
  videoData: UpdateVideoModel;
}): Promise<{ success: Boolean; error?: Error }> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoData.guid}`;

  const body = JSON.stringify({
    title: videoData.title,
    collectionId: process.env.BUNNY_STREAM_COLLECTION_ID,
    chapters: null,
    moments: null,
    metaTags: videoData.metaTags,
  } as UpdateVideoModel);

  console.dir(body, { depth: null });

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
    body,
  };

  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return { success: false, error: new Error("Failed to update video data") };
  }

  return { success: true };
}

async function getVideosPerCollection(): Promise<VideoDbEntry[]> {
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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch videos data");
  }

  const { items } = await res.json();

  return items;
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
}): Promise<{ success: Boolean; error?: Error }> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const buffer = Buffer.from(captions);

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}/captions/${srclang}`;
  console.log(url);
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
    body: JSON.stringify({
      captionsFile: buffer.toString("base64"),
      srclang,
      label,
    }),
  };
  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  console.log("uploadCaptions", { status: res.status });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return { success: false, error: new Error("Failed to update video data") };
  }

  return { success: true };
}

async function fetchCaptions({
  videoId,
  srclang,
}: {
  videoId: string;
  srclang: string;
}): Promise<string> {
  const url = `https://${process.env.BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${videoId}/captions/${srclang}.vtt`;
  console.log(url);
  const options = {
    method: "GET",
    accept: "*/*",
  };

  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // console.log(await res.blob());

  if (!res.ok) {
    console.error(res.statusText);
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch captions");
  }

  const data = await res.text();

  console.log("fetchCaptions", { data });

  return data;
}
