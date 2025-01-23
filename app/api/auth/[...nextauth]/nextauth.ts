import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          response_type: "code",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string | undefined;
        token.idToken = account.id_token as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.idToken = token.idToken as string | undefined;
      return session;
    },
  },
};

export default NextAuth(authOptions);
