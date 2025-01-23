"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardWrapper() {
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders on the client to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent rendering on the server
  return <Dashboard />;
}

function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <p className="mb-2">Email: {session.user?.email}</p>
      <p className="mb-2">Access Token: {session.accessToken}</p>
      <p className="mb-4">ID Token: {session.idToken}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
