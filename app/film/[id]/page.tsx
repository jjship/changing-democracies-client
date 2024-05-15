"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Film {
  id: string;
  title: string;
  country: string;
  tags: string[];
  videoUrl: string;
}

const FilmPlayer = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/films/${params.id}`)
        .then((response) => response.json())
        .then((data) => setFilm(data));
    }
  }, [params.id]);

  if (!film) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black text-white">
      <iframe
        src={`https://bunny.net/stream/cdn-player/${film.videoUrl}`}
        frameBorder="0"
        allowFullScreen
        className="h-4/5 w-4/5"
      ></iframe>
      <h1 className="mt-4 text-3xl font-bold">{film.title}</h1>
      <p className="mt-2 text-xl">{film.country}</p>
      <p className="mt-2 text-lg">{film.tags.join(", ")}</p>
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 transition-colors hover:bg-red-700"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default FilmPlayer;
