import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";

import { FilmsContextProvider, useFilmsContext } from "../FilmsContext";

const fragment = (id: string, tagIds: string[] = []) => ({
  id,
  title: `Fragment ${id}`,
  tags: tagIds.map((tagId) => ({ id: tagId })),
});

const mockFragmentsResponse = {
  data: [
    fragment("frag-1", ["tag-a"]),
    fragment("frag-2", ["tag-a", "tag-b"]),
    fragment("frag-3"),
  ],
};

const mockTagCategories = { tagCategories: [] };

function wrapper(overrides: Record<string, unknown> = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <FilmsContextProvider
        fragmentsResponse={mockFragmentsResponse as never}
        tagCategoriesResponse={mockTagCategories as never}
        {...overrides}
      >
        {children}
      </FilmsContextProvider>
    );
  };
}

const ids = (fragments: { id: string }[]) => fragments.map((f) => f.id);

describe("FilmsContext", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/en/free-browsing");
    sessionStorage.clear();
  });

  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useFilmsContext());
    }).toThrow("useFilmsContext must be used within a FilmsContextProvider");
  });

  it("provides initial values", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper(),
    });
    expect(result.current.nowPlaying).toBeNull();
    expect(result.current.fragmentsResponse).toBe(mockFragmentsResponse);
    expect(result.current.fragments).toBe(mockFragmentsResponse.data);
  });

  it("filters fragments to those carrying every selected tag", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper(),
    });

    act(() => result.current.setCategoryTags("cat-1", ["tag-a"]));
    expect(ids(result.current.fragments)).toEqual(["frag-1", "frag-2"]);

    act(() => result.current.setCategoryTags("cat-2", ["tag-b"]));
    expect(ids(result.current.fragments)).toEqual(["frag-2"]);

    act(() => {
      result.current.setCategoryTags("cat-1", []);
      result.current.setCategoryTags("cat-2", []);
    });
    expect(ids(result.current.fragments)).toEqual([
      "frag-1",
      "frag-2",
      "frag-3",
    ]);
  });

  it("restores selected tags from sessionStorage", () => {
    sessionStorage.setItem(
      "selectedTagsByCategory",
      JSON.stringify({ "cat-1": ["tag-b"] }),
    );
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper(),
    });
    expect(ids(result.current.fragments)).toEqual(["frag-2"]);
  });

  it("reads the open film from the URL when syncUrl is true", () => {
    window.history.replaceState(null, "", "/en/free-browsing?id=frag-1");
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: true }),
    });
    expect(result.current.nowPlaying).toBe("frag-1");
  });

  it("writes the open film to the URL when syncUrl is true", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: true }),
    });

    act(() => result.current.setNowPlaying("frag-2"));
    expect(result.current.nowPlaying).toBe("frag-2");
    expect(window.location.search).toBe("?id=frag-2");

    act(() => result.current.setNowPlaying(null));
    expect(result.current.nowPlaying).toBeNull();
    expect(window.location.search).toBe("");
  });

  it("follows back/forward navigation when syncUrl is true", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: true }),
    });

    act(() => result.current.setNowPlaying("frag-2"));
    window.history.replaceState(null, "", "/en/free-browsing");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(result.current.nowPlaying).toBeNull();
  });

  it("leaves the URL alone when syncUrl is false", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: false }),
    });

    act(() => result.current.setNowPlaying("frag-2"));
    expect(result.current.nowPlaying).toBe("frag-2");
    expect(window.location.search).toBe("");
  });
});
