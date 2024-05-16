"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate } from "@/auth/actions";
import Photobooth from "@/components/admin/photobooth/Photobooth";
import Posters from "../../../components/admin/photobooth/Posters";
import { getPosters } from "../../../../lib/bunnyMethods";

export default async function PostersPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth/posters");

  const postersRes = await getPosters();

  if (!postersRes.success) {
    //TODO show error message
    console.error(postersRes.error);
  }

  return (
    <div className="min-h-screen bg-puprple_lightest_bg">
      {user && postersRes.data ? (
        <>
          <Posters posters={postersRes.data} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

async function getPosters(): Promise<{
  success: boolean;
  data: BunnyPoster[];
  error?: { message: string; status: number };
}> {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = "https://storage.bunnycdn.com/cd-dev-storage/posters/";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch posters data", status: res.status },
    };
  }

  const posters: BunnyPoster[] = (await res.json()) as BunnyPoster[];

  return { success: true, data: posters };
}
