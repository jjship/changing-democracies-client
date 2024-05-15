"use server";

import { NextResponse } from "next/server";

const films = [
  {
    id: "1",
    title: "Film 1",
    country: "Poland",
    tags: ["Private life", "Childhood"],
    videoUrl: "your-video-url-1",
  },
  // Add more film data
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const film = films.find((film) => film.id === params.id);

  if (film) {
    return NextResponse.json(film);
  } else {
    return NextResponse.json({ message: "Film not found" }, { status: 404 });
  }
}
