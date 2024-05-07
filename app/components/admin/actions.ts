"use server";

import "server-only";
import { createClient } from "@/supabase/clients/server";
import { VideoDbEntry } from "@/types/videos";
import {
  UpdateVideoModel,
  fetchCaptions,
  getVideosPerCollection,
  updateVideo,
  uploadCaptions,
} from "@/lib/bunnyMethods";
import { authenticate } from "@/auth/actions";
import { EventDbEntry } from "@/types/database";

export {
  getEvents,
  getEvent,
  deleteEvent,
  saveEvent,
  getVideos,
  saveCaptions,
  saveVideo,
  getSubtitles,
};

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

  const videos = await getVideosPerCollection();

  return videos;
}

async function saveVideo(videoData: UpdateVideoModel) {
  const supabase = createClient();

  await authenticate(supabase);

  const res = await updateVideo({ videoData });

  return res;
}

async function saveCaptions({
  videoId,
  srclang,
  label,
  captions,
}: {
  videoId: string;
  srclang: string;
  label: string;
  captions: string;
}) {
  const supabase = createClient();

  await authenticate(supabase);

  const res = await uploadCaptions({ videoId, srclang, label, captions });

  return res;
}

async function getSubtitles({
  videoId,
  srclang,
}: {
  videoId: string;
  srclang: string;
}) {
  const supabase = createClient();

  await authenticate(supabase);

  const subs = await fetchCaptions({ videoId, srclang });

  return subs;
}
