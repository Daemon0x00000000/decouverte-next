import CardTierList from "../../components/CardTierList";
import styles from "styles/Tierlists.module.scss";
import TierListInterface from "../../interfaces/TierListInterface";
const getData = async () => {
    // Endpoint is /api/tierlists, method is GET, revalidate is 10 seconds
    const NEXT_PUBLIC_API_URL = process.env.NEXTAUTH_URL;
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tierlists`, {
        next: {
            revalidate: 10
        },
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return await res.json();
}

export default async function TierlistsPage() {
}
