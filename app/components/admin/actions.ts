"use server";

import "server-only";
import { createClient } from "@/supabase/clients/server";
import {
  UpdateVideoModel,
  fetchCaptions,
  getVideosPerCollection,
  purgeCaptionsCash,
  updateVideo,
  uploadCaptions,
  BunnyMethodReturn,
} from "@/lib/bunnyMethods";
import { authenticate } from "@/auth/actions";
import { EventDbEntry } from "@/types/database";
import { VideoDbEntry } from "../../../types/videos";

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

type EventsMethodReturn<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
};

const supabase = createClient();

async function getEvents(): Promise<EventsMethodReturn<EventDbEntry[]>> {
  await authenticate(supabase);

  const { data, error } = await supabase.from("events").select();

  if (error) {
    return handleError({ name: "Unable to get events list", ...error });
  }

  return { success: true, data };
}

async function getEvent(
  eventId: number,
): Promise<EventsMethodReturn<EventDbEntry>> {
  await authenticate(supabase);

  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", eventId);

  if (error) {
    return handleError({ name: "Unable to get events list", ...error });
  }

  return { success: true, data: data[0] };
}

async function deleteEvent(eventId: number): Promise<EventsMethodReturn> {
  await authenticate(supabase);

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    return handleError({ name: "Unable to delete event", ...error });
  }

  return { success: true };
}

async function saveEvent({
  event,
}: {
  event: EventDbEntry;
}): Promise<EventsMethodReturn> {
  await authenticate(supabase);

  const { error } = await supabase.from("events").upsert(event);

  if (error) {
    return handleError({ name: "Unable to save event", ...error });
  }

  return { success: true };
}

async function getVideos(): Promise<EventsMethodReturn<VideoDbEntry[]>> {
  await authenticate(supabase);

  const { error, ...res } = await getVideosPerCollection();

  if (error) {
    return handleError(error);
  }

  return res;
}

async function saveVideo(
  videoData: UpdateVideoModel,
): Promise<EventsMethodReturn> {
  await authenticate(supabase);

  const { error, ...res } = await updateVideo({ videoData });

  if (error) {
    return handleError(error);
  }

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
}): Promise<EventsMethodReturn> {
  await authenticate(supabase);

  const { error: uploadError } = await uploadCaptions({
    videoId,
    srclang,
    label,
    captions,
  });

  if (uploadError) {
    handleError(uploadError);
  }

  const { error, ...res } = await purgeCaptionsCash({ videoId });

  if (error) {
    return handleError(error);
  }

  return res;
}

async function getSubtitles({
  videoId,
  srclang,
}: {
  videoId: string;
  srclang: string;
}): Promise<EventsMethodReturn<string>> {
  const supabase = createClient();

  await authenticate(supabase);

  const { error, ...res } = await fetchCaptions({ videoId, srclang });

  if (error) {
    return handleError(error);
  }

  return res;
}

const handleError = (error: Error) => {
  console.error(error);

  return {
    success: false,
    error: error.message,
  };
};
