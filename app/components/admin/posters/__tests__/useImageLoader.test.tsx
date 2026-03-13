import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { SWRConfig } from "swr";
import { ReactNode } from "react";
import useImageLoader from "../useImageLoader";

const swrWrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    {children}
  </SWRConfig>
);

describe("useImageLoader", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    globalThis.fetch = originalFetch;
  });

  it("returns loading true initially", () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("ok", { status: 200 }),
    );

    const { result } = renderHook(() => useImageLoader("https://example.com/img.jpg"), {
      wrapper: swrWrapper,
    });
    expect(result.current.loading).toBe(true);
  });

  it("returns imageSrc on successful fetch", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("ok", { status: 200 }),
    );

    const { result } = renderHook(
      () => useImageLoader("https://example.com/img.jpg"),
      { wrapper: swrWrapper },
    );

    await vi.waitFor(() => {
      expect(result.current.imageSrc).toBe("https://example.com/img.jpg");
    });
    expect(result.current.loading).toBe(false);
  });

  it("exposes maxRetry as 5", () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("ok", { status: 200 }),
    );

    const { result } = renderHook(
      () => useImageLoader("https://example.com/img.jpg"),
      { wrapper: swrWrapper },
    );
    expect(result.current.maxRetry).toBe(5);
  });

  it("manualRetry resets retryCount", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("ok", { status: 200 }),
    );

    const { result } = renderHook(
      () => useImageLoader("https://example.com/img.jpg"),
      { wrapper: swrWrapper },
    );

    act(() => {
      result.current.manualRetry();
    });

    expect(result.current.retryCount).toBe(0);
  });
});
