"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate } from "@/auth/actions";
import Photobooth from "@/components/admin/photobooth/Photobooth";

export default async function PhotoboothPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth");

  return (
    <>
      {user ? (
        <>
          <Photobooth />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
