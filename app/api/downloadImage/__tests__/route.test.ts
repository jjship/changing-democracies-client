import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "../route";
import { NextRequest } from "next/server";

function makeRequest(url?: string) {
  const base = "http://localhost:3000/api/downloadImage";
  const fullUrl = url ? `${base}?url=${encodeURIComponent(url)}` : base;
  return new NextRequest(fullUrl);
}

describe("GET /api/downloadImage", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns 400 when url param is missing", async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid URL format", async () => {
    const res = await GET(makeRequest("not-a-url"));
    expect(res.status).toBe(400);
  });

  it("returns 403 for disallowed host", async () => {
    const res = await GET(makeRequest("https://evil.com/image.jpg"));
    expect(res.status).toBe(403);
  });

  it("allows subdomain match (video.b-cdn.net)", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("imagedata", {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    );

    const res = await GET(
      makeRequest("https://video.b-cdn.net/poster.png"),
    );
    expect(res.status).toBe(200);
  });

  it("allows exact host match (b-cdn.net)", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("imagedata", {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      }),
    );

    const res = await GET(makeRequest("https://b-cdn.net/image.jpg"));
    expect(res.status).toBe(200);
  });

  it("returns 502 when upstream fetch fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    const res = await GET(
      makeRequest("https://b-cdn.net/missing.jpg"),
    );
    expect(res.status).toBe(502);
  });

  it("returns 200 with correct headers on success", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("binarydata", {
        status: 200,
        headers: { "content-type": "image/webp" },
      }),
    );

    const res = await GET(makeRequest("https://b-cdn.net/photo.webp"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/webp");
    expect(res.headers.get("content-disposition")).toBe(
      'attachment; filename="downloadedImage.jpg"',
    );
  });

  it("returns 500 on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const res = await GET(
      makeRequest("https://b-cdn.net/image.jpg"),
    );
    expect(res.status).toBe(500);
  });
});
