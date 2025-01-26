"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchEvents } from "../lib/fetchEvents";
import { DateRangePicker } from "./DateRangePicker";
import { EventTable } from "./EventTable";
import LoginButton from "./LoginButton";

export default function EventList() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]); // State for storing events
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  }); // State for storing selected date range
  const [error, setError] = useState<string>(""); // State for storing error messages

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Fetch events if the user is authenticated and has an access token
        if (status === "authenticated" && session?.accessToken) {
          const data = await fetchEvents(
            session.accessToken,
            dateRange.from,
            dateRange.to
          );
          setEvents(data); // Set the fetched events
        }
      } catch (err) {
        // Log the error and display a user-friendly message
        console.error("Error fetching events:", err);
        setError(`Failed to fetch events: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    };

    loadEvents();
  }, [session, dateRange, status]); // Re-run effect when session, dateRange, or status changes

  // Show loading state
  if (status === "loading") return <div>Loading...</div>;

  // If unauthenticated, show login button
  if (status === "unauthenticated") return <LoginButton />;

  // Render the event list and date picker
  return (
    <div className="w-full max-w-4xl p-4">
      <DateRangePicker onChange={setDateRange} /> {/* Date range picker */}
      {error && <div className="text-red-500 p-4">{error}</div>} {/* Display error if exists */}
      <EventTable events={events} /> {/* Display events in a table */}
    </div>
  );
}
