import { DateTime } from "luxon";
import { EventDbEntry } from "../../types/database";

export { parseDbEventEntries, parseEventEntry };

export type ParsedEventEntry = Omit<
  EventDbEntry,
  | "start_date"
  | "end_date"
  | "created_at"
  | "created_by"
  | "modified_at"
  | "modified_by"
  | "id"
> & {
  date: string;
  isPast: boolean;
};

type ParsedEvents = {
  pastEvents: ParsedEventEntry[];
  futureEvents: ParsedEventEntry[];
};

function parseEventEntry({ event }: { event: EventDbEntry }): ParsedEventEntry {
  const {
    start_date,
    end_date,
    created_at,
    created_by,
    id,
    modified_at,
    modified_by,
    ...otherInfo
  } = event;

  const startDate = start_date ? DateTime.fromISO(start_date) : DateTime.utc();
  const endDate = end_date ? DateTime.fromISO(end_date) : DateTime.utc();

  const isPast = endDate < DateTime.utc();

  const date =
    `${startDate.day} ${startDate.month}` !== `${endDate.day} ${endDate.month}`
      ? `${startDate.day} - ${endDate.day}.${endDate.month}.${endDate.year}`
      : `${startDate.day}.${startDate.month}.${startDate.year}`;

  return {
    date,
    isPast,
    ...otherInfo,
  };
}

function parseDbEventEntries({
  events,
}: {
  events: EventDbEntry[] | null;
}): ParsedEvents {
  if (!events) return { pastEvents: [], futureEvents: [] };

  return events
    .map((event) => {
      return parseEventEntry({ event });
    })
    .reduce(
      (acc, event) => {
        event.isPast
          ? acc.pastEvents.push(event)
          : acc.futureEvents.push(event);

        return acc;
      },
      { pastEvents: [], futureEvents: [] } as ParsedEvents,
    );
}
