import TierListProps from "../types/TierListProps";
import {createContext, useCallback, useEffect, useReducer, useState} from "react";
import TierCP from "./Tier";
import styles from "styles/Tierlist.module.scss";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import TierListInterface from "../interfaces/TierListInterface";
import {toast, Toaster} from "react-hot-toast";
import TierListReducer from "../reducers/TierListReducer";
import toPng from "dom-to-image";

export const TierlistContext = createContext({} as { tierList: TierListInterface; tierlistDispatch: any; editable: boolean; });
export default function TierListCP({tierListObject, session, editable, validateCallback}: TierListProps) {
    const [isReady, setIsReady] = useState(false);
    const [colors] = useState<string[]>(["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082"]);
    const [tierListRef, setTierListRef] = useState<Node | null>();
    const [tierList, tierlistDispatch] = useReducer(TierListReducer, tierListObject);
    const [validating, setValidating] = useState(false);

    const convertToImage = useCallback(() => {
        if (tierListRef) {
            return toPng.toPng(tierListRef);
        }
    }, [tierListRef]);
    const handleDragEnd = (result: DropResult) => {
        const {source, destination} = result;
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
        if (tierList.tiers.length < colors.length) {
            tierlistDispatch({
                type: "ADD_TIER",
                payload: {
                    name: `T${tierList.tiers.length + 1}`,
                    color: colors[tierList.tiers.length % colors.length],
                }
            });
        } else {
            toast.error("Vous ne pouvez pas ajouter plus de tiers");
        }
    };

    const handleValidate = () => {
        if (validateCallback) {
            setValidating(true);
            const media = convertToImage();
            if (media) {
                media.then((dataUrl: any) => {
                    const tierListCopy = {...tierList};
                    tierListCopy.media = dataUrl;
                    validateCallback(tierListCopy);
                    setValidating(false);
                });
            } else {
                toast.error("Une erreur est survenue lors de la création de la tierlist");
                setValidating(false);
            }
        }
    }


    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <TierlistContext.Provider value={{tierList, tierlistDispatch, editable}}>
            <Toaster
            />
            <DragDropContext onDragEnd={handleDragEnd}>
                <input type="text" className={styles.tierListName} value={tierList.name}
                       onChange={(e) => tierlistDispatch({
                           type: "UPDATE_TIERLIST_NAME",
                           payload: {name: e.target.value}
                       })} disabled={!editable} placeholder={"Nom de la tierlist"}/>
                <Droppable droppableId="0" type="tier" isDropDisabled={!editable}>
                    {(provider) => (
                        <div {...provider.droppableProps} ref={(ref) => {
                            provider.innerRef(ref);
                            setTierListRef(ref);
                        }} className={styles.tierList}>
                            {isReady && tierList.tiers.map((tier, index) => (
                                <TierCP key={tier.name} name={tier.name} colors={colors} index={index}/>
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
                {session && (
                    <button className={styles.addButton} onClick={handleValidate} disabled={validating}>
                        Valider
                    </button>
                )}
            </DragDropContext>
        </TierlistContext.Provider>
    );
}
