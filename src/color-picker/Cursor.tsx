import React, {CSSProperties} from "react";
import {PickedColor} from "./types";

/**
 * creates a circle of the selected color at the selected position
 */
const makeStyle = ({x,y,r,hex}: PickedColor): CSSProperties => ({
    background: hex,
    width: 2 * r + 'px',
    height: 2 * r + 'px',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: .5 * r,
    transform: 'translate(' + (x - r) + 'px,' + (y - r) + 'px)',
})

// outline: '1px solid red',

export const ColorPickerCursor = (props: PickedColor & {style?: CSSProperties}) => {
    return (
        <div
            className="color-picker-cursor"
            style={{
                ...makeStyle(props),
                ...props.style,
            }}
        />
    )
};
