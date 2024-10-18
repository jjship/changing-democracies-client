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
  uploadImage,
} from "@/utils/admin/bunny-methods";
import { authenticate } from "@/auth/actions";
import { EventDbEntry } from "@/types/database";
import { VideoDbEntry } from "@/types/videosAndFilms";

export {
  getEvents,
  getEvent,
  deleteEvent,
  saveEvent,
  getVideos,
  saveCaptions,
  saveVideo,
  getSubtitles,
  saveImage,
};

export type NoDataMethodReturn = {
  success: boolean;
  error?: string;
};

export type EventsMethodReturn<T> = {
  success: boolean;
  data?: T[];
  error?: string;
};

export type FilmsMethodReturn<T> = {
  success: boolean;
  data: T[];
  error?: { message: string };
};

async function getVideos(): Promise<FilmsMethodReturn<VideoDbEntry>> {
  const { error, ...res } = await getVideosPerCollection();

  if (error) {
    console.error(error);
    return { success: false, data: [], error };
  }

  return res;
}

async function getEvents(): Promise<FilmsMethodReturn<EventDbEntry>> {
  const supabase = createClient();

  await authenticate(supabase);

  const { error, data } = await supabase.from("events").select();

  if (error) {
    return { success: false, data: [], error };
  }

  return { success: true, data };
}

async function getEvent(
  eventId: number,
): Promise<EventsMethodReturn<EventDbEntry>> {
  const supabase = createClient();

  await authenticate(supabase);

  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", eventId);

  if (error) {
    return handleError({ message: "Unable to get events list" });
  }

  return { success: true, data };
}

async function deleteEvent(eventId: number): Promise<NoDataMethodReturn> {
  const supabase = createClient();

  await authenticate(supabase);

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    return handleError({ message: "Unable to delete event" });
  }

  return { success: true };
}

async function saveEvent({
  event,
}: {
  event: EventDbEntry;
}): Promise<NoDataMethodReturn> {
  const supabase = createClient();

  await authenticate(supabase);

  const { error } = await supabase.from("events").upsert(event);

  if (error) {
    return handleError({ message: "Unable to save event" });
  }

  return { success: true };
}

async function saveVideo(
  videoData: UpdateVideoModel,
): Promise<NoDataMethodReturn> {
  const supabase = createClient();

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
}): Promise<NoDataMethodReturn> {
  const supabase = createClient();

  await authenticate(supabase);

  if (!srclang) {
    return { success: true };
  }

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

async function saveImage(formData: FormData): Promise<NoDataMethodReturn> {
  const { error } = await uploadImage({
    blob: formData.get("blob") as Blob,
    fileName: formData.get("fileName") as string,
  });

  if (error) {
    return handleError({ message: "Unable to upload image" });
  }

  return { success: true };
}

const handleError = (error: { message: string }) => {
  console.error(error);

  return {
    success: false,
    error: error.message,
  };
};
