import { describe, it, expect } from "vitest";
import {
  isPosterFileName,
  parsePosterUrl,
  posterPublicUrl,
} from "../admin/poster-file-name";

describe("isPosterFileName", () => {
  it("accepts generated and legacy poster names", () => {
    expect(
      isPosterFileName("poster_0050f3ab-b32a-4bdc-96b6-740aa3cfc81c_VILNIUS.jpeg"),
    ).toBe(true);
    expect(isPosterFileName("poster_11_ANTWERP.jpeg")).toBe(true);
    expect(isPosterFileName("poster_abc_DEN HAAG.jpg")).toBe(true);
  });

  it("rejects traversal, separators, other extensions and non-strings", () => {
    expect(isPosterFileName("../edu/pack.pdf")).toBe(false);
    expect(isPosterFileName("poster_abc_X/../../page/bg.png")).toBe(false);
    expect(isPosterFileName("poster_abc_X.jpeg?x=1")).toBe(false);
    expect(isPosterFileName("poster_abc_X.png")).toBe(false);
    expect(isPosterFileName("poster_abc_X.jpeg.html")).toBe(false);
    expect(isPosterFileName("evil.exe")).toBe(false);
    expect(isPosterFileName(`poster_a_${"B".repeat(100)}.jpeg`)).toBe(false);
    expect(isPosterFileName(null)).toBe(false);
    expect(isPosterFileName(42)).toBe(false);
  });
});

describe("parsePosterUrl", () => {
  const zone = "cd-test-pull";

  it("accepts only the project pull zone under /posters/", () => {
    const parsed = parsePosterUrl(
      "https://cd-test-pull.b-cdn.net/posters/poster_abc_DEN%20HAAG.jpeg",
      zone,
    );
    expect(parsed).toEqual({
      url: "https://cd-test-pull.b-cdn.net/posters/poster_abc_DEN%20HAAG.jpeg",
      fileName: "poster_abc_DEN HAAG.jpeg",
    });
  });

  it("rejects other hosts, schemes, folders and names", () => {
    expect(parsePosterUrl("https://other.b-cdn.net/posters/poster_a_B.jpeg", zone)).toBeNull();
    expect(parsePosterUrl("http://cd-test-pull.b-cdn.net/posters/poster_a_B.jpeg", zone)).toBeNull();
    expect(parsePosterUrl("https://cd-test-pull.b-cdn.net/edu/pack.pdf", zone)).toBeNull();
    expect(parsePosterUrl("https://cd-test-pull.b-cdn.net/posters/sub/poster_a_B.jpeg", zone)).toBeNull();
    expect(parsePosterUrl("https://cd-test-pull.b-cdn.net/posters/evil.exe", zone)).toBeNull();
    expect(parsePosterUrl("https://cd-test-pull.b-cdn.net/posters/%E0%A4%A", zone)).toBeNull();
    expect(parsePosterUrl("not a url", zone)).toBeNull();
  });

  it("builds encoded public URLs", () => {
    expect(posterPublicUrl(zone, "poster_a_DEN HAAG.jpeg")).toBe(
      "https://cd-test-pull.b-cdn.net/posters/poster_a_DEN%20HAAG.jpeg",
    );
  });
});
