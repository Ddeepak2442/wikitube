import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        user.email = profile.email;
        user.name = profile.name;
        user.image = profile.picture;
        user.google_id = profile.sub;
      }
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});