import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "../../../utils/admin/bunny-methods";
import { serializeFilmsCollection } from "../../../utils/films-methods";
import { sectionPadding } from "../../components/Section";
import { narrationPath } from "../../narrations/firstPath";
import {
  FilmData,
  FilmsCollection,
  NarrationFragment,
} from "../../../types/videosAndFilms";

export default async function FreeBrowsingPage() {
  const filmsData = narrationPath;

  const filmsCollection = serializeFilmsCollectionFromNarration({
    fragments: narrationPath.fragments,
  });

  return (
    <main>
      <div
        className={`m-auto max-w-[23.125rem] md:max-w-[64rem] xl:max-w-[90rem] ${sectionPadding.x} ${sectionPadding.y}`}
      >
        <FreeBrowsing filmsCollection={filmsCollection} title={false} />
      </div>
    </main>
  );
}

function serializeFilmsCollectionFromNarration({
  fragments,
}: {
  fragments: NarrationFragment[];
}): FilmsCollection {
  const allSequenceNumbers = fragments.map((vid) => vid.sequence.toString());

  const films: FilmData[] = fragments.map((film) => ({
    guid: film.guid,
    title: film.title,
    length: film.length,
    tags: [film.sequence.toString()],
    person: `${film.sequence.toString()} ${film.person}`,
    country: film.country,
    playerUrl: film.playerUrl,
    thumbnailUrl: film.thumbnailUrl,
  }));

  const countries = new Set<string>();

  const people = new Set<string>();

  for (const f of films) {
    countries.add(f.country);
    people.add(f.person);
  }

  return {
    films,
    tags: allSequenceNumbers,
    countries: Array.from(countries).sort((a, b) => a.localeCompare(b)),
    people: Array.from(people).sort((a, b) => a.localeCompare(b)),
  };
}
