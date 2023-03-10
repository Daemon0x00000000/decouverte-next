import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, {NextAuthOptions, Session} from "next-auth";
import Credentials from "../../../interfaces/CredentialsInterface";
import prisma from "../../../lib/prismaClient";
import {User} from "@prisma/client";
import bcrypt from "bcryptjs";
import {JWT} from "next-auth/jwt";
import UserSessionInterface from "../../../interfaces/UserSessionInterface";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const {email, password} = credentials as Credentials;
                console.log(email, password);
                if (!email || !password) {
                    throw new Error("Bad request");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                }) as User;

                if (!user || user.password !== await bcrypt.hash(password, user.salt)) {
                    throw new Error("Invalid credentials or user not found");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    callbacks: {
        async jwt(params) {
            const {token, user} = params;
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}: { session: Session, token: JWT }) {
            session.user = {
                id: token.id,
            } as UserSessionInterface;
            return session;
        }

    }
}


export default NextAuth(authOptions);
