import CardTierList from "../../components/CardTierList";
import styles from "styles/Tierlists.module.scss";
import TierListInterface from "../../interfaces/TierListInterface";
const getData = async () => {
    // Endpoint is /api/tierlists, method is GET, revalidate is 10 seconds
    const NEXT_PUBLIC_API_URL = process.env.NEXTAUTH_URL;
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tierlists`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return await res.json();
}

export default async function TierlistsPage() {
    const data = await getData();
    return (
        <>
            <h1 className={styles.title}>Liste des tierlists</h1>
            <div className={styles.grid}>
                {data.map((tierlist:TierListInterface, i:number) => (
                    <CardTierList key={i} data={{
                        id: tierlist.id as string,
                        name: tierlist.name,
                        media: tierlist.media,
                    }
                    } loading={false} />
                ))}
            </div>
        </>
    )
}
