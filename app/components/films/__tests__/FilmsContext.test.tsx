import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/en/free-browsing",
  useSearchParams: () => new URLSearchParams(),
}));

import {
  FilmsContextProvider,
  useFilmsContext,
} from "../FilmsContext";

const mockFragmentsResponse = {
  data: [
    { id: "frag-1", title: "Fragment 1" },
    { id: "frag-2", title: "Fragment 2" },
  ],
  total: 2,
};

const mockTagCategories = { data: [] };

function wrapper(
  overrides: Record<string, unknown> = {},
) {
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

describe("FilmsContext", () => {
  beforeEach(() => {
    mockPush.mockClear();
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
  });

  it("sets nowPlaying from initialFragmentId", () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ initialFragmentId: "frag-1" }),
    });
    expect(result.current.nowPlaying).toBe("frag-1");
  });

  it("populates fragments from fragmentsResponse after mount", async () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper(),
    });
    // useEffect runs after render
    await vi.waitFor(() => {
      expect(result.current.fragments).toEqual(mockFragmentsResponse.data);
    });
  });

  it("updates URL when syncUrl is true", async () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: true }),
    });

    act(() => {
      result.current.setNowPlaying("frag-2");
    });

    await vi.waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringContaining("id=frag-2"),
      );
    });
  });

  it("does not update URL when syncUrl is false", async () => {
    const { result } = renderHook(() => useFilmsContext(), {
      wrapper: wrapper({ syncUrl: false }),
    });

    act(() => {
      result.current.setNowPlaying("frag-2");
    });

    // Give effects time to run, then verify no push
    await new Promise((r) => setTimeout(r, 50));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
