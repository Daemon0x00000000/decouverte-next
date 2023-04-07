"use client";
import CardTierList from "../../components/CardTierList";
import styles from "styles/Tierlists.module.scss";
import TierListInterface from "../../interfaces/TierListInterface";
import {useEffect} from "react";
import { useState } from "react";
const getData = async () => {
    // Endpoint is /api/tierlists, method is GET, revalidate is 10 seconds
    const res = await fetch(`/api/tierlists`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return await res.json();
}

export default function TierlistsPage() {
    const [data, setData] = useState<TierListInterface[]>([]);

    useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, []);
    return (
        <>
            <h1 className={styles.title}>Liste des tierlists</h1>
            <div className={styles.grid}>
                {data && data.map((tierlist:TierListInterface, i:number) => (
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
