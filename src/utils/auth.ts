import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean | undefined;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean | undefined;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const UserinDB = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = UserinDB?.isAdmin;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
