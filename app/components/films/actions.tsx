"use server";

import "server-only";
import { getVideos } from "@/components/admin/actions";
import { Film, VideoDbEntry, FilmsCollection } from "@/types/videos";
import { cache } from "react";

export { getFilms };

const getFilms = cache(async (): Promise<FilmsCollection> => {
  const { data, error } = await getVideos();

  if (error) {
    console.log({ error });
    throw error;
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

  return {
    films,
    tags: Array.from(allTags).sort((a, b) => a.localeCompare(b)),
    countries: Array.from(countries).sort((a, b) => a.localeCompare(b)),
    people: Array.from(people).sort((a, b) => a.localeCompare(b)),
  };
});

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
