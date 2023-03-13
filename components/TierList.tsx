import TierListProps from "../types/TierListProps";
import {createContext, useEffect, useState} from "react";
import Tier from "./Tier";
import styles from "styles/Tierlist.module.scss";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";

export const TierlistContext = createContext({} as TierListProps);
export default function TierListCP({ tierList, tierlistDispatch, editable}: TierListProps) {
    const [isReady, setIsReady] = useState(false);
    const [colors] = useState<string[]>(["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF","#4B0082"]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId !== destination.droppableId) {
            if (source.droppableId === "0") {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === destination.droppableId);
                if (!tier) return;
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                tierlistDispatch({
                    type: "UPDATE_TIERS",
                    payload: {
                        tiers: copiedTierList
                    }
                });
            } else if (destination.droppableId === "0") {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === source.droppableId);
                if (!tier) return;
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                tierlistDispatch({
                    type: "UPDATE_TIERS",
                    payload: {
                        tiers: copiedTierList
                    }
                });
            } else {
                const copiedTierList = [...tierList.tiers];
                const sourceTierIndex = copiedTierList.findIndex((tier: { name: any; }) => tier.name === source.droppableId);
                const destTierIndex = copiedTierList.findIndex((tier: { name: any; }) => tier.name === destination.droppableId);
                const [removed] = copiedTierList[sourceTierIndex].items.splice(source.index, 1);
                copiedTierList[destTierIndex].items.splice(destination.index, 0, removed);
                tierlistDispatch({
                    type: "UPDATE_TIERS",
                    payload: {
                        tiers: copiedTierList
                    }
                });
            }
        } else {
            if (source.droppableId === "0") {
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                tierlistDispatch({
                    type: "UPDATE_TIERS",
                    payload: {
                        tiers: copiedTierList
                    }
                });
            } else {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === source.droppableId);
                if (!tier) return;
                const copiedItems = [...tier.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                tierlistDispatch({
                    type: "DRAG_DROP_ITEM",
                    payload: {
                        tierIndex: tierList.tiers.indexOf(tier),
                        newItems: copiedItems,
                    }
                });
            }
        }
    };

    const handleAddTier = () => {
        tierlistDispatch({type: "ADD_TIER", payload: {name: `T${tierList.tiers.length + 1}`, color: colors[tierList.tiers.length % colors.length], items: []}});
    };

    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <TierlistContext.Provider value={{tierList, tierlistDispatch, editable}}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <input type="text" className={styles.tierListName} value={tierList.name} onChange={(e) => tierlistDispatch({type: "UPDATE_TIERLIST_NAME", payload: {name: e.target.value}})} disabled={!editable} placeholder={"Nom de la tierlist"} />
                <Droppable droppableId="0" type="tier" isDropDisabled={!editable}>
                    {(provider) => (
                        <div {...provider.droppableProps} ref={provider.innerRef} className={styles.tierList}>

                                {isReady && tierList.tiers.map((tier,index) => (
                                    <Tier key={tier.name} name={tier.name} colors={colors} index={index} />
                                ))}
                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
                {editable &&
                    <div className={styles.addTier}>
                        <button onClick={handleAddTier}>
                            Ajouter un tier
                        </button>
                    </div>
                }
            </DragDropContext>
        </TierlistContext.Provider>
    );
}


// TODO: Refactoring + contexte à mettre car plus pertinent
