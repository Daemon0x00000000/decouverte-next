
import Item from "./Item";
import {useContext, useEffect, useState} from "react";
import styles from "styles/Tierlist.module.scss";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Modal from "./Modal";
import {FaTimesCircle} from "react-icons/all";
import TierProps from "../types/TierProps";
import {TierlistContext} from "./TierList";
import TierInterface from "../interfaces/Tier";
export default function TierCP({ name, colors, index }: TierProps) {
    const {tierList, tierlistDispatch, editable} = useContext(TierlistContext);
    const [file, setFile] = useState<Blob>();
    const [tier, setTier] = useState<TierInterface>(tierList.tiers[index]);
    const [activeColor, setActiveColor] = useState(tierList.tiers[index].color);
    const [tierName, setTierName] = useState(tier.name);

    const handleUpload = (file:Blob) => {
        // COnvert the file to base64
        const fileSize = file.size;
        const fileMb = fileSize / 1024 ** 2;
        if (fileMb <= 2) {
            setFile(file);
        } else {
            console.log("File too big");
        }
    }

    const addItem = (encodedImage:string) => {
        tierlistDispatch({
            type: "ADD_ITEM",
            payload: {
                tierIndex: index,
                encodedImage: encodedImage
            }
        });
    }

    const handleTierRemoval = () => {
        tierlistDispatch({
            type: "REMOVE_TIER",
            payload: {
                tierIndex: index
            }
        });
    }

    const handleItemRemoval = (itemIndex:number ) => {
        tierlistDispatch({
            type: "REMOVE_ITEM",
            payload: {
                tierIndex: index,
                itemIndex
            }
        });
    }

    const createItem = () => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            //
            console.log('File converted to base64', reader.result);
            addItem(reader.result as string);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    const handleTierNameChange = () => {
        tierlistDispatch({
            type: "UPDATE_TIER_NAME",
            payload: {
                tierIndex: index,
                name: tierName
            }
        });
    }

    const handleColorChange = () => {
        tierlistDispatch({
            type: "UPDATE_TIER_COLOR",
            payload: {
                tierIndex: index,
                activeColor
            }
        });
    }

    useEffect(() => {
        setTier(tierList.tiers[index]);
    }, [tierList.tiers, index]);
    return (
        <Draggable draggableId={name} index={index} isDragDisabled={!editable}>
            {(provider) => (
                <div className={styles.tier} {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef}>
                    <div className={styles.tierHeader}>
                        {editable && <div className={styles.deleteTier} onClick={handleTierRemoval}><FaTimesCircle /></div>}
                        <div className={styles.tierName} style={{backgroundColor: activeColor}}>
                            <div className={styles.colorPicker}>
                                {editable && colors.map((color) => (
                                    <div key={color} className={styles.color} style={{backgroundColor: color, border: activeColor === color ? "2px solid white" : "none"}} onClick={() => { setActiveColor(color); handleColorChange()}}/>
                                ))}
                            </div> <input type="text" value={tierName} onChange={(e) => setTierName(e.target.value)} onBlur={handleTierNameChange} disabled={!editable} placeholder={"Nom du tier"}/>
                            {editable && (
                            <Modal title={"Ajouter un item"} successCallback={createItem}>
                                <div className={styles.imageUpload}>
                                    <input type="file" accept="image/*" placeholder={"Ajouter une image"} onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
                                    <p>Glissez-déposez une image ici ou cliquez pour en sélectionner une (Max 2MB)</p>
                                </div>
                            </Modal>
                            )}
                        </div>
                    </div>
                    <Droppable droppableId={name} direction="horizontal" type="item" isDropDisabled={!editable}>
                        {(provider) => (
                            <div
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                className={styles.tierItems}>
                                {tier.items.map((item,index) => (
                                    <Item key={item.id} id={item.id} index={index} encodedImage={item.encodedImage} removeCallback={handleItemRemoval} />
                                ))}
                                {provider.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>

    );
}

