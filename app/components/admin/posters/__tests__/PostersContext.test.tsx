import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import {
  PostersContextProvider,
  usePostersContext,
} from "../PostersContext";

describe("PostersContext", () => {
  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => usePostersContext());
    }).toThrow("usePostersContext must be used within a PostersContextProvider");
  });

  it("passes through values correctly", () => {
    const posters = [{ name: "p1" }] as never[];
    const setPosters = vi.fn();
    const onDelete = vi.fn();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <PostersContextProvider
        posters={posters}
        setPosters={setPosters}
        onDelete={onDelete}
      >
        {children}
      </PostersContextProvider>
    );

    const { result } = renderHook(() => usePostersContext(), { wrapper });
    expect(result.current.posters).toBe(posters);
    expect(result.current.onDelete).toBe(onDelete);
  });
});
