import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";

vi.mock("@/utils/i18n/useLanguage", () => ({
  useLanguage: () => ({
    language: "en",
    availableLanguages: ["en", "nl"],
    setLanguage: vi.fn(),
    displayLanguage: "EN",
    setLanguageFromDisplay: vi.fn(),
    isLanguageAvailable: () => true,
  }),
}));

vi.mock("@/app/[lang]/context/TranslationContext", () => ({
  useTranslation: () => ({
    language: "en",
    setLanguage: vi.fn(),
    availableLanguages: ["en", "nl"],
    dictionary: {},
  }),
}));

import {
  NarrativesProvider,
  useNarrativesContext,
} from "../NarrativesContext";

const mockPaths = [
  { id: "path-1", titles: [], fragments: [] },
  { id: "path-2", titles: [], fragments: [] },
];

function wrapper(overrides: Record<string, unknown> = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NarrativesProvider
        narrationPaths={mockPaths as never[]}
        availableLanguageLabels={["EN", "NL"]}
        {...overrides}
      >
        {children}
      </NarrativesProvider>
    );
  };
}

describe("NarrativesContext", () => {
  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useNarrativesContext());
    }).toThrow("useNarrativesContext must be used within a NarrativesProvider");
  });

  it("passes narrationPaths through", () => {
    const { result } = renderHook(() => useNarrativesContext(), {
      wrapper: wrapper(),
    });
    expect(result.current.narrationPaths).toBe(mockPaths);
  });

  it("sets currentPath when initialNarrativeId matches", () => {
    const { result } = renderHook(() => useNarrativesContext(), {
      wrapper: wrapper({ initialNarrativeId: "path-1" }),
    });
    expect(result.current.currentPath).toBe(mockPaths[0]);
  });

  it("leaves currentPath null when initialNarrativeId does not match", () => {
    const { result } = renderHook(() => useNarrativesContext(), {
      wrapper: wrapper({ initialNarrativeId: "nonexistent" }),
    });
    expect(result.current.currentPath).toBeNull();
  });

  it("selectedLanguage is uppercase", () => {
    const { result } = renderHook(() => useNarrativesContext(), {
      wrapper: wrapper(),
    });
    expect(result.current.selectedLanguage).toBe("EN");
  });

  it("exposes language and availableLanguages", () => {
    const { result } = renderHook(() => useNarrativesContext(), {
      wrapper: wrapper(),
    });
    expect(result.current.language).toBe("en");
    expect(result.current.availableLanguages).toEqual(["en", "nl"]);
  });
});
