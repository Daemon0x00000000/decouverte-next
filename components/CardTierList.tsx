import styles from "styles/CardTierList.module.scss";
import {TextBlock, RectShape} from "react-placeholder/lib/placeholders";
import  'react-placeholder/lib/reactPlaceholder.css';
import Image from "next/image";
import Link from "next/link";

type CardData = {
    id:string,
    name: string,
    media: string,
}
export default function CardTierList({loading=true, data}: {loading?: boolean, data?: CardData}) {
    const {name, media} = data || {name: "", media: ""};
    return (
        <div className={styles.card}>
            {loading ? (
                <RectShape color={"#f0f0f0"} style={{width: "100%", height: "100%"}} />
            ) : (
                <Image src={media} alt={name} layout={"fill"} objectFit={"cover"} className={styles.card__img} />
            )}
            <div className={styles.card__footer}>
                {loading ? (
                    <span><TextBlock color={"#f0f0f0"} rows={1} style={{width: "100%", height: "100%"}} /></span>
                ) : (
                    <>
                        <span>{name}</span>
                        <Link href={`/tierlists/${data?.id}`}>Voir</Link>
                    </>
                )}
            </div>
        </div>
    )
}
