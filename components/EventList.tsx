"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchEvents } from "../lib/fetchEvents";
import { DateRangePicker } from "./DateRangePicker";
import { EventTable } from "./EventTable";
import LoginButton from "./LoginButton";

export default function EventList() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ 
    from: null, 
    to: null 
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (status === "authenticated" && session?.accessToken) {
          const data = await fetchEvents(
            session.accessToken,
            dateRange.from,
            dateRange.to
          );
          setEvents(data);
        }
      } catch (err) {
        setError("Failed to fetch events. Please reload the page.");
      }
    };

    loadEvents();
  }, [session, dateRange, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <LoginButton />;

  return (
    <div className="w-full max-w-4xl p-4">
      <DateRangePicker onChange={setDateRange} />
      {error && <div className="text-red-500 p-4">{error}</div>}
      <EventTable events={events} />
    </div>
  );
}