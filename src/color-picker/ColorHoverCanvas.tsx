import React, {MouseEvent, useRef, useState} from "react";
import {ColorPickerCursor} from "./Cursor";
import {Props} from "./ColorPickerCanvas";
import {PickedColor} from "./types";
import ImageCanvas from "../canvas/ImageCanvas";
import {pickColor} from "./pickColor";

/**
 * cursor shows the color that is currently being covered
 * computes an average color with each mouse move
 * calls a callback onClick to select the color
 */
export default ({onColorPicked, image, r = 3}: Props) => {

    const [picked, setPicked] = useState<PickedColor | null>(null);

    const ctxRef = useRef<CanvasRenderingContext2D>(null);

    const getColorAt = (e: MouseEvent<HTMLCanvasElement>): PickedColor | null => {
        try {
            /**
             * since the event is attached to the canvas element, can use offsetX and offsetY to get relative x and y
             * positions
             */
            const {offsetX: x, offsetY: y} = e.nativeEvent;
            return pickColor({ctx: ctxRef.current, r, x, y});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
        /**
         * update the color locally and also call the callback (not not with null)
         */
        const color = getColorAt(e);
        setPicked(color);
        if ( color) {
            onColorPicked(color, e);
        }
    }

    /**
     * use absolute positioning to place the cursor on top of the canvas
     */
    return (
        <div>
            <ImageCanvas
                image={image}
                onLoad={ctx => ctxRef.current = ctx}
                onMouseLeave={() => setPicked(null)}
                onMouseMove={e => setPicked(getColorAt(e))}
                onClick={handleClick}
            />
            {this.picked !== null &&
            <ColorPickerCursor
                {...picked}
            />
            }
        </div>
    )
}
