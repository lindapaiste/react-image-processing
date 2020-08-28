import {PickedColor, SizedImage} from "./types";
import {MouseEvent, useState} from "react";
import {pickColor} from "./pickColor";

/**
 * separate color picker logic from Components so that rendering can vary
 */

export interface Props {
    ctx: CanvasRenderingContext2D;
    r?: number;
}

export interface Returns {

}

export const useColorPicker = ({ctx, r = 3}: Props) => {

    const [isHovering, setIsHovering] = useState(false);

    const getColorAt = (e: MouseEvent<HTMLCanvasElement>): PickedColor | null => {
        try {
            /**
             * since the event is attached to the canvas element, can use offsetX and offsetY to get relative x and y
             * positions
             */
            const {offsetX: x, offsetY: y} = e.nativeEvent;
            return pickColor({ctx, r, x, y});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    return {
        isHovering,
        setIsHovering,
        getColorAt,
    }
}
