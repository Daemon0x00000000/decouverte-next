"use client";
import styles from "styles/Tierlist.module.scss";
import TierListCP from "../../../components/TierList";
import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {useSession} from "next-auth/react";
import TierListInterface from "../../../interfaces/TierListInterface";

const submitTierlist = async (tierlist:TierListInterface) => {
    const res = await fetch("/api/tierlists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tierlist)
    });

    console.error(JSON.stringify(tierlist))
    // Check if the response is ok
    if (!res.ok) {
        alert(res.status);
        return {success: false, error: res.status};
    }
    const data = await res.json();
    return {success: true, data};
}
export default function TierlistPage() {
    const [loading, setLoading] = useState(true);
    const {data: session} = useSession();

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleCreateTierlist = (tierlist:TierListInterface) => {
        submitTierlist(tierlist).then(data => {
            if (data.success) {
                toast.success("Tierlist créée avec succès");
            } else {
                toast.error("Une erreur est survenue lors de la création de la tierlist");
            }
        });
    }

    return (
        <div className={styles.tierlistContainer}>
            <Toaster />
            {!loading && (
                <div style={{width: "100%", height: "100%"}}>
                    {session && (
                    <TierListCP tierListObject={{
                        name: "Ma tierlist",
                        media: "",
                        tiers: [
                        ]
                    }} session={session} editable={true} validateCallback={handleCreateTierlist} />
                    )}
                </div>
            )}

        </div>
    );
}
