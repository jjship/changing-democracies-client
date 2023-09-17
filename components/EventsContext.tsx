import { createContext } from "react";

type DeleteCallback = (eventId: number) => void;

export const EventsContext = createContext<{
  onDelete?: DeleteCallback;
}>({});
