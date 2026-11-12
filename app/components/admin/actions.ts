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
import { hasKioskOrAdminAccess } from "@/utils/admin/access";
import { isPosterFileName } from "@/utils/admin/poster-file-name";
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

const MAX_POSTER_BYTES = 10 * 1024 * 1024;

async function getVideos(): Promise<FilmsMethodReturn<VideoDbEntry>> {
  const supabase = await createClient();

  await authenticate(supabase);

  const { error, ...res } = await getVideosPerCollection({
    collectionKey: undefined,
  });

  if (error) {
    console.error(error);
    return { success: false, data: [], error };
  }

  return res;
}

async function getEvents(): Promise<FilmsMethodReturn<EventDbEntry>> {
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

  await authenticate(supabase);

  const { error, ...res } = await fetchCaptions({ videoId, srclang });

  if (error) {
    return handleError(error);
  }

  return res;
}

async function saveImage(formData: FormData): Promise<NoDataMethodReturn> {
  if (!(await hasKioskOrAdminAccess())) {
    return handleError({ message: "Unauthorized" });
  }

  const blob = formData.get("blob");
  const fileName = formData.get("fileName");

  if (
    !(blob instanceof Blob) ||
    blob.size === 0 ||
    blob.size > MAX_POSTER_BYTES ||
    blob.type !== "image/jpeg"
  ) {
    return handleError({ message: "Invalid poster image" });
  }

  if (!isPosterFileName(fileName)) {
    return handleError({ message: "Invalid poster file name" });
  }

  const { error } = await uploadImage({ blob, fileName });

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
