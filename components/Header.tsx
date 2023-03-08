import styles from "styles/Header.module.scss";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import {FaSignInAlt, FaSignOutAlt, FaPlusCircle} from "react-icons/fa";
import Link from "next/link";
import {FaStar} from "react-icons/fa";

export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.item}><Link className={styles.title} href="/">TierList R<FaStar style={{color: "#FFD700",fontSize:"1.2rem"}}/>nker</Link></li>
                    <div className={styles.clickable}>
                        <li className={styles.demo}>
                            {!session ? (
                                <Link href="/tierlists">
                                    <FaPlusCircle/>
                                    <span>Demo</span>
                                </Link>
                            ) : (
                                <Link href="/demo">
                                    <FaPlusCircle/>
                                    <span>Ajouter</span>
                                </Link>
                            )}
                        </li>
                        <li className={styles.item}>
                            {!session ? (
                            <Link href="/auth/signin">
                                <FaSignInAlt/>
                                <span>Connexion/Inscription</span>
                            </Link>
                            ) : (
                            <Link href="/auth/signout">
                                <FaSignOutAlt/>
                                <span>Déconnexion</span>
                            </Link>
                            )}
                        </li>
                    </div>
                </ul>
            </nav>

        </header>
    );
}
