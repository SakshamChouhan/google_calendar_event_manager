import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "../components/ThemeToggle";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Calendar Events",
  description: "View and filter your Google Calendar events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
