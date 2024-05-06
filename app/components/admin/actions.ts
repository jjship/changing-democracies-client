"use server";

import "server-only";
import { createClient } from "@/supabase/clients/server";
import { VideoDbEntry } from "@/types/videos";
import { getCollection, getVideo } from "@/lib/bunnyMethods";
import { authenticate } from "@/auth/actions";
import { EventDbEntry } from "@/types/database";

export { getEvents, getEvent, deleteEvent, saveEvent, getVideos };

async function getEvents() {
  const supabase = createClient();

  await authenticate(supabase);

  const { data, error } = await supabase.from("events").select();

  if (error) {
    throw error;
  }

  return data;
}

async function getEvent(eventId: number) {
  const supabase = createClient();

  await authenticate(supabase);

  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", eventId);

  if (error) {
    throw error;
  }

  return data[0];
}

async function deleteEvent(eventId: number) {
  const supabase = createClient();

  await authenticate(supabase);

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    return { error };
  }
}

async function saveEvent({ event }: { event: EventDbEntry }) {
  const supabase = createClient();

  await authenticate(supabase);

  const { error } = await supabase.from("events").upsert(event);

  if (error) {
    return { error };
  }
}

async function getVideos(): Promise<VideoDbEntry[]> {
  const supabase = createClient();

  await authenticate(supabase);

  const collection = await getCollection();

  const videosIds = collection.previewVideoIds.split(",");

  const videos = await Promise.all(
    videosIds.map((videoId) => getVideo(videoId)),
  );

  return videos;
}
