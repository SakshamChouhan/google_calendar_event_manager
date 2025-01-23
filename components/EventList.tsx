"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { fetchEvents } from "../lib/fetchEvents"
import { DateRangePicker } from "./DateRangePicker"
import { EventTable } from "./EventTable"

export function EventList() {
  const { data: session, status } = useSession()
  const [events, setEvents] = useState([])
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.accessToken) {
      setLoading(true)
      setError(null)
      fetchEvents(session.accessToken, dateRange.from, dateRange.to)
        .then(setEvents)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    } else if (status === "authenticated") {
      setError("Access token is missing. Please try logging in again.")
    }
  }, [session, dateRange, status])

  if (status === "loading") return <div>Loading session...</div>
  if (status === "unauthenticated") return <div>Access Denied</div>

  return (
    <div className="w-full max-w-4xl">
      <DateRangePicker onChange={setDateRange} />
      {loading && <div>Loading events...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && !error && <EventTable events={events} />}
    </div>
  )
}

