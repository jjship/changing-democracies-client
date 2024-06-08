import { NextResponse } from "next/server";
import { BunnyPoster } from "@/utils/posters-methods";

export async function GET() {
  if (
    !process.env.BUNNY_STORAGE_API_KEY ||
    !process.env.BUNNY_STORAGE_PULL_ZONE_ID ||
    !process.env.BUNNY_STORAGE_NAME
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }
  const url = `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/posters/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
    next: { revalidate: 55 },
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("could not fetch posters");
  }

  const posters: BunnyPoster[] = (await res.json()) as BunnyPoster[];

  const list = posters.map((poster) => ({
    id: poster.Guid,
    fileName: poster.ObjectName,
    createdAt: poster.DateCreated,
  }));

  const sortedPosters = list.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json(sortedPosters);
}
