import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import {
  VideosContextProvider,
  useVideosContext,
} from "../VideosContext";

describe("VideosContext", () => {
  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useVideosContext());
    }).toThrow("useVideosContext must be used within a VideosContextProvider");
  });

  it("passes through values correctly", () => {
    const videos = [{ id: 1 }] as never[];
    const setVideos = vi.fn();
    const setError = vi.fn();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <VideosContextProvider
        videos={videos}
        setVideos={setVideos}
        error={null}
        setError={setError}
      >
        {children}
      </VideosContextProvider>
    );

    const { result } = renderHook(() => useVideosContext(), { wrapper });
    expect(result.current.videos).toBe(videos);
    expect(result.current.error).toBeNull();
  });
});
