import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Mock env before importing route
vi.mock("@/utils/env", () => ({
  serverEnv: () => ({ RESEND_API_KEY: "re_test_key" }),
}));

const mockSend = vi.fn().mockResolvedValue({ id: "email_123" });
vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost:3000/api/sendImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Import after mocks are set up
import { POST } from "../route";

describe("POST /api/sendImage", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    mockSend.mockClear();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost:3000/api/sendImage", {
      method: "POST",
      body: "not json{{{",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid JSON");
  });

  it("returns 400 for missing required fields", async () => {
    const res = await POST(makeRequest({ body: { imageUrl: "https://b-cdn.net/img.jpg" } }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(
      makeRequest({
        body: {
          imageUrl: "https://b-cdn.net/img.jpg",
          fileName: "poster.jpg",
          email: "not-an-email",
        },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 403 for disallowed imageUrl", async () => {
    const res = await POST(
      makeRequest({
        body: {
          imageUrl: "https://evil.com/img.jpg",
          fileName: "poster.jpg",
          email: "test@example.com",
        },
      }),
    );
    expect(res.status).toBe(403);
  });

  it("returns 502 when image fetch fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(null, { status: 404 }),
    );
    const res = await POST(
      makeRequest({
        body: {
          imageUrl: "https://b-cdn.net/img.jpg",
          fileName: "poster.jpg",
          email: "test@example.com",
        },
      }),
    );
    expect(res.status).toBe(502);
  });

  it("returns 200 and calls Resend on success", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(new ArrayBuffer(8), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    );
    const res = await POST(
      makeRequest({
        body: {
          imageUrl: "https://b-cdn.net/img.jpg",
          fileName: "poster.jpg",
          email: "test@example.com",
        },
      }),
    );
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe("ok");
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["test@example.com"],
        attachments: expect.arrayContaining([
          expect.objectContaining({ filename: "poster.jpg" }),
        ]),
      }),
    );
  });

  it("returns 500 on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network fail"));
    const res = await POST(
      makeRequest({
        body: {
          imageUrl: "https://b-cdn.net/img.jpg",
          fileName: "poster.jpg",
          email: "test@example.com",
        },
      }),
    );
    expect(res.status).toBe(500);
  });
});
