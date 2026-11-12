import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/clients/server";
import { serverEnv } from "@/utils/env";
import { KIOSK_COOKIE, verifyKioskToken } from "./kiosk-token";

/** True when the request carries a kiosk cookie minted with PHOTOBOOTH_KEY. */
export async function hasKioskAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyKioskToken(
    cookieStore.get(KIOSK_COOKIE)?.value,
    serverEnv().PHOTOBOOTH_KEY,
  );
}

/** True when the request carries a valid Supabase session. */
export async function hasAdminSession(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user !== null;
}

/** Photobooth actions and routes: an unlocked kiosk, or a logged-in admin. */
export async function hasKioskOrAdminAccess(): Promise<boolean> {
  if (await hasKioskAccess()) return true;
  return hasAdminSession();
}
