"use client";

import {signIn, useSession} from "next-auth/react";
import {FormEventHandler, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import styles from "styles/Signup.module.scss";
import Link from "next/link";
export default function SignUpPage() {
    const { data: session } = useSession();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            redirect("/");
        }
    }, [session]);
    const handleSignUp:FormEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: user.username,
                password: user.password,

            }),
        }).then((res) => {
            setLoading(true);
            if (res.status === 200) {
                signIn("credentials", {
                    email: user.email,
                    password: user.password,
                    redirect: true,
                    callbackUrl: "/",
                }).catch(() => {
                    console.log("error");
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        });
    }
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h1 className={styles.title}>S'inscrire</h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <input type="submit" className={styles.submit} onClick={handleSignUp} value={"Sign Up"} style={{cursor: loading ? "not-allowed" : "pointer"}} disabled={loading} />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Link href="/auth/signin">J'ai déjà un compte</Link>
            </form>
        </div>
    );
}
