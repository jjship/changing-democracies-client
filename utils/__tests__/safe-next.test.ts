import { describe, it, expect } from "vitest";
import { safeNext } from "../safe-next";

describe("safeNext", () => {
  it("keeps same-origin paths", () => {
    expect(safeNext("/admin?events=true")).toBe("/admin?events=true");
    expect(safeNext("/password-reset")).toBe("/password-reset");
  });

  it("falls back for anything that could leave the origin", () => {
    expect(safeNext("https://evil.example/")).toBe("/admin");
    expect(safeNext("//evil.example")).toBe("/admin");
    expect(safeNext("/\\evil.example")).toBe("/admin");
    expect(safeNext("javascript:alert(1)")).toBe("/admin");
    expect(safeNext("/ok\r\nSet-Cookie: x=y")).toBe("/admin");
    expect(safeNext("")).toBe("/admin");
    expect(safeNext(undefined)).toBe("/admin");
    expect(safeNext(null, "")).toBe("");
  });
});
