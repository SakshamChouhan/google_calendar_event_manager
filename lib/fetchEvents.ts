export async function fetchEvents(accessToken: string, startDate?: Date | null, endDate?: Date | null) {
  const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events")
  url.searchParams.append("orderBy", "startTime")
  url.searchParams.append("singleEvents", "true")

  if (startDate) {
    url.searchParams.append("timeMin", startDate.toISOString())
  }
  if (endDate) {
    url.searchParams.append("timeMax", endDate.toISOString())
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`)
  }

  const data = await response.json()
  return data.items
}

