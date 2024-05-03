async function getVideos() {
  console.log("-----------------------", { env: process.env });
  if (
    !process.env.BUNNY_STREAM_ACCESS_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/collections/${process.env.BUNNY_STREAM_COLLECTION_ID}?includeThumbnails=false`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_ACCESS_KEY,
    },
  };

  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch videos data");
  }

  console.log({ res });

  return res.json();
}

export default async function VideosAdmin() {
  const data = await getVideos();

  return <main></main>;
}
