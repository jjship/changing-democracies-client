"use server";

import { createClient } from "@/supabase/clients/server";

import { authenticate, logout } from "@/auth/actions";
import LocationForm from "../../components/admin/photobooth/LocationForm";

export default async function PhotoboothPage() {
  const supabase = createClient();

  const user = await authenticate(supabase, "/admin/photobooth");

  return <>{user ? <LocationForm /> : <p>loading...</p>}</>;
}
