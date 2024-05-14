"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Button } from "../../ui/button";
import { useState, useEffect, useMemo } from "react";
import Link from "next/dist/client/link";
import { useEventsContext } from "./EventsContext";
import { EventDbEntry } from "@/types/database";
import { format } from "date-fns";

type ParsedEvent = {
  category: string | null;
  created_at: string;
  created_by: string | null;
  id: number;
  link: string | null;
  location: string | null;
  participants: number | null;
  title: string | null;
  type: string | null;
  start: string;
  end: string;
};

type EventRowProps = {
  event: ParsedEvent;
};

function EventRow({ event }: EventRowProps) {
  const { onDelete } = useEventsContext();

  function handleDeleteClick() {
    if (onDelete) {
      onDelete(event.id);
    }
  }

  return (
    <>
      <TableRow key={event.id}>
        <TableCell>
          <Link href={`/event/${event.id}`}>
            <Button className="bg-yellow_secondary text-black_bg hover:bg-green_accent">
              edit
            </Button>
          </Link>
        </TableCell>
        <TableCell>{event.start}</TableCell>
        <TableCell>{event.end}</TableCell>
        <TableCell>{event.title}</TableCell>
        <TableCell>{event.type}</TableCell>
        <TableCell>{event.location}</TableCell>
        <TableCell>{event.link}</TableCell>
        <TableCell>{event.participants}</TableCell>
        <TableCell>{event.category}</TableCell>
        <TableCell>
          <Button
            onClick={handleDeleteClick}
            className="bg-black_bg text-destructive hover:bg-destructive hover:text-black_bg"
          >
            delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function EventsTable() {
  const [nextId, setNextId] = useState(0);
  const { events } = useEventsContext();

  const parsedEvents: ParsedEvent[] = useMemo(
    () => parseEvents(events),
    [events],
  );

  useEffect(() => {
    setNextId(getNextId(parsedEvents));
  }, [parsedEvents]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <Link href={`/event/${nextId}`}>
        <Button className="bg-red mb-2 rounded bg-green_accent px-4 py-2 text-black hover:bg-yellow_secondary">
          Add Event
        </Button>
      </Link>
      <Table className=" bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Edit</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parsedEvents &&
            parsedEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

const getNextId = (events: ParsedEvent[]) => {
  if (events.length === 0) {
    return 0;
  }

  return (
    events.reduce((acc: number, curr: ParsedEvent) => {
      return curr.id > acc ? curr.id : acc;
    }, 0) + 1
  );
};

function parseEvents(events: EventDbEntry[] | null) {
  if (!events) return [];

  return events.map((event) => {
    const { start_date, end_date, ...otherInfo } = event;
    const start = start_date
      ? format(new Date(start_date), "dd-MM-yyyy")
      : format(new Date(), "dd-MM-yyyy");
    const end = end_date
      ? format(new Date(end_date), "dd-MM-yyyy")
      : format(new Date(), "dd-MM-yyyy");

    return {
      start,
      end,
      ...otherInfo,
    };
  });
}
