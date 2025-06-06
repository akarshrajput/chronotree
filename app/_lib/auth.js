import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./services";

const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser) {
          await createUser({
            email: user.email,
            name: user.name,
            photo: user.image,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getUser(session.user.email);
      session.user.userId = guest._id;
      session.user.photo = guest.photo;
      session.user.role = guest.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
