import React, {MouseEvent, useRef} from "react";
import {PickedColor, SizedImage} from "./types";
import ImageCanvas from "../canvas/ImageCanvas";
import {pickColor} from "./pickColor";

/**
 * simple version displays an image and calls onColorPicked with a PickedColor object when the image is clicked
 */

export interface Props {
    image: SizedImage;

    onColorPicked(color: PickedColor, e: MouseEvent): void;

    r?: number;
}

export default ({image, onColorPicked, r = 3}: Props) => {
    /**
     * does the ref need to be stored, or can the canvas be accessed through the event?
     */
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D>(null);

    const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
        try {
            /**
             * since the event is attached to the canvas element, can use offsetX and offsetY to get relative x and y
             * positions
             */
            const {offsetX: x, offsetY: y} = e.nativeEvent;
            const color = pickColor({ctx: ctxRef.current, r, x, y});
            /**
             * call callback
             */
            onColorPicked(color, e);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ImageCanvas
            image={image}
            onLoad={(ctx => ctxRef.current = ctx)}
            onClick={handleClick}
        />
    )
}
