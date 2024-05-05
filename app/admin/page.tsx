"use server";

import { createClient } from "@/supabase/clients/server";
import EventsAdmin from "@/components/admin/events/EventsAdmin";
import VideosAdmin from "@/components/admin/videos/VideosAdmin";
import { authenticate, logout } from "@/auth/actions";

export default async function Admin() {
  const supabase = createClient();

  const user = await authenticate(supabase);

  return (
    <>
      {user ? (
        <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
          <div className="flex items-center justify-end gap-4 p-5">
            logged in as {user.email}
            <form action={logout}>
              <button className="bg-red mb-2 rounded bg-red_mains px-4 py-2 text-white">
                Log Out
              </button>
            </form>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
            <EventsAdmin />
            <VideosAdmin />
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
