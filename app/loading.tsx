import styles from "styles/Loading.module.scss";
import {Infinity} from "../components/svg";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Infinity className={styles.loader}></Infinity>
        </div>
    )
}
