import { describe, it, expect, vi, beforeEach } from "vitest";

const VALID_SERVER_ENV = {
  BACKEND_API_URL: "https://api.example.com",
  BACKEND_API_KEY: "key123",
  BUNNY_STREAM_API_KEY: "bkey",
  BUNNY_STREAM_LIBRARY_ID: "lib1",
  BUNNY_STREAM_COLLECTION_ID: "col1",
  BUNNY_SCROLL_DOC_COLLECTION_ID: "scol1",
  BUNNY_STREAM_PULL_ZONE: "zone1",
  BUNNY_STORAGE_API_KEY: "skey",
  BUNNY_STORAGE_NAME: "store",
  BUNNY_STORAGE_PULL_ZONE_ID: "spz1",
  BUNNY_ADMIN_API_KEY: "akey",
  RESEND_API_KEY: "rkey",
};

const VALID_CLIENT_ENV = {
  NEXT_PUBLIC_SUPABASE_URL: "https://supabase.example.com",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon123",
  NEXT_PUBLIC_STORAGE_PULL_ZONE: "cpz1",
  NEXT_PUBLIC_LIBRARY_ID: "clib1",
};

async function freshImport() {
  vi.resetModules();
  return import("../env");
}

describe("serverEnv", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("passes with valid env", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    const { serverEnv } = await freshImport();
    expect(serverEnv().BACKEND_API_URL).toBe("https://api.example.com");
  });

  it("throws on missing required var", async () => {
    // Only set some vars, missing BACKEND_API_KEY etc
    vi.stubEnv("BACKEND_API_URL", "https://api.example.com");
    const { serverEnv } = await freshImport();
    expect(() => serverEnv()).toThrow("Missing or invalid server");
  });

  it("applies SITE_URL default when omitted", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    const { serverEnv } = await freshImport();
    expect(serverEnv().SITE_URL).toBe("https://www.changingdemocracies.eu");
  });

  it("allows optional GOOGLE_SITE_VERIFICATION to be omitted", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    const { serverEnv } = await freshImport();
    expect(serverEnv().GOOGLE_SITE_VERIFICATION).toBeUndefined();
  });

  it("rejects invalid URL format", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    vi.stubEnv("BACKEND_API_URL", "not-a-url");
    const { serverEnv } = await freshImport();
    expect(() => serverEnv()).toThrow("Missing or invalid server");
  });

  it("rejects invalid VERCEL_ENV value", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    vi.stubEnv("VERCEL_ENV", "staging");
    const { serverEnv } = await freshImport();
    expect(() => serverEnv()).toThrow("Missing or invalid server");
  });

  it("caches result (singleton)", async () => {
    for (const [k, v] of Object.entries(VALID_SERVER_ENV)) {
      vi.stubEnv(k, v);
    }
    const { serverEnv } = await freshImport();
    const first = serverEnv();
    const second = serverEnv();
    expect(first).toBe(second);
  });
});

describe("clientEnv", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("passes with valid env", async () => {
    for (const [k, v] of Object.entries(VALID_CLIENT_ENV)) {
      vi.stubEnv(k, v);
    }
    const { clientEnv } = await freshImport();
    expect(clientEnv().NEXT_PUBLIC_SUPABASE_URL).toBe(
      "https://supabase.example.com",
    );
  });

  it("throws on missing NEXT_PUBLIC_SUPABASE_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "key");
    vi.stubEnv("NEXT_PUBLIC_STORAGE_PULL_ZONE", "zone");
    vi.stubEnv("NEXT_PUBLIC_LIBRARY_ID", "lib");
    const { clientEnv } = await freshImport();
    expect(() => clientEnv()).toThrow("Missing or invalid client");
  });

  it("applies NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE default", async () => {
    for (const [k, v] of Object.entries(VALID_CLIENT_ENV)) {
      vi.stubEnv(k, v);
    }
    const { clientEnv } = await freshImport();
    expect(clientEnv().NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE).toBe(
      "vz-cac74041-8b3",
    );
  });
});
