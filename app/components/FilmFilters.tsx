"use client";

import React from "react";
import { VideoDbEntry, parseTags } from "../../types/videos";

interface FilmListProps {
  films: VideoDbEntry[];
}

const Filters: React.FC<FilmListProps> = ({ films }) => {
  const tags = films.map((film: VideoDbEntry) => {
    return parseTags(film.metaTags);
  });

  return (
    <div className="mb-4 flex space-x-2">
      {tags.map((tag, i) => (
        <button
          key={i}
          className="rounded bg-green_accent px-4 py-2 text-black transition-colors hover:bg-yellow_secondary"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Filters;
