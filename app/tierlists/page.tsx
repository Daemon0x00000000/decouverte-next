import styles from "styles/Tierlists.module.scss";
import HydratedTierlists from "./HydratedTierlists";

export default async function TierlistsPage() {
    const hydrate = await HydratedTierlists()
    return (
        <>
            <h1 className={styles.title}>Liste des tierlists</h1>
            {hydrate}
        </>
    )
}
