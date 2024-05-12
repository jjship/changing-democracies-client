"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate } from "@/auth/actions";
import Photobooth from "@/components/admin/photobooth/Photobooth";
import Posters from "../../../components/admin/photobooth/Posters";
import { getPosters } from "../../../../lib/bunnyMethods";

export default async function PostersPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth");

  const postersRes = await getPosters();

  if (!postersRes.success) {
    console.error(postersRes.error);
  }

  return (
    <>
      {user && postersRes.data ? (
        <>
          <Posters posters={postersRes.data} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
