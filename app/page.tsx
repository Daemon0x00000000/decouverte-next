import {getServerSession} from "next-auth";
import { authOptions} from "../pages/api/auth/[...nextauth]";
import styles from "styles/Home.module.scss";

export default async function LandingPageAboutTierlistRanker() {
    const session = await getServerSession(authOptions);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Tierlist Ranker</h1>

                <p className={styles.description}>
                    Tierlist Ranker est un site web qui permet de créer des tierlistes et de les partager avec d'autres utilisateurs.
                </p>
                <p className={styles.description}>
                    Vous pouvez créer des tierlistes et les partager avec vos amis, ou bien en créer une publique et la partager avec le monde entier.
                </p>
                <p className={styles.description}>
                    Vous pouvez aussi voter pour les tierlistes des autres utilisateurs, et voir les tierlistes les plus populaires.
                </p>
            </div>
        </div>
    )
}
