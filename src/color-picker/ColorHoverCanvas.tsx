import React, { useState } from "react";
import { ColorPickerCursor } from "./Cursor";
import { Props } from "./ColorPickerCanvas";
import { PickedColor } from "./types";
import ColorHoverCallback from "./ColorHoverCallback";

/**
 * cursor shows the color that is currently being covered
 * computes an average color with each mouse move
 * calls a callback onClick to select the color
 */
export default ({ onColorPicked, image, r = 3 }: Props) => {
  const [picked, setPicked] = useState<PickedColor | null>(null);

  /**
   * use absolute positioning to place the cursor on top of the canvas
   */
  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <ColorHoverCallback
        image={image}
        onHoverColor={setPicked}
        onColorPicked={onColorPicked}
      />
      {picked !== null && <ColorPickerCursor {...picked} r={20} />}
    </div>
  );
};
