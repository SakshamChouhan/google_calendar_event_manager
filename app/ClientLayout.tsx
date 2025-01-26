// app/ClientLayout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "../components/ThemeToggle";
import { Toaster } from "../components/ui/toaster";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen bg-background text-foreground">
          <header className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Google Calendar Events</h1>
            <ThemeToggle />
          </header>
          <main className="container mx-auto py-8">{children}</main>
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}