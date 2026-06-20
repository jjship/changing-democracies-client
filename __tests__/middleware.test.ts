import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/supabase/middleware", () => ({
  updateSession: vi.fn().mockResolvedValue(
    new Response(null, { status: 200 }),
  ),
}));

vi.mock("@/utils/env", () => ({
  clientEnv: () => ({
    NEXT_PUBLIC_SUPABASE_URL: "https://supabase.example.com",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon123",
    NEXT_PUBLIC_STORAGE_PULL_ZONE: "cpz1",
    NEXT_PUBLIC_LIBRARY_ID: "clib1",
    NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE: "vz-cac74041-8b3",
  }),
}));

import { middleware } from "../middleware";
import { updateSession } from "@/supabase/middleware";

function makeRequest(path: string, options: { cookie?: string; acceptLanguage?: string } = {}) {
  const url = `http://localhost:3000${path}`;
  const headers = new Headers();
  if (options.acceptLanguage) {
    headers.set("accept-language", options.acceptLanguage);
  }
  const req = new NextRequest(url, { headers });
  if (options.cookie) {
    req.cookies.set("NEXT_LOCALE", options.cookie);
  }
  return req;
}

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes through API routes", async () => {
    const res = await middleware(makeRequest("/api/downloadImage"));
    expect(res.status).toBe(200);
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("passes through sitemap.xml", async () => {
    const res = await middleware(makeRequest("/sitemap.xml"));
    expect(res.status).toBe(200);
  });

  it("passes through robots.txt", async () => {
    const res = await middleware(makeRequest("/robots.txt"));
    expect(res.status).toBe(200);
  });

  it("delegates admin routes to updateSession", async () => {
    await middleware(makeRequest("/admin/dashboard"));
    expect(updateSession).toHaveBeenCalled();
  });

  it("delegates login routes to updateSession", async () => {
    await middleware(makeRequest("/login"));
    expect(updateSession).toHaveBeenCalled();
  });

  it("redirects with locale prefix when locale is missing", async () => {
    const res = await middleware(makeRequest("/free-browsing", { acceptLanguage: "en" }));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/en/free-browsing");
  });

  it("uses cookie locale when present", async () => {
    const res = await middleware(makeRequest("/free-browsing", { cookie: "nl" }));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/nl/free-browsing");
  });

  it("does not redirect when locale is already in path", async () => {
    const res = await middleware(makeRequest("/en/free-browsing"));
    // Should not redirect (200, not 307)
    expect(res.status).toBe(200);
  });

  it("sets NEXT_LOCALE cookie when cookie is missing and locale is in path", async () => {
    const res = await middleware(makeRequest("/nl/narratives"));
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("NEXT_LOCALE=nl");
  });
});
