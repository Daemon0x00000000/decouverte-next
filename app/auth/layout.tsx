"use client";
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        <SessionProvider>
            <Toaster />
            {children}
        </SessionProvider>
    );
}
