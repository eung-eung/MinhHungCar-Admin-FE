import { DefaultUser, TokenSet } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
declare module "next-auth" {
    interface Session {

        id?: string;
        access_token: string;
        refresh_token: string;
        role?: string;
        expires: string;
    }

    interface User extends DefaultUser {
        access_token: string,
        refresh_token: string,
        access_token_expires_at: string,
        user: {
            role: string,
            id: string
        }
    }
}