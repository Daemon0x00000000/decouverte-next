"use client";
import {useSession} from "next-auth/react";
import {useCallback} from "react";
import styles from "styles/Tierlist.module.scss";
import {toast} from "react-hot-toast";
import TierListCP from "../../../components/TierList";
import TierListInterface from "../../../interfaces/TierListInterface";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SessionWithUser from "../../../interfaces/SessionWithUser";

type PropsParams = {
    params: {
        id: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
const updateTierlist = async (tierlist:TierListInterface) => {
    return fetch("/api/tierlists", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tierlist)
    }).then((res) => {
        return res.json();
    });
}

const getTierlist = async (id:string) => {
    return fetch(`/api/tierlists?id=${id}`).then((res) => {
        return res.json();
    });
}
export default function TierlistPage({params}: PropsParams) {
    const queryClient = useQueryClient();
    const {data, isLoading, isError} = useQuery(
        ['tierlist', params.id],
        ({queryKey}) => getTierlist(queryKey[1] as string)
    )
    const {data: session} = useSession() as unknown as {data: SessionWithUser};

    if (isError) toast.error("Une erreur est survenue lors du chargement de la tierlist")

    const updateMutation = useMutation({
        mutationFn: updateTierlist,
        onMutate: async (tierlist:TierListInterface) => {
            await queryClient.cancelQueries(['tierlist', params.id]);
            const previousTierlist = queryClient.getQueryData<TierListInterface>(['tierlist', params.id]);

            if (previousTierlist) {
                queryClient.setQueryData(['tierlist', params.id], {
                    ...previousTierlist,
                    ...tierlist
                })
            }
        },
        onSuccess: () => {
            toast.success("Tierlist mise à jour avec succès");
        },
        onError: () => {
            toast.error("Une erreur est survenue lors de la mise à jour de la tierlist");
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tierlist', params.id]);
        }
    })

    const handleCreateTierlist = useCallback((tierlist:TierListInterface) => {
        session ?
            session.user && session.user.id === data.user.id &&
        updateMutation.mutate(tierlist) :
        toast.error("Vous devez être connecté pour créer une tierlist");
    }, [data, session, updateMutation])

    return (
        <div className={styles.tierlistContainer}>
            {!isLoading && !isError && (
                <div style={{width: "100%", height: "100%"}}>
                    <TierListCP tierListObject={{
                        id: data.id,
                        name: data.name,
                        media: data.media,
                        tiers: data.tiers
                    }} editable={(session && session.user && session.user.id === data.user.id)} validateCallback={handleCreateTierlist} />
                </div>
            )}

        </div>
    )
}
