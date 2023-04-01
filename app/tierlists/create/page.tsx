"use client";
import styles from "styles/Tierlist.module.scss";
import TierListCP from "../../../components/TierList";
import {useEffect, useReducer, useState} from "react";
import TierListReducer from "../../../reducers/TierListReducer";
import {toast, Toaster} from "react-hot-toast";
import {useSession} from "next-auth/react";
import toPng from "dom-to-image";


export default function TierlistPage() {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);
    const [tierListRef, setTierListRef] = useState<Node|null>();
     const [tierList,tierlistDispatch] = useReducer(TierListReducer,{
         name: "Ma tierlist",
         media: "",
         tiers: [
             {
                 name: "S",
                 color: "#FF0000",
                 items: [
                     {
                         id: "1",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "2",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "3",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "4",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "5",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "6",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "7",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "8",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "9",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "10",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "11",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     }
                 ]
             },
             {
                 name: "SE",
                 color: "#FF7F00",
                 items: [
                     {
                         id: "01",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "02",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "03",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "04",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "05",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "06",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "07",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "08",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "09",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "010",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     },
                     {
                         id: "011",
                         encodedImage: "https://i.imgur.com/1ZQ3wqg.png"
                     }
                 ]
             }
         ]
     });

    useEffect(() => {
        setLoading(false);
        // get component tierList
        // const tierList = document.getElementById("tierList");
        console.log(tierListRef);
        // Check if tierlistRef and if everything is loaded
    }, [tierListRef]);

    const convertToImage = () => {
        if (tierListRef) {
            toPng.toPng(tierListRef).then(function (dataUrl: any) {
                console.log(dataUrl);
            }).catch(function (error: any) {
                console.error('oops, something went wrong!', error);
            });
        }
    }
    return (
        <div className={styles.tierlistContainer}>
            <Toaster />
            {!loading && (
                <div style={{width: "100%", height: "100%"}}>
                    <TierListCP tierList={tierList} tierlistDispatch={tierlistDispatch} editable={true} setTierListRef={setTierListRef}/>
                    {session && (
                        <button className={styles.addButton} onClick={convertToImage}>
                            Ajouter
                        </button>
                    )}
                </div>
            )}

        </div>
    );
}
