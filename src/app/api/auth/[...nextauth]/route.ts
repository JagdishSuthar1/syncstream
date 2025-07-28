import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              provider: "Google",
              role: "EndUser",
            },
          });
        }
        return true;
      } catch (err) {
        console.error("SignIn Error:", err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/api/auth/signin",
    signOut: "/",              
  },
  debug: true,
});

export { handler as GET, handler as POST };
