import { NextResponse } from "next/server";
import { getVideos } from "../components/admin/actions";

export async function GET() {
  const { data, error } = await getVideos();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
