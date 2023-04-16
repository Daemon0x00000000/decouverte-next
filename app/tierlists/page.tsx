import styles from "styles/Tierlists.module.scss";
import Tierlists from "../../components/Tierlists";

export default async function TierlistsPage() {
    return (
        <>
            <h1 className={styles.title}>Liste des tierlists</h1>
            <Tierlists/>
        </>
    )
}
