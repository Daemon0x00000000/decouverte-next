"use client";
import {useQuery} from "@tanstack/react-query";
import CardTierList from "./CardTierList";
import TierListInterface from "../interfaces/TierListInterface";
import {toast} from "react-hot-toast";
import {HStack} from "@chakra-ui/react";

const getTierlists = async () => {
    return fetch(`/api/tierlists`).then((res) => {
        return res.json();
    });
}
export default function Tierlists() {
    // Increase cache size to 50 MB
    const {data, isLoading, isError} = useQuery(['tierlists'], getTierlists, {
        keepPreviousData: true,
        staleTime: 10000,
        cacheTime: 40000,
        refetchOnWindowFocus: true,
        })

    if (isError) toast.error("Une erreur est survenue lors du chargement des tierlists")

    return (
        <HStack flexWrap="wrap" m={"auto"} w={"100%"} justifyContent="center" alignItems="center">
            {!isLoading && !isError && data && data.map((tierlist:TierListInterface, i:number) => (
                <CardTierList key={i} data={{
                    id: tierlist.id as string,
                    name: tierlist.name,
                    media: tierlist.media,
                }
                } loading={isLoading} />
            ))}
        </HStack>

    )
}
