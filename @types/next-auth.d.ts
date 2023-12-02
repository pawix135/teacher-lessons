import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    type: string;
  }
}

declare module "next-auth" {
  interface User {
    name: string;
    id: number;
    type: string;
  }
  interface Session {
    user: {
      name: string;
      id: number;
      type: string;
    };
  }
}
