import styles from "styles/Tierlist.module.scss";
import {Draggable} from "react-beautiful-dnd";
import {FaTrashAlt} from "react-icons/all";

export default function Item({ id, index, encodedImage, removeCallback,editable}) {
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={!editable}>
            {(provider) => (
                <div className={styles.items} {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef} style={{backgroundImage: `url(${encodedImage})`,...provider.draggableProps.style}}>
                    {editable && <button className={styles.deleteItem} onClick={() => removeCallback(id)}><FaTrashAlt/></button>}
                </div>
            )}
        </Draggable>
    );
}
