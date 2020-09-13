import React, { MouseEvent, useRef, useState } from "react";
import { Props as BaseProps } from "./ColorPickerCanvas";
import { PickedColor } from "./types";
import ImageCanvas from "../canvas/ImageCanvas";
import { pickColor } from "./pickColor";

export type Props = BaseProps & {
  onHoverColor(color: PickedColor | null): void;
};

/**
 * instead of including a cursor over the image,
 * call a callback so that the hovered color can be rendered anywhere in the DOM
 */
export default ({ onColorPicked, image, r = 3, onHoverColor }: Props) => {
  const ctxRef = useRef<CanvasRenderingContext2D>(null);

  const getColorAt = (e: MouseEvent<HTMLCanvasElement>): PickedColor | null => {
    try {
      /**
       * since the event is attached to the canvas element, can use offsetX and offsetY to get relative x and y
       * positions
       */
      const { offsetX: x, offsetY: y } = e.nativeEvent;
      return pickColor({ ctx: ctxRef.current, r, x, y });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    /**
     * update the color locally and also call the callback (not not with null)
     */
    const color = getColorAt(e);
    if (color) {
      onColorPicked(color, e);
    }
  };

  /**
   * use absolute positioning to place the cursor on top of the canvas
   */
  return (
    <ImageCanvas
      image={image}
      onLoad={(ctx) => (ctxRef.current = ctx)}
      onMouseLeave={() => onHoverColor(null)}
      onMouseMove={(e) => onHoverColor(getColorAt(e))}
      onClick={handleClick}
    />
  );
};
