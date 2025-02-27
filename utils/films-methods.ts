import {
  VideoDbEntry,
  FilmsCollection,
  FilmData,
} from "../types/videosAndFilms";

export { parseTags, serializeFilmsCollection, getThumbnail };

function serializeFilmsCollection({
  videos,
}: {
  videos: VideoDbEntry[];
}): FilmsCollection {
  const allTags = videos.reduce((prev: Set<string>, film: VideoDbEntry) => {
    parseTags(film.metaTags).forEach((tag) => prev.add(tag));
    return prev;
  }, new Set<string>());

  const films: FilmData[] = videos.map((film) => ({
    guid: film.guid,
    title: film.title,
    length: film.length,
    tags: parseTags(film.metaTags),
    person: film.title.split("_")[2],
    country: film.title.split("_")[1],
    playerUrl: getFilmUrl(film.guid),
    thumbnailUrl: getThumbnail({
      id: film.guid,
      fileName: film.thumbnailFileName,
    }),
    captions: film.captions,
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

const getThumbnail = ({ id, fileName }: { id: string; fileName: string }) =>
  `https://${process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${id}/${fileName}`;

const getFilmUrl = (filmId: string) =>
  `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${filmId}?autoplay=false`;
