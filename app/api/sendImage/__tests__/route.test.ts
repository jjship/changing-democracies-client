import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const mockAccess = vi.hoisted(() => vi.fn());
const mockSend = vi.hoisted(() => vi.fn());

vi.mock("@/utils/env", () => ({
  serverEnv: () => ({ RESEND_API_KEY: "re_test_key" }),
  clientEnv: () => ({ NEXT_PUBLIC_STORAGE_PULL_ZONE: "cd-test-pull" }),
}));

vi.mock("@/utils/admin/access", () => ({
  hasKioskOrAdminAccess: mockAccess,
}));

vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

import { POST } from "../route";

const VALID_URL =
  "https://cd-test-pull.b-cdn.net/posters/poster_abc123_TEST.jpeg";

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost:3000/api/sendImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    body: {
      imageUrl: VALID_URL,
      fileName: "poster.jpg",
      email: "test@example.com",
      ...overrides,
    },
  };
}

function imageResponse(contentType = "image/jpeg") {
  return new Response(new ArrayBuffer(8), {
    status: 200,
    headers: { "content-type": contentType },
  });
}

describe("POST /api/sendImage", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    mockSend.mockReset().mockResolvedValue({ id: "email_123" });
    mockAccess.mockReset().mockResolvedValue(true);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns 401 without kiosk cookie or admin session", async () => {
    mockAccess.mockResolvedValue(false);
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(401);
    expect(mockSend).not.toHaveBeenCalled();
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
    const res = await POST(makeRequest({ body: { imageUrl: VALID_URL } }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest(validBody({ email: "not-an-email" })));
    expect(res.status).toBe(400);
  });

  it("returns 403 for a foreign host", async () => {
    const res = await POST(
      makeRequest(validBody({ imageUrl: "https://evil.com/img.jpg" })),
    );
    expect(res.status).toBe(403);
  });

  it("returns 403 for another Bunny pull zone", async () => {
    const res = await POST(
      makeRequest(
        validBody({
          imageUrl:
            "https://other-zone.b-cdn.net/posters/poster_abc123_TEST.jpeg",
        }),
      ),
    );
    expect(res.status).toBe(403);
  });

  it("returns 403 outside the posters folder", async () => {
    const res = await POST(
      makeRequest(
        validBody({
          imageUrl: "https://cd-test-pull.b-cdn.net/edu/pack.pdf",
        }),
      ),
    );
    expect(res.status).toBe(403);
  });

  it("returns 403 for a file name that is not a poster", async () => {
    const res = await POST(
      makeRequest(
        validBody({
          imageUrl: "https://cd-test-pull.b-cdn.net/posters/evil.exe",
        }),
      ),
    );
    expect(res.status).toBe(403);
  });

  it("returns 502 when image fetch fails", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 404 }));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(502);
  });

  it("returns 502 when upstream is not an image", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(imageResponse("text/html"));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(502);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200, fetches the normalised URL and names the attachment after the poster", async () => {
    const fetchMock = vi.fn().mockResolvedValue(imageResponse());
    globalThis.fetch = fetchMock;
    const res = await POST(makeRequest(validBody({ fileName: "evil.exe" })));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ok");
    expect(fetchMock).toHaveBeenCalledWith(VALID_URL);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["test@example.com"],
        attachments: expect.arrayContaining([
          expect.objectContaining({ filename: "poster_abc123_TEST.jpeg" }),
        ]),
      }),
    );
  });

  it("returns 500 on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network fail"));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(500);
  });
});
