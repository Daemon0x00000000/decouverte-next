"use client";
import {signOut} from "next-auth/react";
import styles from "styles/Loading.module.scss";
import {Infinity} from "../../../components/svg";

export default function Signout() {
    signOut({redirect: true, callbackUrl: "/"});
    return (
        <div className={styles.container}>
            <Infinity className={styles.loader}></Infinity>
        </div>
    )
}
