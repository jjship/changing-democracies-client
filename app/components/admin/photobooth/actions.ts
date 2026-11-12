"use server";

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverEnv } from "@/utils/env";
import {
  KIOSK_COOKIE,
  KIOSK_TOKEN_TTL_SECONDS,
  createKioskToken,
  isValidKioskKey,
} from "@/utils/admin/kiosk-token";

export type UnlockKioskState = { error: string | null };

/** Unlocks this browser as a photobooth kiosk by setting a signed httpOnly cookie. */
export async function unlockKiosk(
  _prev: UnlockKioskState,
  formData: FormData,
): Promise<UnlockKioskState> {
  const key = serverEnv().PHOTOBOOTH_KEY;
  if (!key) {
    return { error: "Photobooth is not configured on this deployment." };
  }

  const candidate = formData.get("key");
  if (typeof candidate !== "string" || !isValidKioskKey(candidate, key)) {
    return { error: "Wrong key." };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: KIOSK_COOKIE,
    value: createKioskToken(key),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: KIOSK_TOKEN_TTL_SECONDS,
  });

  redirect("/admin/photobooth");
}
