import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
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
      } catch (err) {
        console.error("SignIn Error:", err);
      }
      return true;
    },
  },
  pages: {
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
