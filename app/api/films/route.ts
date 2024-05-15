import { NextResponse } from "next/server";
import { getVideos } from "@/components/admin/actions";
import { VideoDbEntry } from "../../../types/videos";

export async function GET() {
  const { data, error } = await getVideos();

  const tags = data.reduce((prev: Set<string>, film: VideoDbEntry) => {
    parseTags(film.metaTags).forEach((tag) => prev.add(tag));
    return prev;
  }, new Set<string>());

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ films: data, tags: Array.from(tags) });
}

function parseTags(
  metaTags: {
    property: string;
    value: string;
  }[],
): string[] {
  if (!metaTags) return [];
  const tags: string[] | undefined = metaTags
    .find((tag) => tag.property === "tags")
    ?.value?.split(",");

  return tags ?? [];
}
