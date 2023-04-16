"use client";
import {signIn, useSession} from "next-auth/react";
import {FormEventHandler, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import styles from "styles/Signup.module.scss";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type User = {
    email: string,
    username: string,
    password: string,
}
const signUp = async (user: User) => {
    return fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((res) => {
        return res.json();
    })
}
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

    const mutation = useMutation(signUp, {
        onMutate: async () => {
            setLoading(true);
        },
        onSuccess: () => {
            toast.success("Vous êtes inscris !");
            signIn("credentials", {
                email: user.email,
                password: user.password,
                redirect: true,
                callbackUrl: "/",
            }).then((res) => {
                if (res && res.error) {
                    toast.error("Une erreur est survenue lors de la connexion");
                }
            });
        },
        onError: () => {
            toast.error("Une erreur est survenue lors de l'inscription");
        },
        onSettled: () => {
            setLoading(false);
        }
    });

    const handleSubmit: FormEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        mutation.mutate({
            email: user.email,
            username: user.username,
            password: user.password,
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
                <input type="submit" className={styles.submit} onClick={handleSubmit} value={"Sign Up"} style={{cursor: loading ? "not-allowed" : "pointer"}} disabled={loading} />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Link href="/auth/signin">J'ai déjà un compte</Link>
            </form>
        </div>
    );
}
