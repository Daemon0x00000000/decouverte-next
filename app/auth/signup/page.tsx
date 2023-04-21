"use client";
import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {toast} from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import {SignupForm} from "../../../components/SignupForm";

export type User = {
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

            signIn("credentials", {
                email: user.email,
                password: user.password,
                redirect: false,
                callbackUrl: "/",
            }).then((res) => {
                if (res && res.error) {
                    toast.error("Une erreur est survenue, assurez vous que le username et l'email sont uniques");
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

    const handleSubmit = () => {
        mutation.mutate(user);
    }
    return (
            <SignupForm onSubmit={handleSubmit} loading={loading} user={user} setUser={setUser} />
    );
}
