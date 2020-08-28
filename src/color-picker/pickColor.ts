import {CanvasRef, PickedColor} from "./types";
import {getAverageColor, rgbaToHex} from "../util";
import {MouseEvent} from "react";

/**
 * raw function takes a context
 */
export const pickColor = ({ctx, x, y, r}: Pick<PickedColor, 'x' | 'y' | 'r'> & { ctx: CanvasRenderingContext2D }): PickedColor => {
    const data = ctx.getImageData(x - r, y - r, 2 * r, 2 * r);
    const rgba = getAverageColor(data);
    const hex = rgbaToHex(rgba);
    return {
        x, y, r,
        rgba,
        hex
    }
}

/**
 * want the x and y relative to the canvas - there are many ways to achieve this
 * this version compares event position to canvas position
 *
 * what happens if the image is scaled down?  do I need to scale x and y?
 */
export const getEventColor = (e: MouseEvent, ref: CanvasRef, r: number): PickedColor => {
    const canvasOffset = ref.current.getBoundingClientRect();
    const x = e.pageX - canvasOffset.x;
    const y = e.pageY - canvasOffset.y;
    const ctx = ref.current.getContext('2d');
    return pickColor({ctx, x, y, r});
}
