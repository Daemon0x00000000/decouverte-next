import {dehydrate, Hydrate} from "@tanstack/react-query";
import Tierlists from "../../components/Tierlists";
import getQueryClient from "../getQueryClient";

export default async function HydratedTierlists() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(['tierlists'], prefetchTierlists, {
        staleTime: 3000,
        cacheTime: 3000
    })
    const dehydratedState = dehydrate(queryClient)

    return (
        <Hydrate state={dehydratedState}>
            <Tierlists />
        </Hydrate>
    )

}

const prefetchTierlists = async () => {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL
    return fetch(`${NEXTAUTH_URL}/api/tierlists`).then((res) => {
        return res.json();
    });
}
