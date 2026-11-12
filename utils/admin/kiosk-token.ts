import { createHmac, timingSafeEqual } from "node:crypto";

export const KIOSK_COOKIE = "cd_kiosk";
export const KIOSK_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 180;

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);
  return bytesA.byteLength === bytesB.byteLength && timingSafeEqual(bytesA, bytesB);
}

/**
 * Kiosk token = "<unix expiry>.<hmac(expiry)>". Only a server holding
 * PHOTOBOOTH_KEY can mint one, so a stolen cookie never reveals the key.
 */
export function createKioskToken(key: string, now: number = Date.now()): string {
  const exp = String(Math.floor(now / 1000) + KIOSK_TOKEN_TTL_SECONDS);
  return `${exp}.${sign(exp, key)}`;
}

export function verifyKioskToken(
  token: string | undefined,
  key: string | undefined,
  now: number = Date.now(),
): boolean {
  if (!token || !key) return false;

  const [exp, sig, ...rest] = token.split(".");
  if (!exp || !sig || rest.length > 0 || !/^\d{1,12}$/.test(exp)) return false;
  if (Number(exp) * 1000 <= now) return false;

  return safeEqual(sig, sign(exp, key));
}

/** Constant-time comparison of a submitted key against the configured one. */
export function isValidKioskKey(
  candidate: string,
  key: string | undefined,
): boolean {
  if (!key) return false;
  return safeEqual(sign(candidate, "kiosk-key"), sign(key, "kiosk-key"));
}
