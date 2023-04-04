import AuthProvider from "./AuthProvider";
import {ReactNode} from "react";

export default function TierlistLayout({children}: {children: ReactNode}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
