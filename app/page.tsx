"use client";
import { useSession } from "next-auth/react";
import EventList from "../components/EventList";
import LoginButton from "../components/LoginButton";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  
  return (
    <main>
      {status === "authenticated" ? <EventList /> : <LoginButton />}
    </main>
  );
}