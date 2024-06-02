"use server";

import "server-only";

import { PosterDbEntry, PosterInsertModel } from "@/types/database";
import { createClient } from "@/supabase/clients/server";
import { authenticate } from "@/auth/actions";
import {
  PosterMetadata,
  deleteBunnyPoster,
  getPostersMetadata,
} from "@/utils/posters-methods";

export { fetchPosters, updatePoster, deletePoster };

export type Poster = Pick<
  PosterDbEntry,
  "url" | "location" | "published" | "bunny_id"
> &
  Pick<PosterMetadata, "fileName">;

async function fetchPosters(): Promise<{
  success: boolean;
  data: Poster[];
  error?: string;
}> {
  const supabase = createClient();

  await authenticate(supabase);

  const { data: dbPosters, error: dbError } = await supabase
    .from("posters")
    .select();

  const { data: bunnyPosters, error: bunnyError } = await getPostersMetadata();

  if (dbError || bunnyError) {
    return {
      success: false,
      data: [],
      error: `could not fetch posters, error: "${dbError ?? ""} ${
        bunnyError ?? ""
      }"`,
    };
  }

  const posters: Poster[] = bunnyPosters.map((bunnyPoster) => {
    const dbPoster = dbPosters.find(
      (dbPoster) => dbPoster.bunny_id === bunnyPoster.id,
    );

    return {
      url: dbPoster?.url ?? getPosterUrl(bunnyPoster.fileName),
      location: dbPoster?.location ?? "",
      published: dbPoster?.published ?? false,
      bunny_id: bunnyPoster.id,
      fileName: bunnyPoster.fileName,
    };
  });

  return { success: true, data: posters };
}

async function updatePoster(poster: Poster): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = createClient();

  await authenticate(supabase);

  const location = poster.fileName.split(".")[0].split("_").pop() ?? "";

  const url = getPosterUrl(poster.fileName);

  const posterData: PosterInsertModel = {
    url,
    location,
    published: poster.published,
    bunny_id: poster.bunny_id,
  };

  const { data, error } = await supabase.from("posters").upsert(posterData);

  if (error) {
    return { success: false, error: "could not publish poster" };
  }

  return { success: true };
}

async function deletePoster(fileName: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const { error: bunnyError } = await deleteBunnyPoster({
    fileName: fileName,
  });

  if (bunnyError) {
    return { success: false, error: "could not delete poster from Bunny" };
  }
  return { success: true };
}

function getPosterUrl(fileName: Poster["fileName"]) {
  return `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${fileName}`;
}
