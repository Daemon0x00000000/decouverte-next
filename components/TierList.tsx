import TierListProps from "../types/TierListProps";
import {useEffect, useState} from "react";
import ItemProps from "../types/ItemProps";
import Tier from "./Tier";
import styles from "styles/Tierlist.module.scss";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import TierList from "../interfaces/TierListInterface";

export default function TierListCP({ tierList, setTierList, editable}: TierListProps) {
    const [isReady, setIsReady] = useState(false);
    const [colors, setColors] = useState<string[]>(["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF","#4B0082"]);

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId !== destination.droppableId) {
            if (source.droppableId === "0") {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === destination.droppableId);
                if (!tier) return;
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                setTierList((prev:TierList) => ({
                    ...prev,
                    tiers: copiedTierList
                }));
            } else if (destination.droppableId === "0") {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === source.droppableId);
                if (!tier) return;
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                setTierList((prev:TierList) => ({
                    ...prev,
                    tiers: copiedTierList
                }));
            } else {
                const sourceTier = tierList.tiers.find((tier: { name: any; }) => tier.name === source.droppableId);
                const destTier = tierList.tiers.find((tier: { name: any; }) => tier.name === destination.droppableId);
                if (!sourceTier || !destTier) return;
                const sourceItems = [...sourceTier.items];
                const destItems = [...destTier.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                setTierList((prev:TierList) => ({
                    ...prev,
                    tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                        if (tier.name === source.droppableId) {
                            return {
                                ...tier,
                                items: sourceItems,
                            };
                        }
                        if (tier.name === destination.droppableId) {
                            return {
                                ...tier,
                                items: destItems,
                            };
                        }
                        return tier;
                    }),
                }));
            }
        } else {
            if (source.droppableId === "0") {
                const copiedTierList = [...tierList.tiers];
                const [removed] = copiedTierList.splice(source.index, 1);
                copiedTierList.splice(destination.index, 0, removed);
                setTierList((prev:TierList) => ({
                    ...prev,
                    tiers: copiedTierList
                }));
            } else {
                const tier = tierList.tiers.find((tier: { name: any; }) => tier.name === source.droppableId);
                if (!tier) return;
                const copiedItems = [...tier.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                setTierList((prev:TierList) => ({
                    ...prev,
                    tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                        if (tier.name === source.droppableId) {
                            return {
                                ...tier,
                                items: copiedItems,
                            }
                        }
                        return tier;
                    }),
                }));
            }
        }
    };

    const addItem = (tierName: string, item: ItemProps) => {
        setTierList((prev:TierList) => ({
            ...prev,
            tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                if (tier.name === tierName) {
                    return {
                        ...tier,
                        items: [...tier.items, item],
                    };
                }
                return tier;
            }),
        }));
    };

    const changeTierColor = (tierName: string, color: string) => {
        setTierList((prev:TierList) => ({
            ...prev,
            tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                if (tier.name === tierName) {
                    return {
                        ...tier,
                        color: color,
                    };
                }
                return tier;
            }),
        }));
    }

    const removeItem = (itemName:string) => {
        setTierList((prev:TierList) => ({
            ...prev,
            tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                return {
                    ...tier,
                    items: tier.items.filter((item: ItemProps) => item.id !== itemName),
                }
            }),
        }));
    };

    const handleTierNameChange = (oldName: string, newName: string) => {
        setTierList((prev:TierList) => ({
            ...prev,
            tiers: prev.tiers.map((tier: { name: any; items: any; }) => {
                if (tier.name === oldName) {
                    return {
                        ...tier,
                        name: newName,
                    };
                }
                return tier;
            }),
        }));
    };

    const removeTier = (tierName: string) => {
        setTierList((prev:TierList) => ({
            ...prev,
            tiers: prev.tiers.filter((tier: { name: any; }) => tier.name !== tierName),
        }));
    }
    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <input type="text" className={styles.tierListName} value={tierList.name} onChange={(e) => setTierList((prev:TierList) => ({
                ...prev,
                name: e.target.value
            }))} disabled={!editable} placeholder={"Nom de la tierlist"} />
            <Droppable droppableId="0" type="tier" isDropDisabled={!editable}>
                {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef} className={styles.tierList}>

                            {isReady && tierList.tiers.map((tier,index) => (
                                <Tier key={tier.name} name={tier.name} color={tier.color} colors={colors} colorCallback={changeTierColor} items={tier.items} index={index} editable={editable} addItem={addItem} handleTierNameChange={handleTierNameChange} removeItem={removeItem} removeCallback={removeTier}/>
                            ))}
                        {provider.placeholder}
                    </div>
                )}
            </Droppable>
            {editable &&
                <div className={styles.addTier}>
                    <button onClick={() => setTierList((prev:TierList) => ({
                        ...prev,
                        tiers: [...prev.tiers, {
                            name: `T${prev.tiers.length + 1}`,
                            color: colors[prev.tiers.length % colors.length],
                            items: []
                        }]
                    }))}>
                        Ajouter un tier
                    </button>
                </div>
            }
        </DragDropContext>
    );
}


// TODO: Refactoring + contexte à mettre car plus pertinent
