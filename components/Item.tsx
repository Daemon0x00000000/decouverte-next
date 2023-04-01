import styles from "styles/Tierlist.module.scss";
import {Draggable} from "react-beautiful-dnd";
import {FaTimes} from "react-icons/all";
import ItemProps from "../types/ItemProps";
import {useContext, useEffect, useState} from "react";
import {TierlistContext} from "./TierList";
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';

export default function Item({ id, index, encodedImage, removeCallback}:ItemProps) {
    const {editable} = useContext(TierlistContext);
    const [colors, setColors] = useState<string[]>([]);
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        console.log(colors);
        // Get luminance of the color
        let luminance = 0;
        if (colors) {
            for (const color of colors) {
                // @ts-ignore
                const rgb = colors[0].substring(1).match(/.{2}/g).map((c: string) => parseInt(c, 16));
                const r = rgb[0] / 255;
                const g = rgb[1] / 255;
                const b = rgb[2] / 255;
                luminance += 0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) + 0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) + 0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4));
            }
            luminance /= colors.length;
            if (luminance < 0.5) {
                setIsDark(true);
            }
        }
    }, [colors]);
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={!editable}>
            {(provider) => (
                <><ColorExtractor getColors={setColors} src={encodedImage}/>
                    <div className={styles.items} {...provider.draggableProps} {...provider.dragHandleProps}
                         ref={provider.innerRef}
                         style={{backgroundImage: `url(${encodedImage})`, ...provider.draggableProps.style}}
                         data-vibrantColor={colors[0]}>
                        {editable &&
                            <button className={styles.deleteItem} onClick={() => removeCallback(index)}><FaTimes color={isDark ? "white" : "black"}/>
                            </button>}
                    </div>
                </>
            )}
        </Draggable>
    );
}
