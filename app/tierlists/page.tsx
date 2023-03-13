"use client";
import styles from "styles/Tierlist.module.scss";
import TierListCP from "../../components/TierList";
import {useReducer} from "react";
import TierListReducer from "../../reducers/TierListReducer";


export default function TierlistPage() {
     const [tierList,tierlistDispatch] = useReducer(TierListReducer,{
         name: "Ma tierlist",
         tiers: [
             {
                 name: "S",
                 color: "#FFD700",
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
                 color: "#FFD700",
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
    return (
        <div className={styles.tierlistContainer}>
            <TierListCP tierList={tierList} tierlistDispatch={tierlistDispatch} editable={true} />
        </div>
    );
}
