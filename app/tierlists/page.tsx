"use client";
import styles from "styles/Tierlist.module.scss";
import TierList from "../../components/TierList";
import {useState} from "react";


export default function TierlistPage() {
     const [tierList,setTierList] = useState({
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
            <TierList tierList={tierList} setTierList={setTierList} editable={true} />
        </div>
    );
}
