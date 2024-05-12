"use server";

import { createClient } from "@/supabase/clients/server";
import { authenticate, logout } from "@/auth/actions";
import { FormVideo, VideoDbEntry } from "@/types/videos";
import { getVideo } from "@/lib/bunnyMethods";
import VideoPlayer from "@/components/admin/videos/VideoPlayer";
import VideoForm from "@/components/admin/videos/VideoForm";
import { Button } from "@/components/ui/button";

export default async function Video({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const user = await authenticate(supabase);

  const formVideo = await getFormVideo({ videoId: id });

  return (
    <>
      <div className="min-h-screen flex-col bg-puprple_lightest_bg ">
        <div className="flex items-center justify-end gap-5 p-5">
          logged in as {user.email}
          <form action={logout}>
            <Button className="bg-red rounded bg-red_mains px-4 text-white">
              Log Out
            </Button>
          </form>
        </div>
        <div className="flex min-h-screen w-full flex-col bg-puprple_lightest_bg">
          {formVideo ? (
            <>
              <VideoPlayer videoId={formVideo.guid} />
              <VideoForm formVideo={formVideo} />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

async function getFormVideo({
  videoId,
}: {
  videoId: string;
}): Promise<FormVideo> {
  const { data, error } = await getVideo(videoId);

  if (data) {
    return parseVideo(data);
  }

  throw error ?? new Error("unable to get video");
}

function parseVideo(video: VideoDbEntry): FormVideo {
  const { guid, title, length, captions, metaTags } = video;

  return {
    guid,
    title,
    length: `${Math.floor(length / 60)}:${length % 60}`,
    captions,
    tags: metaTags.find((tag) => tag.property === "tags")?.value || "",
    description:
      metaTags.find((tag) => tag.property === "description")?.value || "",
  };
}
