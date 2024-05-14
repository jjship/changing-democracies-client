"use server";

import "server-only";

import { BunnyPoster, deleteBunnyPoster, getPosters } from "@/lib/bunnyMethods";
import { PosterDbEntry, PosterInsertModel } from "@/types/database";
import { createClient } from "@/supabase/clients/server";
import { authenticate } from "@/auth/actions";
import saveAs from "file-saver";

export { fetchPosters, updatePoster, deletePoster };

export type Poster = Pick<
  PosterDbEntry,
  "url" | "location" | "published" | "bunny_id"
> &
  Pick<BunnyPoster, "StorageZoneName" | "Path" | "ObjectName">;

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

  console.log({ dbPosters });

  const { data: bunnyPosters, error: bunnyError } = await getPosters();

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
      (dbPoster) => dbPoster.bunny_id === bunnyPoster.Guid,
    );

    return {
      url: dbPoster?.url ?? getPosterUrl(bunnyPoster.ObjectName),
      location: dbPoster?.location ?? "",
      published: dbPoster?.published ?? false,
      bunny_id: bunnyPoster.Guid,
      StorageZoneName: bunnyPoster.StorageZoneName,
      Path: bunnyPoster.Path,
      ObjectName: bunnyPoster.ObjectName,
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

  const location = poster.ObjectName.split(".")[0].split("_").pop() ?? "";

  const url = getPosterUrl(poster.ObjectName);

  const posterData: PosterInsertModel = {
    url,
    location,
    published: poster.published,
    bunny_id: poster.bunny_id,
  };

  const { data, error } = await supabase.from("posters").upsert(posterData);
  console.log("publish", { published: poster.published, data });

  if (error) {
    return { success: false, error: "could not publish poster" };
  }

  return { success: true };
}

async function deletePoster(poster: Poster): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = createClient();
  await authenticate(supabase);

  const { error: dbError } = await supabase
    .from("posters")
    .delete()
    .eq("bunny_id", poster.bunny_id);
  if (dbError) {
    return { success: false, error: "could not delete poster" };
  }
  const { error: bunnyError } = await deleteBunnyPoster({ poster });

  if (bunnyError) {
    return { success: false, error: "could not delete poster from Bunny" };
  }
  return { success: true };
}

function getPosterUrl(fileName: Poster["ObjectName"]) {
  return `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${fileName}`;
}
