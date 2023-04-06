"use client";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import styles from "styles/Tierlist.module.scss";
import {toast, Toaster} from "react-hot-toast";
import TierListCP from "../../../components/TierList";
import TierListInterface from "../../../interfaces/TierListInterface";
type PropsParams = {
    params: {
        id: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
const updateTierlist = async (tierlist:TierListInterface) => {
    console.log(JSON.stringify(tierlist))
    const res = await fetch("/api/tierlists", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tierlist)
    });

    if (!res.ok) {
        return {success: false, error: res.status};
    }
    const data = await res.json();
    return {success: true, data};
}
export default function TierlistPage({params}: PropsParams) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);

    const {data: session} = useSession();

    useEffect(() => {
        if (!data) {
            fetch(`/api/tierlists?id=${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                res.json().then(data => {
                    console.log(data);
                    setData(data);
                    setLoading(false);
                    //@ts-ignore
                    // Temporary fix
                    if (session && session.user && session.user.id  === data.user.id) {
                        setEditable(true);
                    }
                });
            });
        }
    }, [data, session,params.id]);

    const handleUpdateTierlist = (tierlist:TierListInterface) => {
        updateTierlist(tierlist).then(data => {
            if (data.success) {
                toast.success("Tierlist modifiée avec succès");
            } else {
                toast.error("Une erreur est survenue lors de la modification de la tierlist");
            }
        });
    }

    return (
        <div className={styles.tierlistContainer}>
            <Toaster />
            {!loading && (
                <div style={{width: "100%", height: "100%"}}>
                    <TierListCP tierListObject={{
                        id: data.id,
                        name: data.name,
                        media: data.media,
                        tiers: data.tiers
                    }} session={session} editable={editable} validateCallback={handleUpdateTierlist} />
                </div>
            )}

        </div>
    )
}
