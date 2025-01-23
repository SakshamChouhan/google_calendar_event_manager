import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { EventDetailsModal } from "./EventDetailsModal";
import { exportToCsv } from "../lib/exportToCsv";

type Event = {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  description?: string;
};

interface EventTableProps {
  events: Event[];
}

export function EventTable({ events }: EventTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => exportToCsv(events)}>Export to CSV</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.summary}</TableCell>
              <TableCell>{new Date(event.start.dateTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(event.end.dateTime).toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EventDetailsModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
