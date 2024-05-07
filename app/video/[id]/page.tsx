"use server";

import { createClient } from "@/supabase/clients/server";
import { authenticate, logout } from "@/auth/actions";
import { FormVideo, VideoDbEntry } from "@/types/videos";
import { getVideo } from "../../../lib/bunnyMethods";
import MetadataForm from "../../components/admin/videos/MetadataForm";
import VideoPlayer from "../../components/admin/videos/VideoPlayer";
import SubtitilesForm from "../../components/admin/videos/SubtitlesForm";

export default async function Video({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const user = await authenticate(supabase);

  const formVideo = await getFormVideo({ videoId: id });

  // TODO handle submit errors

  return (
    <>
      <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
        <div className="flex items-center justify-end gap-4 p-5">
          logged in as {user.email}
          <form action={logout}>
            <button className="bg-red mb-2 rounded bg-red_mains px-4 py-2 text-white">
              Log Out
            </button>
          </form>
        </div>
        <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
          {formVideo ? (
            <>
              <VideoPlayer videoId={formVideo.guid} />
              <div className="flex gap-5 p-5">
                <MetadataForm defaultValues={formVideo} />
                <SubtitilesForm defaultValues={formVideo} />
              </div>
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
  const dbVideo = await getVideo(videoId);

  return parseVideo(dbVideo);
}

function parseVideo(video: VideoDbEntry): FormVideo {
  const { guid, title, length, captions, metaTags } = video;

  return {
    guid,
    title,
    length,
    captions,
    tags:
      metaTags.find((tag) => tag.property === "tags")?.value || "no tags yet",
    description:
      metaTags.find((tag) => tag.property === "description")?.value || "",
  };
}
