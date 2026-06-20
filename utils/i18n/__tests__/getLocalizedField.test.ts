import { describe, it, expect } from "vitest";
import { getLocalizedField } from "../getLocalizedField";

type TitleItem = { languageCode: string; title: string };

const items: TitleItem[] = [
  { languageCode: "NL", title: "Dutch title" },
  { languageCode: "EN", title: "English title" },
  { languageCode: "HR", title: "Croatian title" },
];

describe("getLocalizedField", () => {
  it("returns exact language match", () => {
    expect(getLocalizedField(items, "NL", "title")).toBe("Dutch title");
  });

  it("falls back to EN when requested language not found", () => {
    expect(getLocalizedField(items, "FR", "title")).toBe("English title");
  });

  it("returns undefined for empty array", () => {
    expect(getLocalizedField([], "EN", "title")).toBeUndefined();
  });

  it("falls back to EN when languageCode is undefined", () => {
    expect(getLocalizedField(items, undefined, "title")).toBe("English title");
  });

  it("returns EN directly when requested language is EN", () => {
    expect(getLocalizedField(items, "EN", "title")).toBe("English title");
  });

  it("returns undefined when neither requested nor EN exists", () => {
    const noEn = [{ languageCode: "NL", title: "Dutch" }];
    expect(getLocalizedField(noEn, "FR", "title")).toBeUndefined();
  });

  it("falls back to EN when field value is null", () => {
    const withNull = [
      { languageCode: "NL", title: null as unknown as string },
      { languageCode: "EN", title: "English fallback" },
    ];
    expect(getLocalizedField(withNull, "NL", "title")).toBe(
      "English fallback",
    );
  });
});
