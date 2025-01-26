// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Type definitions for JWT and Session
interface Token {
  accessToken?: string;
}

interface Session extends DefaultSession {
  accessToken?: string;
  expires: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug in dev
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };