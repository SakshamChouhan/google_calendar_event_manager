// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../../../../config/auth"; // Updated import path

const handler = NextAuth(authOptions);

// Export only the HTTP methods
export { handler as GET, handler as POST };