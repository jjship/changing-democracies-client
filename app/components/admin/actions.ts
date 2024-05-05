"use server";

import "server-only";
import { createClient } from "@/supabase/clients/server";
import { VideoDbEntry } from "@/types/videos";
import { getCollection, getVideo } from "@/lib/bunnyMethods";
import { authenticate } from "@/auth/actions";

export { authenticate, getEvents, deleteEvent, getVideos };

async function getEvents() {
  const supabase = createClient();

  await authenticate(supabase);

  const { data, error } = await supabase.from("events").select();

  if (error) {
    throw error;
  }

  return data;
}

async function deleteEvent(eventId: number) {
  const supabase = createClient();

  await authenticate(supabase);

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    return error;
  }
}
