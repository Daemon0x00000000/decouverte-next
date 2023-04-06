"use client";
import styles from "styles/Signin.module.scss";
import {FormEventHandler, useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Link from "next/link";
import {toast} from "react-hot-toast";

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (session) {
            redirect("/");
        }
    }, [session]);

    const handleSignIn:FormEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        if (!user.email || !user.password) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }
        setLoading(true);

        signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: true,
            callbackUrl: "/",
        }).then((res) => {
            if (res && res.error) {
                toast.error("Identifiants incorrects");
            } else {
                toast.success("Vous êtes connecté");
            }
            setLoading(false);
        });
    }
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.title}>Se connecter</h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <input type="submit" className={styles.submit} onClick={handleSignIn} value={"Sign In"} style={{cursor: loading ? "not-allowed" : "pointer"}} disabled={loading} />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Link href="/auth/signup">Je n'ai pas de compte</Link>
            </form>
        </div>
    );
}
