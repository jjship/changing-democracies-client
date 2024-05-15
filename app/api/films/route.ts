import { NextResponse } from "next/server";
import { getVideos } from "@/components/admin/actions";
import { Film, VideoDbEntry, FilmsCollection } from "@/types/videos";

export type RouteError = {
  message: string;
  code?: number;
};

export async function GET(): Promise<
  NextResponse<FilmsCollection | RouteError>
> {
  const { data, error } = await getVideos();

  if (error) {
    console.log({ error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const allTags = data.reduce((prev: Set<string>, film: VideoDbEntry) => {
    parseTags(film.metaTags).forEach((tag) => prev.add(tag));
    return prev;
  }, new Set<string>());

  const films: Film[] = data.map((film) => ({
    guid: film.guid,
    title: film.title,
    length: film.length,
    tags: parseTags(film.metaTags),
    person: film.title.split("_")[2],
    country: film.title.split("_")[1],
  }));

  const countries = new Set<string>();
  const people = new Set<string>();
  for (const f of films) {
    countries.add(f.country);
    people.add(f.person);
  }

  return NextResponse.json({
    films,
    tags: Array.from(allTags),
    countries: Array.from(countries),
    people: Array.from(people),
  });
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
