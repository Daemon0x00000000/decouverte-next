
import Item from "./Item";
import {useState} from "react";
import styles from "styles/Tierlist.module.scss";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Modal from "./Modal";
import {FaTrashAlt} from "react-icons/all";
export default function Tier({ name, color, colors, colorCallback, items, index, editable,addItem,handleTierNameChange, removeItem, removeCallback }) {
    const [file, setFile] = useState();
    const [activeColor, setActiveColor] = useState(color);

    const handleUpload = (file) => {
        // COnvert the file to base64
        const fileSize = file.size;
        const fileMb = fileSize / 1024 ** 2;
        if (fileMb <= 2) {
            setFile(file);
        } else {
            console.log("File too big");
        }
    }

    const createItem = () => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            //
            console.log('File converted to base64', reader.result);
            addItem(name,{id: "item" + Math.random(), encodedImage: reader.result});
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }
    return (
        <Draggable draggableId={name} index={index} isDragDisabled={!editable}>
            {(provider) => (
                <div className={styles.tier} {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef}>
                    {editable && <div className={styles.deleteTier} onClick={() => removeCallback(name)}><FaTrashAlt /></div>}
                    <div className={styles.tierName} style={{backgroundColor: color}}>
                        <div className={styles.colorPicker}>
                            {editable && colors.map((color) => (
                                <div key={color} className={styles.color} style={{backgroundColor: color, border: activeColor === color ? "2px solid white" : "none"}} onClick={() => {colorCallback(name,color); setActiveColor(color)}}/>
                            ))}
                        </div> <input type="text" value={name} onChange={(e) => handleTierNameChange(name,e.target.value)} disabled={!editable} placeholder={"Nom du tier"}/>
                        {editable && (
                        <Modal title={"Ajouter un item"} successCallback={createItem}>
                            <div className={styles.imageUpload}>
                                <input type="file" accept="image/*" placeholder={"Ajouter une image"} onChange={(e) => handleUpload(e.target.files[0])} />
                                <p>Glissez-déposez une image ici ou cliquez pour en sélectionner une (Max 2MB)</p>
                            </div>
                        </Modal>
                        )}
                    </div>
                    <Droppable droppableId={name} direction="horizontal" type="item" isDropDisabled={!editable}>
                        {(provider) => (
                            <div
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                className={styles.tierItems}>
                                {items.map((item,index) => (
                                    <Item key={item.id} id={item.id} index={index} encodedImage={item.encodedImage} removeCallback={removeItem} editable={editable}/>
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

