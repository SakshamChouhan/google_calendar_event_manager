// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout"; // Import the client component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Calendar Events",
  description: "View and filter your Google Calendar events",
};

// This remains a server component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap with ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}