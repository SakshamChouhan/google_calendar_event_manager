import { getServerSession } from "next-auth/next"
import { LoginButton } from "../components/LoginButton"
import { EventList } from "../components/EventList"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Google Calendar Events</h1>
        <LoginButton />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Your Google Calendar Events</h1>
      <EventList />
    </main>
  )
}

