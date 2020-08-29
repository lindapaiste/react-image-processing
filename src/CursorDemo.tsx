import * as React from "react";
import ColorHoverCanvas from "./color-picker/ColorHoverCanvas";
import { useState } from "react";
import { demoImage } from "./HoverDemo";

export default () => {
  const [selected, setSelected] = useState("#FFF");

  return (
    <div>
      <ColorHoverCanvas
        image={demoImage}
        onColorPicked={(o) => setSelected(o.hex)}
      />
      <h3>selected</h3>
      <div
        style={{
          backgroundColor: selected,
          width: 100,
          height: 100
        }}
      />
    </div>
  );
};
