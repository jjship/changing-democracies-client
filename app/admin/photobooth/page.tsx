"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate, logout } from "@/auth/actions";
import LocationForm from "../../components/admin/photobooth/LocationForm";

export default async function PhotoboothPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth");

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
            <LocationForm />
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
