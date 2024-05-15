"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate } from "@/auth/actions";
import Photobooth from "@/components/admin/photobooth/Photobooth";
import Posters from "../../../components/admin/photobooth/Posters";
import { getPosters } from "../../../../lib/bunnyMethods";

export default async function PostersPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth/posters");

  const postersRes = await getPosters();

  if (!postersRes.success) {
    //TODO show error message
    console.error(postersRes.error);
  }

  return (
    <div className="min-h-screen bg-puprple_lightest_bg">
      {user && postersRes.data ? (
        <>
          <Posters posters={postersRes.data} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
