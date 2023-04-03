import styles from "styles/Tierlists.module.scss";
import CardTierList from "../../components/CardTierList";

export default function Loading() {
    return (
        <>
            <h1 className={styles.title}>Liste des tierlists</h1>
            <div className={styles.grid}>
                {Array(9).fill(0).map((_, i) => (
                    <CardTierList key={i} />
                ))}
            </div>
        </>
    )
}
