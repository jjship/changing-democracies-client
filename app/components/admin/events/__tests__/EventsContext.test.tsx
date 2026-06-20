import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import {
  EventsContextProvider,
  useEventsContext,
} from "../EventsContext";

describe("EventsContext", () => {
  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useEventsContext());
    }).toThrow("useEventsContext must be used within a EventsContextProvider");
  });

  it("passes through values correctly", () => {
    const events = [{ id: 1 }] as never[];
    const setEvents = vi.fn();
    const onDelete = vi.fn();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <EventsContextProvider
        events={events}
        setEvents={setEvents}
        onDelete={onDelete}
      >
        {children}
      </EventsContextProvider>
    );

    const { result } = renderHook(() => useEventsContext(), { wrapper });
    expect(result.current.events).toBe(events);
    expect(result.current.onDelete).toBe(onDelete);
  });
});
