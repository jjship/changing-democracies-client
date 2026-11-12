import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const mockAccess = vi.hoisted(() => vi.fn());

vi.mock("@/utils/env", () => ({
  clientEnv: () => ({ NEXT_PUBLIC_STORAGE_PULL_ZONE: "cd-test-pull" }),
}));

vi.mock("@/utils/admin/access", () => ({
  hasKioskOrAdminAccess: mockAccess,
}));

import { GET } from "../route";

const VALID_URL =
  "https://cd-test-pull.b-cdn.net/posters/poster_abc123_TEST.jpeg";

function makeRequest(url?: string) {
  const base = "http://localhost:3000/api/downloadImage";
  const fullUrl = url ? `${base}?url=${encodeURIComponent(url)}` : base;
  return new NextRequest(fullUrl);
}

describe("GET /api/downloadImage", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    mockAccess.mockReset().mockResolvedValue(true);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns 401 without kiosk cookie or admin session", async () => {
    mockAccess.mockResolvedValue(false);
    const res = await GET(makeRequest(VALID_URL));
    expect(res.status).toBe(401);
  });

  it("returns 400 when url param is missing", async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid URL format", async () => {
    const res = await GET(makeRequest("not-a-url"));
    expect(res.status).toBe(400);
  });

  it("returns 403 for a foreign host", async () => {
    const res = await GET(makeRequest("https://evil.com/image.jpg"));
    expect(res.status).toBe(403);
  });

  it("returns 403 for another Bunny pull zone", async () => {
    const res = await GET(
      makeRequest("https://video.b-cdn.net/posters/poster_abc123_TEST.jpeg"),
    );
    expect(res.status).toBe(403);
  });

  it("returns 403 for a path outside posters", async () => {
    const res = await GET(
      makeRequest("https://cd-test-pull.b-cdn.net/page/free_browsing_bg.png"),
    );
    expect(res.status).toBe(403);
  });

  it("returns 502 when upstream fetch fails", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 404 }));
    const res = await GET(makeRequest(VALID_URL));
    expect(res.status).toBe(502);
  });

  it("returns 502 when upstream is not an image", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("<html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );
    const res = await GET(makeRequest(VALID_URL));
    expect(res.status).toBe(502);
  });

  it("returns 200 with hardened headers on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("binarydata", {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      }),
    );
    globalThis.fetch = fetchMock;

    const res = await GET(makeRequest(VALID_URL));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(VALID_URL);
    expect(res.headers.get("content-type")).toBe("image/jpeg");
    expect(res.headers.get("content-disposition")).toBe(
      'attachment; filename="poster_abc123_TEST.jpeg"',
    );
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("returns 500 on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const res = await GET(makeRequest(VALID_URL));
    expect(res.status).toBe(500);
  });
});
