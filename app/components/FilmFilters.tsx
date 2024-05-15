"use client";

import React from "react";
import { FilmCollection } from "../../types/videos";

interface FilmListProps {
  filmCollection: FilmCollection;
}

const Filters: React.FC<FilmListProps> = ({ filmCollection }) => {
  return (
    <div className="mb-4 flex space-x-2">
      {filmCollection.tags.map((tag, i) => (
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
