import { NextResponse } from "next/server";
import { getVideos } from "../components/admin/actions";

export async function GET() {
  const { data, error } = await getVideos();
  console.log({ data });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export type FilmCollection = {
  videoLibraryId: number;
  guid: string;
  name: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds: string;
  previewImageUrls: string[];
};

async function getFilms(): Promise<FilmCollection[]> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos?collectionId=${process.env.BUNNY_STREAM_COLLECTION_ID}?includeThumbnails=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return [] as FilmCollection[];
  }

  const collection: FilmCollection = await res.json();

  return [collection];
}

const collectionPreview: FilmCollection = {
  videoLibraryId: 226154,
  guid: "959010de-bf80-4559-a116-c2a1804f2dc8",
  name: "transcribed",
  videoCount: 5,
  totalSize: 344240609,
  previewVideoIds:
    "a3f7eba6-aa4b-4701-a1af-19d6d53f1e46,7a03907e-d2be-4b5f-9203-bbc5336c7899,87e38755-5b15-47df-9f81-c9efa8657857",
  previewImageUrls: [
    "https://vz-eb5d6b10-75c.b-cdn.net/a3f7eba6-aa4b-4701-a1af-19d6d53f1e46/thumbnail.jpg",
    "https://vz-eb5d6b10-75c.b-cdn.net/87e38755-5b15-47df-9f81-c9efa8657857/thumbnail.jpg",
    "https://vz-eb5d6b10-75c.b-cdn.net/7a03907e-d2be-4b5f-9203-bbc5336c7899/thumbnail.jpg",
  ],
};

const { BUNNY_STREAM_PULL_ZONE } = process.env;

const getThumbnail = (filmId: string) =>
  `https://${BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${filmId}/thumbnail.jpg`;
