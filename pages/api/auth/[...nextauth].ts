import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
        username: { label: "Login", type: "text", placeholder: "Login" },
        password: { label: "Hasło", type: "password", placeholder: "Hasło" },
      },
      async authorize(credentials) {
        try {
          let account = await prisma.account.findFirst({
            where: {
              login: credentials?.username,
            },
            include: {
              teacher: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          if (!account) return null;

          let isValidPassowrd = bcrypt.compareSync(
            credentials!.password,
            account.hash
          );

          if (isValidPassowrd) {
            return {
              name: account.teacher ? account.teacher.name : "ADMIN",
              id: account.id,
              type: account.type,
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.type = user.type;
      }

      return token;
    },
    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.type = token.type;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
