import { describe, it, expect } from "vitest";
import {
  KIOSK_TOKEN_TTL_SECONDS,
  createKioskToken,
  isValidKioskKey,
  verifyKioskToken,
} from "../admin/kiosk-token";

const KEY = "a-sufficiently-long-kiosk-key";

describe("kiosk token", () => {
  it("round-trips with the same key", () => {
    const token = createKioskToken(KEY);
    expect(verifyKioskToken(token, KEY)).toBe(true);
  });

  it("rejects a different key, a tampered token and garbage", () => {
    const token = createKioskToken(KEY);
    expect(verifyKioskToken(token, "another-key-that-is-long")).toBe(false);
    expect(verifyKioskToken(token.replace(/.$/, "0"), KEY)).toBe(false);
    expect(verifyKioskToken(`${token}.extra`, KEY)).toBe(false);
    expect(verifyKioskToken("nonsense", KEY)).toBe(false);
    expect(verifyKioskToken("", KEY)).toBe(false);
    expect(verifyKioskToken(undefined, KEY)).toBe(false);
    expect(verifyKioskToken(token, undefined)).toBe(false);
  });

  it("expires after the TTL", () => {
    const minted = Date.now();
    const token = createKioskToken(KEY, minted);
    const justBefore = minted + (KIOSK_TOKEN_TTL_SECONDS - 1) * 1000;
    const after = minted + (KIOSK_TOKEN_TTL_SECONDS + 1) * 1000;
    expect(verifyKioskToken(token, KEY, justBefore)).toBe(true);
    expect(verifyKioskToken(token, KEY, after)).toBe(false);
  });
});

describe("isValidKioskKey", () => {
  it("matches only the exact configured key", () => {
    expect(isValidKioskKey(KEY, KEY)).toBe(true);
    expect(isValidKioskKey(`${KEY} `, KEY)).toBe(false);
    expect(isValidKioskKey("short", KEY)).toBe(false);
    expect(isValidKioskKey(KEY, undefined)).toBe(false);
  });
});
