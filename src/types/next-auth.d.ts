/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Session {
    user: User; 
  }

  interface Token {
    accessToken?: string; 
  }
}