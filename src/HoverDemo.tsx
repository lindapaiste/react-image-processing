import * as React from "react";
import ColorHoverCanvas from "./color-picker/ColorHoverCallback";
import { useState } from "react";

export const demoImage = {
  width: 280,
  height: 369,
  source_url:
    "https://upload.wikimedia.org/wikipedia/commons/c/ce/Monet_-_boats-on-rapair.jpg"
};

export default () => {
  const [selected, setSelected] = useState("#FFF");
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div>
      <h3>move mouse to update preview</h3>
      <h3>click to select color</h3>
      <ColorHoverCanvas
        image={demoImage}
        onColorPicked={(o) => setSelected(o.hex)}
        onHoverColor={(o) => setPreview(o ? o.hex : null)}
      />
      <h3>preview</h3>
      <div
        style={{
          backgroundColor: preview,
          width: 100,
          height: 100
        }}
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
